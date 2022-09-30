package parse

import (
	"time"

	"github.com/google/uuid"
)

type SubscriptionResponse struct {
	ID          uuid.UUID   `json:"id"`
	UpdatedAt   time.Time   `json:"updated_at"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	URL         string      `json:"url"`
	Icon        string      `json:"icon"`
	User        string      `json:"user"`
	Muted       bool        `json:"muted"`
	Articles    []uuid.UUID `json:"articles"`
}

type ArticlesResponse struct {
	ID           uuid.UUID `json:"id"`
	CreatedAt    time.Time `json:"created_at"`
	Title        string    `json:"title"`
	URL          string    `json:"url"`
	PubDate      string    `json:"pub_date"`
	Description  string    `json:"description"`
	IsRead       bool      `json:"is_read"`
	Subscription string    `json:"subscription"`
	Content      string    `json:"content"`
}

func GetSubscription(xml XML, url string, icon string, user string) SubscriptionResponse {
	return SubscriptionResponse{
		ID:          uuid.New(),
		UpdatedAt:   time.Now(),
		Title:       xml.Feed.Title,
		Description: xml.Feed.Description,
		URL:         url,
		Icon:        icon,
		User:        user,
		Muted:       false,
		Articles:    []uuid.UUID{},
	}
}

func GetArticles(xml XML, url string) ([]ArticlesResponse, []uuid.UUID) {

	var feedItems []EntriesXML
	var articles []ArticlesResponse
	var articleIDs []uuid.UUID

	if len(xml.Feed.Entries) > len(xml.Feed.Items) {
		feedItems = append(feedItems, xml.Feed.Entries...)
	} else {
		feedItems = append(feedItems, xml.Feed.Items...)
	}

	for _, item := range feedItems {
		id := uuid.New()
		articles = append(articles, ArticlesResponse{
			ID:           id,
			CreatedAt:    time.Now(),
			Title:        item.Title,
			URL:          item.URL,
			PubDate:      item.PubDate,
			Description:  item.Description,
			IsRead:       false,
			Subscription: xml.Feed.Title,
			Content:      item.Content,
		})
		articleIDs = append(articleIDs, id)
	}

	return articles, articleIDs

}
