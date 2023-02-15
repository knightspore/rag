package handler

import (
	"log"
	"net/http"
	"time"

	"github.com/knightspore/rag/parse"
	"github.com/mmcdole/gofeed"
)

func FeedGetHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r)

	icon := "https://www.google.com/s2/favicons?domain=" + req.URL

	fp := gofeed.NewParser()
	feed, _ := fp.ParseURL(req.URL)

	var subscription parse.SubscriptionResponse
	var articles []parse.ArticlesResponse

	subscription = parse.SubscriptionResponse{
		UpdatedAt:   time.Now(),
		Title:       feed.Title,
		Description: feed.Description,
		URL:         feed.Link,
		Icon:        icon,
		User:        req.UserID,
		Muted:       false,
	}

	for _, item := range feed.Items {
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

	log.Printf("Get Feed: %q\n", subscription.Title)
	log.Printf("%d articles found\n", len(articles))

	parse.HandleResponse(w, parse.Response{
		Subscriptions: []parse.SubscriptionResponse{subscription},
		Articles:      articles,
	}, len(articles) > 0)

}
