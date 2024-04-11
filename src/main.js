import axios from 'axios';
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

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
     gallery.innerHTML = "";
    const dataSearch = event.currentTarget.elements.data.value.trim();
    if (dataSearch === "") {
            return iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
             position: "topRight"
            });
    };
     showLoading(loader);
    createRequest(dataSearch)
        .then(data => {
            if (data.hits.length === 0) {
                hideLoading(loader);
                return iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                 position: "topRight"
                })
            }
            form.reset();
           
            gallery.innerHTML = createGallery(data.hits);
            lightboxGallery.refresh();
        })
        .catch(error => {
            iziToast.error({
               message: `${error}`,
            });
        })
        .finally(() => {
           
             hideLoading(loader);
    })
}

let lightboxGallery = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionsPosition: "bottom",
    captionsDelay: 250
});

