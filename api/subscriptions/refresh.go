package handler

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/knightspore/rag/parse"
)

func SubscriptionsRefreshHandler(w http.ResponseWriter, r *http.Request) {

	start := time.Now()

	supabase := parse.CreateClient("https://sgzquvqpyebgqnecoaoa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnenF1dnFweWViZ3FuZWNvYW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM0NjE0MjcsImV4cCI6MTk3OTAzNzQyN30.o0BiNeWuUxDTC77mbzjJ2nMOvXrbxPWL8Mx6eHDeMdk")

	req := parse.HandleRequest(r)
	var results []map[string]string
	err := supabase.DB.From("subscriptions").Select("url").Eq("user", req.UserID).Execute(&results)
	if err != nil {
		log.Println(err)
	}

	var urls []string
	for _, r := range results {
		urls = append(urls, r["url"])
	}

	var articles []parse.ArticlesResponse
	var wg sync.WaitGroup
	for _, url := range urls {
		wg.Add(1)
		go func() {
			xml, err := parse.NewFeed(url)
			if err != nil {
				fmt.Fprintf(w, "%s", err.Error())
			}
			newArticles := parse.GetArticles(xml, url, req.UserID)
			articles = append(articles, newArticles...)
			wg.Done()
		}()
	}

	wg.Wait()

	var articleResults []map[string]string
	sb_err := supabase.DB.From("articles").Upsert(articles).Execute(&articleResults)

	elapsed := time.Since(start)

	log.Printf("Article Upsert Result: %+v\n", articleResults)

	log.Printf("Refreshed %d Articles in %s\n", len(articles), elapsed)

	parse.HandleResponse(w, parse.Response{
		AffectedCount: len(articles),
		Error:         sb_err,
	}, len(articles) > 0)

}
