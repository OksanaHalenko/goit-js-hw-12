export function createRequest(data) {
    const params = new URLSearchParams({
        key: "43244654-6a0ffb606fc9a226d05679f88",
        q: data,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    });

    return fetch(`https://pixabay.com/api/?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Sorry, there are no images matching your search query. Please try again!")
            }
            return response.json();
    })
}