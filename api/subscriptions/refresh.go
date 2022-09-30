package handler

import (
	"fmt"
	"net/http"

	"github.com/knightspore/rag/parse"
)

func SubscriptionsRefreshHandler(w http.ResponseWriter, r *http.Request) {

	supabase := parse.CreateClient("https://sgzquvqpyebgqnecoaoa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnenF1dnFweWViZ3FuZWNvYW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM0NjE0MjcsImV4cCI6MTk3OTAzNzQyN30.o0BiNeWuUxDTC77mbzjJ2nMOvXrbxPWL8Mx6eHDeMdk")

	req := parse.HandleRequest(r)

	var articles []parse.ArticlesResponse
	for _, url := range req.URLs {
		xml, err := parse.NewFeed(url)
		if err != nil {
			fmt.Fprintf(w, "%s", err.Error())
		}
		newArticles := parse.GetArticles(xml, url)
		articles = append(articles, newArticles...)
	}

	sb_err := supabase.DB.From("articles").Upsert(articles).Execute(nil)

	parse.HandleResponse(w, parse.Response{
		AffectedCount: len(articles),
		Error:         sb_err,
	}, len(articles) > 0)

}
