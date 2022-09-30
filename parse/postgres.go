package parse

import (
	"fmt"
	"net/url"

	postgrest "github.com/nedpals/postgrest-go/pkg"
)

type Supabase struct {
	DB *postgrest.Client
}

func CreateClient(baseURL string, supabaseKey string) *Supabase {

	parsedURL, err := url.Parse(fmt.Sprintf("%s/rest/v1/", baseURL))
	if err != nil {
		panic(err)
	}

	return &Supabase{
		DB: postgrest.NewClient(
			*parsedURL,
			postgrest.WithTokenAuth(supabaseKey),
			func(c *postgrest.Client) {
				c.AddHeader("apiKey", supabaseKey)
			},
		),
	}

}
