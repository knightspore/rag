package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/knightspore/rag/parse"
)

type FeedGetResponseData struct {
	Subscription parse.SubscriptionResponse `json:"subscription"`
	Articles     []parse.ArticlesResponse   `json:"articles"`
}

func FeedGetHandler(w http.ResponseWriter, r *http.Request) {

	var req struct {
		URL    string `json:"url"`
		UserID string `json:"userId"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	xml, err := parse.NewFeed(req.URL)
	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}

	icon := "https://www.google.com/s2/favicons?domain=" + req.URL

	articles, articleIDs := parse.GetArticles(xml, req.URL)
	subscription := parse.GetSubscription(xml, req.URL, icon, req.UserID)
	subscription.Articles = articleIDs

	j, err := json.Marshal(FeedGetResponseData{
		Subscription: subscription,
		Articles:     articles,
	})

	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")

	if len(articles) > 0 {
		w.WriteHeader(http.StatusFound)
		fmt.Fprintf(w, "%s", j)
		return
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprint(w, "{ \"error\": 400 }")
	}

}
