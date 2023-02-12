package parse_test

import (
	"testing"

	"github.com/knightspore/rag/parse"
)

var urls = []string{
	"https://levels.io/rss/",
	"https://www.wired.com/feed/category/backchannel/latest/rss",
	"https://feeds.arstechnica.com/arstechnica/technology-lab",
	"https://ciaran.co.za/rss.xml",
	"https://overreacted.io/rss.xml",
	"https://www.emgoto.com/rss.xml",
	"https://news.ycombinator.com/rss",
	"https://www.joshwcomeau.com/rss.xml",
	"https://jovicailic.org/feed/",
	"https://kentcdodds.com/blog/rss.xml",
	"https://www.protocol.com/feeds/feed.rss",
	"http://techcrunch.com/feed/",
	"https://www.bellingcat.com/feed",
	"https://matthewmcateer.me/rss.xml",
	"https://whitep4nth3r.com/feed.xml",
	"https://timdaub.github.io/atom.xml",
	"https://steve-yegge.blogspot.com/atom.xml",
	"http://lesswrong.com/.rss",
	"http://n-gate.com/index.rss",
	"https://twobithistory.org/feed.xml",
}

func TestGetSubscription(t *testing.T) {

	t.Parallel()

	for _, url := range urls {

		t.Run(url, func(t *testing.T) {

			feed := parse.GetSubscription(url, "icon", "user")

			t.Run("has title", func(t *testing.T) {
				if !(len(feed.Title) > 0) {
					t.Fatalf("%q: no title Found", url)
				}
			})

			t.Run("has description", func(t *testing.T) {
				if !(len(feed.Description) > 0) {
					t.Fatalf("%q: no description found", url)
				}
			})

		})

	}

}

func TestGetArticles(t *testing.T) {

	t.Parallel()

	for _, url := range urls {

		t.Run(url, func(t *testing.T) {

			articles := parse.GetArticles(url, "user")

			t.Run("has articles", func(t *testing.T) {
				if !(len(articles) > 0) {
					t.Fatalf("%q: no title Found", url)
				}
			})

			t.Run("has article titles", func(t *testing.T) {
				var count int
				for _, a := range articles {
					if !(len(a.Title) > 0) {
						count++
					}
				}

				if count > 0 {
					t.Fatalf("%q: no titles found for %d articles", url, count)
				}
			})

		})

	}

}
