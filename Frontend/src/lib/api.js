const URL = "http://localhost:3001";

export async function fetchAllMountains() {
    const response = await fetch(`${URL}/mountains`)

    if (!response.ok) {
        throw new Error("Failed to fetch mountains")
    }

    const data = await response.json()
    return data
}

export async function fetchMountainById(id) {
    const response = await fetch(`${URL}/mountains/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch mountain")
    }

    const data = await response.json()
    return data
}

export async function createPost(post) {
    const response = await fetch(`${URL}/mountains`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    })

    if (!response.ok) {
        throw new Error("An error occured while fetching")
    }

    const data = await response.json()
    return data
}

export async function updatePost(post) {
    const response = await fetch(`${URL}/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    })

    if (!response.ok) {
        throw new Error("An error occured while fetching")
    }

    const data = await response.json()
    return data
}

export async function deletePostById(id) {
    const response = await fetch(`${URL}/posts/${id}`, {
        method: "DELETE"
    })

    if (!response.ok) {
        throw new Error("An error occured while fetching")
    }
}