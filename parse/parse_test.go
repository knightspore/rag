package parse_test

import (
	_ "embed"
	"testing"

	"github.com/knightspore/rag/parse"
)

func TestUnmarshal(t *testing.T) {

	t.Parallel()

	feed, err := parse.NewFeed("https://www.groundup.org.za/sitenews/atom/")
	if err != nil {
		t.Log("Error creating new Feed")
		t.Fatal(err)
	}

	if !(len(feed.Feed.Title) > 0) {
		t.Fatal("Feed JSON Empty")
	}

}
