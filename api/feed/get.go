package handler

import (
	"fmt"
	"net/http"

	"github.com/knightspore/rag/parse"
)

func FeedGetHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r)

	xml, err := parse.NewFeed(req.URL)
	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}

	icon := "https://www.google.com/s2/favicons?domain=" + req.URL

	articles := parse.GetArticles(xml, req.URL)
	subscription := parse.GetSubscription(xml, req.URL, icon, req.UserID)

	parse.HandleResponse(w, parse.Response{
		Subscriptions: []parse.SubscriptionResponse{subscription},
		Articles:      articles,
	}, len(articles) > 0)

}
