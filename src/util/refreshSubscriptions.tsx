export default async function refreshSubscriptions(id: string) {
        await fetch("/api/subscriptions/refresh", {
            method: "POST",
            body: JSON.stringify({
                userId: id
            })
        })
    }

