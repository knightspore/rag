export async function refreshSubscriptions(id?: string) {
        await fetch("/api/subscriptions/refresh", {
            method: "POST",
            body: JSON.stringify({
                userId: id
            })
        })
}

export async function getSummary(userId: string) {
  const res = await fetch("/api/experimental/summary", {
    method: "POST",
    body: JSON.stringify({
      userId: userId
    })
  })
  const data = await res.json()
  return data
}

export async function parseFeed(url: string, userId: string) {
    const res = await fetch("/api/feed/parse", {
      method: "POST",
      body: JSON.stringify({
        url: url,
        userId: userId
      })
    })
    const data = await res.json()
    return data
}

export async function readArticle(url: string) { 
    const res = await fetch("/api/articles/read", {
        method: "POST",
        body: JSON.stringify({
            url: url
        })
    })
    const data = await res.json()
    return data
}
