package handler

import (
	"fmt"
	"net/http"
)

func SubscriptionsRefreshHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusFound)
	fmt.Fprintf(w, "%d", 200)
}
