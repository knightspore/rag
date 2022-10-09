package handler

import (
	"fmt"
	"log"
	"net/http"
	"time"

	md "github.com/JohannesKaufmann/html-to-markdown"
	readability "github.com/go-shiori/go-readability"
	"github.com/knightspore/rag/parse"
)

func SendErr(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprint(w, "")
}

func ArticlesReadHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r)

	log.Println("Read URL: ", req.URL)

	article, err := readability.FromURL(req.URL, 30*time.Second)
	if err != nil {
		SendErr(w)
	}

	converter := md.NewConverter("", true, &md.Options{
		CodeBlockStyle: "fenced",
	})

	content, err := converter.ConvertString(string(article.Content))
	if err != nil {
		SendErr(w)
	}

	log.Printf("Read Article: %s...\n", content[:20])

	parse.HandleResponse(w, parse.Response{
		Content: content,
	}, len(content) > 0)

}
