package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/PullRequestInc/go-gpt3"
	"github.com/joho/godotenv"
	"github.com/knightspore/rag/parse"
)

const (
	prompt = `Here is a list of articles in a Feed Reader. Create a short, snappy blurb about the articles waiting for the user:

---

"""
Clever Code Considered Harmful - Josh Comeau's blog
An Interactive Guide to Flexbox - Josh Comeau's blog
'The Last of Us' Does What No Show Has Done Before - Backchannel Latest
Unmasking Pedro Pascal, the Complicated New Face of Sci-Fi - Backchannel Latest
Would You Sell Your Extra Kidney? - Backchannel Latest
Vengeance, 2022 - ★★★★ - Letterboxd - cslem
Steve Jobs, 2015 - ★★★★ - Letterboxd - cslem
Fixing a Memory Leak in a Production Node.js App - Kent C. Dodds Blog
The Singularity of Allison Williams - Backchannel Latest
The Secret Life of Plant Killers - Backchannel Latest
"""

Summary: Discover the hidden dangers of clever code, explore an interactive Flexbox guide, and learn how 'The Last of Us' is doing what no show has done before. You've also got the some interesting reads like selling extra kidneys, fixing memory leaks in Node.js apps, Allison Williams' singularity, and the secret life of plant killers!

---

"""
%s
"""

Summary:`
	max_len      = 256
	temp         = 0.4
	freq_penalty = 0.3
)

func SummarizeHandler(w http.ResponseWriter, r *http.Request) {

	godotenv.Load()

	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatalln("Missing OPENAI_API_KEY")
	}

	client := gpt3.NewClient(apiKey)

	supabase, err := parse.CreateClient()
	if err != nil {
		parse.HandleResponse(w, parse.Response{
			Content: "Could not connect to database",
		}, false)
	}

	since := (time.Now().Add(-(7 * 24 * time.Hour))).Format("2006-01-02")

	// req := parse.HandleRequest(r)
	var results []map[string]string
	err = supabase.DB.From("articles").Select("title", "subscription").Limit(10).Eq("user_id", "06bdc570-41d1-4563-9b24-64ff34233b44").Gte("updated_at", since).Execute(&results)
	if err != nil {
		log.Println(err)
	}

	var inputs string

	for _, article := range results {
		line := fmt.Sprintf("%s - %s\n", article["title"], article["subscription"])
		inputs += line
	}

	ctx := context.Background()
	resp, err := client.Completion(ctx, gpt3.CompletionRequest{
		Prompt:           []string{fmt.Sprintf(prompt, inputs)},
		MaxTokens:        gpt3.IntPtr(max_len),
		Temperature:      gpt3.Float32Ptr(temp),
		FrequencyPenalty: freq_penalty,
		Stop:             []string{"\n"},
	})

	found := true

	if err != nil {
		found = false
		log.Printf("Error getting feed summary from GPT-3: %v", err)
	}

	summary := strings.Trim(resp.Choices[0].Text, " ")

	parse.HandleResponse(w, parse.Response{
		Content: summary,
	}, found)
}
