package parse

import (
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
)

type Feed struct {
	URL  string
	Doc  []byte
	JSON []byte
	XML  XML
}

type XML struct {
	Feed FeedXML `xml:",any"`
}

type FeedXML struct {
	Title       string       `xml:"title" json:"title"`
	Description string       `xml:"description" json:"description"`
	LastUpdated string       `xml:"lastBuildDate" json:"lastUpdated"`
	Items       []EntriesXML `xml:"item" json:"items"`
	Entries     []EntriesXML `xml:"entry" json:"entries"`
}

type EntriesXML struct {
	PubDate     string `xml:"pubDate" json:"pubDate"`
	PubEpoch    int64  `xml:"pubEpoch" json:"pubEpoch"`
	Title       string `xml:"title" json:"title"`
	Description string `xml:"description" json:"description"`
	Content     string `xml:"content" json:"content"`
	URL         string `xml:"link" json:"url"`
}

func NewFeed(url string) (XML, error) {

	doc, err := Fetch(url)
	if err != nil || len(doc) == 0 {
		return XML{}, err
	}

	var x XML
	err = xml.Unmarshal(doc, &x)
	if err != nil {
		return XML{}, err
	}

	return x, nil

}

func Fetch(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("GET error: Fetch %s", url)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status error: %s", resp.StatusCode)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("Error reading read body: %s", url)
	}

	return data, nil
}
