package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	md "github.com/JohannesKaufmann/html-to-markdown"
)

type ArticlesReadResponseData struct {
	Content string `json:"content"`
}

func SendErr(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprint(w, "")
}

func ArticlesReadHandler(w http.ResponseWriter, r *http.Request) {

	var req struct {
		URL string `json:"url"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	res, err := http.Get(req.URL)
	if err != nil {
		SendErr(w)
	}
	defer res.Body.Close()
	html, err := io.ReadAll(res.Body)
	if err != nil {
		SendErr(w)
	}

	converter := md.NewConverter("", true, nil)
	content, err := converter.ConvertString(string(html))
	if err != nil {
		SendErr(w)
	}

	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "text/plain")

	if len(content) > 0 {
		w.WriteHeader(http.StatusFound)
		fmt.Fprintf(w, "%s", content)
		return
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprint(w, "")
	}

}
