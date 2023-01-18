# RAG Feed Reader

Roll-your-own rag! No ads, no paywalls.

# Project Structure

- `/src` - NextJS Web App Front-End
- `/api` - Go backend functions hosted on Vercel
- `/parse` - Go Library for Managing / Parsing XML Feeds

## TO-DO

There are still a number of outstanding features / refactors to complete:

- Refresh the client automatically when articles are refreshed.
- App Filters
  - The "Likes" filter button should re-execute the query with 'likes' selected
  - The "Unread" fitler should also re-execute the query
- Scroll-based pagination

