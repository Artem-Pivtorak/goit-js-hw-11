import{a as y,S as h,i as n}from"./assets/vendor-hwdYKDic.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const b="46181827-8f08ac25b58b643ff6d61f160",L="https://pixabay.com/api/";async function P(o,t=1,i=40){try{return(await y.get(L,{params:{key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i}})).data}catch(s){throw console.error("Помилка запиту до Pixabay API:",s),s}}function q(o){const t=document.querySelector(".gallery"),i=o.map(({webformatURL:s,largeImageURL:e,tags:r,likes:a,views:m,comments:p,downloads:g})=>`
      <a class="gallery__item" href="${e}">
        <div class="photo-card">
          <img src="${s}" alt="${r}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${a}
            </p>
            <p class="info-item">
              <b>Views:</b> ${m}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${p}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${g}
            </p>
          </div>
        </div>
      </a>
    `).join("");t.insertAdjacentHTML("beforeend",i)}let l=1,c="";const v=document.querySelector("#search-form"),S=document.querySelector(".gallery"),d=document.querySelector(".load-more"),u=document.querySelector(".loader-wrapper");let w=new h(".gallery a");const f=o=>{o?u.classList.remove("is-hidden"):u.classList.add("is-hidden")};v.addEventListener("submit",o=>{if(o.preventDefault(),c=o.currentTarget.elements.searchQuery.value.trim(),l=1,S.innerHTML="",!c){n.warning({title:"Warning",message:"Please enter a search query."});return}f(!0),P(c,l).then(t=>{if(t.hits.length===0){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}q(t.hits),w.refresh(),t.totalHits>l*40?d.classList.remove("is-hidden"):d.classList.add("is-hidden")}).catch(t=>{n.error({title:"Error",message:"An error occurred while fetching images. Please try again later."})}).finally(()=>{f(!1)})});
//# sourceMappingURL=index.js.map
