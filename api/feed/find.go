package handler

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/knightspore/rag/parse"
)

func FeedFindHandler(w http.ResponseWriter, r *http.Request) {

	req := parse.HandleRequest(r) // req.URL

	var collectedURLs []string

	collectedURLs = append(collectedURLs, getXMLLinksFromPage(req.URL)...)
	collectedURLs = append(collectedURLs, getXMLLinksFromPaths(req.URL))

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

func getXMLLinksFromPage(url string) []string {
	var links []string
	res, err := http.Get(url)
	if err != nil {
		return []string{}
	}
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return []string{}
	}
	doc.Find("[rel='alternate'],[type='rss/xml']").Each(func(i int, s *goquery.Selection) {
		href, ok := s.Attr("href")
		if ok && (len(href) < 20) {
			if !strings.Contains(href, "http") {
				links = append(links, url+href)
			} else {
				links = append(links, href)
			}
		}
	})

	log.Printf("Found valid links on page %q\n", url)

	return links
}

func getXMLLinksFromPaths(url string) string {
	paths := createPathList(url)

	var validUrl string

	for _, path := range paths {
		if pageIsXML(path) {
			validUrl = path
			break
		}
	}

	log.Printf("Found link %q on %q\n", validUrl, url)

	return validUrl
}

func createPathList(url string) []string {
	paths := []string{"rss.xml", "rss", "feed.xml", "feed", "atom.xml", "atom", "index.xml", "index"}
	var newPaths []string
	for _, path := range paths {
		newPaths = append(newPaths, fmt.Sprintf("%s/%s", url, path))
	}
	return newPaths
}

func pageIsXML(url string) bool {
	res, _ := http.Get(url)
	ctypes := res.Header["Content-Type"]
	for _, ctype := range ctypes {
		if strings.Contains(ctype, "xml") {
			log.Printf("Got page xml: %q\n", url)
			return true
		}
	}
	log.Printf("Did not get page xml: %q\n", url)
	return false
}
