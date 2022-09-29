package parse

type FeedXML struct {
	Title       string    `xml:"title" json:"title"`
	Description string    `xml:"description" json:"description"`
	URL         string    `xml:"link" json:"url"`
	LastUpdated string    `xml:"updated" json:"lastUpdated"`
	Articles    []FeedXML `xml:"entry" json:"articleList"`
}

type EntriesXML struct {
	PubDate     string `xml:"pubDate" json:"pubDate"`
	PubEpoch    int64  `xml:"pubEpoch" json:"pubEpoch"`
	Title       string `xml:"title" json:"title"`
	Description string `xml:"description" json:"description"`
	Content     string `xml:"content" json:"content"`
	URL         string `xml:"link" json:"url"`
}
