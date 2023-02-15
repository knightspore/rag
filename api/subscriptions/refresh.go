package handler

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/knightspore/rag/parse"
	"github.com/mmcdole/gofeed"
)

func SubscriptionsRefreshHandler(w http.ResponseWriter, r *http.Request) {

	supabase, err := parse.CreateClient()
	if err != nil {
		parse.HandleResponse(w, parse.Response{
			Content: "Could not connect to database",
		}, false)
	}

	req := parse.HandleRequest(r)
	var results []map[string]string
	err = supabase.DB.From("subscriptions").Select("url").Eq("user", req.UserID).Execute(&results)
	if err != nil {
		log.Println(err)
	}

	total := 0

	var wg sync.WaitGroup
	start := time.Now()

	for _, r := range results {
		wg.Add(1)

		go func(url string) {

			fp := gofeed.NewParser()
			feed, _ := fp.ParseURL(req.URL)

			var articles []parse.ArticlesResponse

			for _, item := range feed.Items {
				fmt.Println(1)
				articles = append(articles, parse.ArticlesResponse{
					Title:        item.Title,
					URL:          item.Link,
					PubDate:      item.Published,
					Description:  item.Description,
					Subscription: feed.Title,
					Content:      item.Content,
					UserID:       req.UserID,
				})
			}

			total += len(articles)
			var r []map[string]string
			err := supabase.DB.From("articles").Upsert(articles).Execute(&r)

			log.Printf("Insert %q Articles Result: %+v", articles[0].Subscription, r)
			log.Printf("Errors: %+v", err)
			log.Printf("=== === === ===")

			wg.Done()

		}(r["url"])
	}

	wg.Wait()

	log.Printf("Refreshed %d Articles in %s\n", total, time.Since(start))

	parse.HandleResponse(w, parse.Response{
		AffectedCount: total,
	}, total > 0)

}
