package handler

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/knightspore/rag/parse"
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
