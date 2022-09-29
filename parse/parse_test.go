package parse_test

import (
	_ "embed"
	"testing"

	"github.com/knightspore/rag/parse"
)

func TestAtomUnmarshal(t *testing.T) {

	atom, err := parse.NewFeed("https://www.groundup.org.za/sitenews/atom/")
	if err != nil {
		t.Log("Error creating new Atom Feed")
		t.Fatal(err)
	}

	_, err = parse.UnmarshalAtom(atom.Doc)
	if err != nil {
		t.Fatal(err)
	}
}

func TestRSSUnmarshal(t *testing.T) {

	rss, err := parse.NewFeed("https://www.wired.com/feed/category/business/latest/rss")
	if err != nil {
		t.Log("Error creating new RSS Feed")
		t.Fatal(err)
	}

	_, err = parse.UnmarshalRSS(rss.Doc)
	if err != nil {
		t.Fatal(err)
	}

}
