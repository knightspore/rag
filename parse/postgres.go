package parse

import (
	"fmt"
	"net/url"
	"os"

	"github.com/joho/godotenv"
	postgrest "github.com/nedpals/postgrest-go/pkg"
)

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
