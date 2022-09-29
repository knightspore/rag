package parse

type AtomFeed struct {
	Title       string      `xml:"title" json:"title"`
	Description string      `xml:"description" json:"description"`
	URL         string      `xml:"link" json:"url"`
	LastUpdated string      `xml:"updated" json:"lastUpdated"`
	Articles    []AtomEntry `xml:"entry" json:"articleList"`
}

type AtomEntry struct {
	PubDate     string `xml:"pubDate" json:"pubDate"`
	PubEpoch    int64  `xml:"pubEpoch" json:"pubEpoch"`
	Title       string `xml:"title" json:"title"`
	Description string `xml:"description" json:"description"`
	Content     string `xml:"content" json:"content"`
	URL         string `xml:"link" json:"url"`
}

type RSSFeed struct {
	Title       string    `xml:"channel>title" json:"title"`
	Description string    `xml:"channel>description" json:"description"`
	URL         string    `xml:"channel>link" json:"url"`
	LastUpdated string    `xml:"channel>updated" json:"lastUpdated"`
	Articles    []RSSItem `xml:"channel>item" json:"articleList"`
}

type RSSItem struct {
	PubDate     string `xml:"pubDate" json:"pubDate"`
	PubEpoch    int64  `xml:"pubEpoch" json:"pubEpoch"`
	Title       string `xml:"title" json:"title"`
	Description string `xml:"description" json:"description"`
	Content     string `xml:"content" json:"content"`
	URL         string `xml:"link" json:"url"`
}
