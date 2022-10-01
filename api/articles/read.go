package handler

import (
	"fmt"
	"io"
	"log"
	"net/http"

	md "github.com/JohannesKaufmann/html-to-markdown"
	"github.com/knightspore/rag/parse"
)

func SendErr(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprint(w, "")
}

func ArticlesReadHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r)

	res, err := http.Get(req.URL)
	if err != nil {
		SendErr(w)
	}
	defer res.Body.Close()
	html, err := io.ReadAll(res.Body)
	if err != nil {
		SendErr(w)
	}

	converter := md.NewConverter("", true, &md.Options{
		CodeBlockStyle: "fenced",
	})

	content, err := converter.ConvertString(string(html))
	if err != nil {
		SendErr(w)
	}

	log.Printf("Read Article: %s...\n", content[:20])

	parse.HandleResponse(w, parse.Response{
		Content: content,
	}, len(content) > 0)

}
