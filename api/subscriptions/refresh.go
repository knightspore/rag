package handler

import (
	"fmt"
	"log"
	"net/http"

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

	var urls []string
	for _, r := range results {
		urls = append(urls, r["url"])
	}

	var articles []parse.ArticlesResponse
	for _, url := range urls {
		xml, err := parse.NewFeed(url)
		if err != nil {
			fmt.Fprintf(w, "%s", err.Error())
		}
		newArticles := parse.GetArticles(xml, url)
		articles = append(articles, newArticles...)
	}

	sb_err := supabase.DB.From("articles").Upsert(articles).Execute(nil)

	log.Printf("Affected Articles: %q\n", len(articles))
	for _, a := range articles {
		log.Printf("%+v\n", a)
	}

	parse.HandleResponse(w, parse.Response{
		AffectedCount: len(articles),
		Error:         sb_err,
	}, len(articles) > 0)

}
