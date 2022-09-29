package parse

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Feed struct {
	URL  string
	Doc  []byte
	JSON []byte
}

func NewFeed(url string) (Feed, error) {

	doc, err := Fetch(url)
	if err != nil || len(doc) == 0 {
		return Feed{}, err
	}

	var f FeedXML
	err = xml.Unmarshal(doc, &f)
	if err != nil {
		return Feed{}, err
	}

	j, err := json.Marshal(f)
	if err != nil {
		return Feed{}, err
	}

	return Feed{
		URL:  url,
		Doc:  doc,
		JSON: j,
	}, nil

}

func Fetch(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("GET error: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status error: %v", resp.StatusCode)
	}

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body: %v", err)
	}

	return data, nil
}
