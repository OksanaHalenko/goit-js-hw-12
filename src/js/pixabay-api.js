import axios from "axios";

export async function createRequest(dataSearch) {
    const params = new URLSearchParams({
        key: "43244654-6a0ffb606fc9a226d05679f88",
        q: dataSearch,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    });
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
}