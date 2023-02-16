package handler

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/knightspore/rag/parse"
	"github.com/mmcdole/gofeed"
)

func SubscriptionsRefreshHandler(w http.ResponseWriter, r *http.Request) {

	// Get User Subscriptions from Supabase
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

	log.Printf("Refreshing %d subscriptions for user %q...\n", len(results), req.UserID)

	// Get XML for each Subscription

	var wg sync.WaitGroup
	var allArticles int
	start := time.Now()

	for _, r := range results {
		wg.Add(1)

		go func(url string) {
			doc, err := parse.Fetch(url)
			if err != nil {
				log.Println(err)
			}
			fp := gofeed.NewParser()
			feed, err := fp.ParseString(string(doc))
			if err != nil {
				log.Printf("Error Parsing Doc: %s", err)
			} else {
				var articles []parse.ArticlesResponse
				for _, item := range feed.Items {
					article := parse.ArticlesResponse{
						Title:        item.Title,
						URL:          item.Link,
						PubDate:      item.Published,
						Description:  item.Description,
						Subscription: feed.Title,
						Content:      item.Content,
						UserID:       req.UserID,
					}
					articles = append(articles, article)
				}
				allArticles += len(articles)

				// Insert Articles into Database
				var insert []map[any]any
				err = supabase.DB.From("articles").Upsert(articles).Execute(&insert)
				log.Printf("Refreshed Subscription: %q", feed.Title)
				log.Printf("Insert Result: %+v\n", insert)
				log.Printf("Errors: %+v\n", err)
			}
			wg.Done()
		}(r["url"])
	}

	wg.Wait()

	log.Printf("Refreshed %d Articles in %s for user %s\n", allArticles, time.Since(start), req.UserID)

	parse.HandleResponse(w, parse.Response{
		AffectedCount: allArticles,
	}, allArticles > 0)

}
