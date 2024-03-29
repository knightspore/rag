package parse

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/joho/godotenv"
	postgrest "github.com/nedpals/postgrest-go/pkg"
)

type Request struct {
	URLs   []string `json:"urls,omitempty"`
	URL    string   `json:"url,omitempty"`
	UserID string   `json:"userId,omitempty"`
}

type Response struct {
	Content       string                 `json:"content,omitempty"`
	FoundURLs     []string               `json:"foundURLs"`
	Articles      []ArticlesResponse     `json:"articles,omitempty"`
	Subscriptions []SubscriptionResponse `json:"subscriptions,omitempty"`
	AffectedCount int                    `json:"affectedCount,omitempty"`
	Error         error                  `json:"error,omitempty"`
}

type SubscriptionResponse struct {
	UpdatedAt   time.Time `json:"updated_at"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	URL         string    `json:"url"`
	Icon        string    `json:"icon"`
	User        string    `json:"user"`
	Muted       bool      `json:"muted"`
}

type ArticlesResponse struct {
	Title        string `json:"title"`
	URL          string `json:"url"`
	PubDate      string `json:"pub_date"`
	Description  string `json:"description,omitempty"`
	Subscription string `json:"subscription"`
	Content      string `json:"content,omitempty"`
	UserID       string `json:"user_id"`
}

type Supabase struct {
	DB *postgrest.Client
}

func CreateClient() (*Supabase, error) {

	godotenv.Load()

	supabaseUrl := os.Getenv("NEXT_PUBLIC_SUPABASE_URL")
	supabaseAnonKey := os.Getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
	if (supabaseUrl == "") || (supabaseAnonKey == "") {
		return nil, fmt.Errorf("Could not load Supabase Environment Variables")
	}

	parsedURL, err := url.Parse(fmt.Sprintf("%s/rest/v1/", supabaseUrl))
	if err != nil {
		panic(err)
	}

	return &Supabase{
		DB: postgrest.NewClient(
			*parsedURL,
			postgrest.WithTokenAuth(supabaseAnonKey),
			func(c *postgrest.Client) {
				c.AddHeader("apiKey", supabaseAnonKey)
			},
		),
	}, nil

}

func Fetch(url string) ([]byte, error) {

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("GET error: Fetch %s", url)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status error: %d for url %q", resp.StatusCode, url)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading read body: %s", url)
	}

	return data, nil
}

func HandleResponse(w http.ResponseWriter, res Response, cond bool) {
	j, err := json.Marshal(res)
	if err != nil {
		panic(err)
	}

	if cond {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusFound)
		fmt.Fprintf(w, "%s", j)
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "%s", j)
	}
}

func HandleRequest(r *http.Request) Request {
	var req Request
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		panic(err)
	}
	return req
}

func GetXMLLinksFromPage(url string) []string {
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

func GetXMLLinksFromPaths(url string) string {
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
