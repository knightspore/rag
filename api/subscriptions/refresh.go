package handler

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/knightspore/rag/parse"
)

func SubscriptionsRefreshHandler(w http.ResponseWriter, r *http.Request) {

	supabase := parse.CreateClient("https://sgzquvqpyebgqnecoaoa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnenF1dnFweWViZ3FuZWNvYW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM0NjE0MjcsImV4cCI6MTk3OTAzNzQyN30.o0BiNeWuUxDTC77mbzjJ2nMOvXrbxPWL8Mx6eHDeMdk")

	req := parse.HandleRequest(r)
	var results []map[string]string
	err := supabase.DB.From("subscriptions").Select("url").Eq("user", req.UserID).Execute(&results)
	if err != nil {
		log.Println(err)
	}

	articles := 0

	var wg sync.WaitGroup

	for _, r := range results {
		wg.Add(1)

		go func(url string) {

			start := time.Now()
			a := parse.GetArticles(url, req.UserID)

			articles += len(a)
			var r []map[string]string
			err := supabase.DB.From("articles").Upsert(a).Execute(&r)

			log.Printf("Insert %q Articles Result: %+v", a[0].Subscription, r)
			log.Printf("Errors: %+v", err)
			log.Printf("Refreshed %d Articles in %s\n", len(a), time.Since(start))
			log.Printf("=== === === ===")

			wg.Done()

		}(r["url"])
	}

	wg.Wait()

	parse.HandleResponse(w, parse.Response{
		AffectedCount: articles,
	}, articles > 0)

}
