package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/knightspore/rag/parse"
)

func ArticlesGetHandler(w http.ResponseWriter, r *http.Request) {

	var req parse.Request

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	xml, err := parse.NewFeed(req.URL)
	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}

	articles := parse.GetArticles(xml, req.URL)

	parse.HandleResponse(w, parse.Response{
		Articles: articles,
	}, len(articles) > 0)

}
