import{a as S,i as d,S as w}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();async function y(i,t){const a=new URLSearchParams({key:"43244654-6a0ffb606fc9a226d05679f88",q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}),{data:o}=await S.get(`https://pixabay.com/api/?${a}`);return o}function p(i){return i.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,views:r,comments:n,downloads:b})=>`<li class="gallery-item">
                <a class="gallery-link" href="${a}" >
                   <img
                     class = "gallery-image"
                     src = "${t}"
                     alt = "${o}"
                     />
                 </a>
                 <div class = "img-inform-wrapper">
                 <div class = "img-inform">
                 <h2 class ="img-title">Likes</h2>
                 <p class = "img-text">${e}</p>
                 </div>
                  <div class = "img-inform">
                 <h2 class ="img-title">Views</h2>
                 <p class = "img-text">${r}</p>
                 </div>
                  <div class = "img-inform">
                 <h2 class ="img-title">Comments</h2>
                 <p class = "img-text">${n}</p>
                 </div>
                  <div class = "img-inform">
                 <h2 class ="img-title">Downloads</h2>
                 <p class = "img-text">${b}</p>
                 </div></div>
            </li>`).join("")}function u(i){i.style.display="block"}function l(i){i.style.display="none"}const v=document.querySelector(".search-form"),h=document.querySelector(".gallery"),c=document.querySelector(".loading-indicator"),m=document.querySelector(".load-btn");let g="",s=1,f=0;v.addEventListener("submit",q);m.addEventListener("click",P);async function q(i){if(i.preventDefault(),h.innerHTML="",l(m),g=i.currentTarget.elements.data.value.trim(),g==="")return d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});u(c);try{s=1;const t=await y(g,s);if(t.hits.length===0)return l(c),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});v.reset(),h.innerHTML=p(t.hits),f=Math.ceil(t.total/15),s<f&&u(m),L.refresh()}catch{d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{l(c)}}async function P(i){s+=1,l(m),u(c);try{const t=await y(g,s);h.insertAdjacentHTML("beforeend",p(t.hits));const{height:a}=h.firstElementChild.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"}),s<f&&u(m),L.refresh()}catch{d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{l(c)}}let L=new w(".gallery a",{captionsData:"alt",captionsPosition:"bottom",captionsDelay:250});
//# sourceMappingURL=commonHelpers.js.map
