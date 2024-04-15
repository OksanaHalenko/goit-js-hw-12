
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createRequest } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import { showLoading } from "./js/render-functions";
import { hideLoading } from "./js/render-functions";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loading-indicator");
const loadBtn = document.querySelector(".load-btn");

let dataSearch = "";
let page = 1;
let allPages = 0;
form.addEventListener("submit", handleSubmit);
loadBtn.addEventListener("click", leadMore);

async function handleSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    hideLoading(loadBtn);
    dataSearch = event.currentTarget.elements.data.value.trim();
    if (dataSearch === "") {
        return iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
        });
    };
    showLoading(loader);
    try {
        page = 1;
        const data = await createRequest(dataSearch, page);
        if (data.hits.length === 0) {
            hideLoading(loader);
            return iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight"
            })
        }
        form.reset();
        gallery.innerHTML = createGallery(data.hits);
        allPages = Math.ceil(data.total / 15);
        if (page < allPages) {
            showLoading(loadBtn);
        }
        
        lightboxGallery.refresh();
    } catch (error) {
        iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
        })
    } finally {
        hideLoading(loader);
    }
}

async function leadMore(event) {
    page += 1;
    hideLoading(loadBtn);
    showLoading(loader);
    try {
        const data = await createRequest(dataSearch, page);
        gallery.insertAdjacentHTML("beforeend", createGallery(data.hits));
        lightboxGallery.refresh();
        const { height } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: "smooth",
        });
 showLoading(loadBtn);
        if (page >= allPages) {
           hideLoading(loadBtn);
            return iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            })
        }
        
        
    } catch (error) {
        iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight"
                })
    } finally {
        hideLoading(loader);
    }
}

let lightboxGallery = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionsPosition: "bottom",
    captionsDelay: 250
});

