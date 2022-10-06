package handler

import (
	"log"
	"net/http"
	"sync"

	"github.com/knightspore/rag/parse"
)

func FeedGetHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r)

	icon := "https://www.google.com/s2/favicons?domain=" + req.URL

	var wg sync.WaitGroup
	var subscription parse.SubscriptionResponse
	var articles []parse.ArticlesResponse

	wg.Add(2)

	go func() {
		articles = parse.GetArticles(req.URL, req.UserID)
		wg.Done()
	}()
	go func() {
		subscription = parse.GetSubscription(req.URL, icon, req.UserID)
		wg.Done()
	}()

	wg.Wait()

	log.Printf("Get Feed: %q\n", subscription.Title)
	log.Printf("%d articles found\n", len(articles))
	for _, a := range articles {
		log.Printf("%+v", a)
	}

	parse.HandleResponse(w, parse.Response{
		Subscriptions: []parse.SubscriptionResponse{subscription},
		Articles:      articles,
	}, len(articles) > 0)

}
