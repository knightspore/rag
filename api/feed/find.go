package handler

import (
	"log"
	"net/http"

	"github.com/knightspore/rag/parse"
)

func FeedFindHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r) // req.URL

	var collectedURLs []string

	collectedURLs = append(collectedURLs, parse.GetXMLLinksFromPage(req.URL)...)
	collectedURLs = append(collectedURLs, parse.GetXMLLinksFromPaths(req.URL))

	seen := make(map[string]bool)
	urls := []string{}

	for _, url := range collectedURLs {
		if _, ok := seen[url]; !ok {
			seen[url] = true
			urls = append(urls, url)
		}
	}

	log.Printf("Found Feeds: %q\n", req.URL)
	log.Printf("%d urls found\n", len(urls))

	parse.HandleResponse(w, parse.Response{
		FoundURLs: urls,
	}, len(urls) > 0)

}
