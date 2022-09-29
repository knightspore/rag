package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/knightspore/rag/parse"
)

type Req struct {
	URL string `json:"url"`
}

func Handler(w http.ResponseWriter, r *http.Request) {

	var req Req

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	feed, err := parse.NewFeed(req.URL)
	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}

	fmt.Fprintf(w, "%s", feed.JSON)
}
