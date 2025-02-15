import{a as L,S as v,i as c}from"./assets/vendor-hwdYKDic.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const w="46181827-8f08ac25b58b643ff6d61f160",P="https://pixabay.com/api/";async function m(r,s=1,i=40){try{return(await L.get(P,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:i}})).data}catch(o){throw console.error("Помилка запиту до Pixabay API:",o),o}}function h(r){const s=document.querySelector(".gallery"),i=r.map(({webformatURL:o,largeImageURL:e,tags:t,likes:n,views:y,comments:g,downloads:b})=>`
      <a class="gallery__item" href="${e}">
        <div class="photo-card">
          <img src="${o}" alt="${t}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${n}
            </p>
            <p class="info-item">
              <b>Views:</b> ${y}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${g}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${b}
            </p>
          </div>
        </div>
      </a>
    `).join("");s.insertAdjacentHTML("beforeend",i)}let a=1,l="";const q=document.querySelector("#search-form"),S=document.querySelector(".gallery"),d=document.querySelector(".load-more"),u=document.querySelector(".loader-wrapper");let p=new v(".gallery a");const f=r=>{r?u.classList.remove("is-hidden"):u.classList.add("is-hidden")};q.addEventListener("submit",async r=>{if(r.preventDefault(),l=r.currentTarget.elements.searchQuery.value.trim(),a=1,S.innerHTML="",!l){c.warning({title:"Warning",message:"Please enter a search query."});return}try{f(!0);const s=await m(l,a);if(s.hits.length===0){c.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}h(s.hits),p.refresh(),s.totalHits>a*40?d.classList.remove("is-hidden"):d.classList.add("is-hidden")}catch{c.error({title:"Error",message:"An error occurred while fetching images. Please try again later."})}finally{f(!1)}});d.addEventListener("click",async()=>{a+=1;try{f(!0);const r=await m(l,a);h(r.hits),p.refresh(),a*40>=r.totalHits&&(d.classList.add("is-hidden"),c.info({title:"End of results",message:"You've reached the end of search results."}))}catch{c.error({title:"Error",message:"An error occurred while fetching more images."})}finally{f(!1)}});
//# sourceMappingURL=index.js.map
