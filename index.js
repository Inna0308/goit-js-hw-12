import{a as h,S as L,i as o}from"./assets/vendor-DKcYUvi-.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g=t=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${t.largeImageURL}">
        <img
          class="gallery-image"
          src="${t.webformatURL}"
          data-source="${t.largeImageURL}"
          alt="${t.tags}"
        />
      </a>
      <div class="wrapper">
        <ul class="img-content-wrapper">
          <li class="text-info">
            Likes<span class="number">${t.likes}</span>
          </li>
          <li class="text-info">
            Views<span class="number">${t.views}</span>
          </li>
          <li class="text-info">
            Comments<span class="number">${t.comments}</span>
          </li>
          <li class="text-info">
            Downloads<span class="number">${t.downloads}</span>
          </li>
        </ul>
      </div>
    </li>
    `;h.defaults.baseURL="https://pixabay.com/api/";const y=(t,s)=>{const a={params:{key:"45714704-c3295be315f324c1eb86e3dfd",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s}};return h.get("",a)},d=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),l=document.querySelector(".js-loader"),p=document.querySelector(".js-load-more"),f=new L(".js-gallery a",{overlayOpacity:.9,captions:!0,captionsData:"alt",captionDelay:350});let c=1,u="";const b=async t=>{try{if(t.preventDefault(),u=d.elements.user_query.value.trim(),c=1,!u){o.warning({message:"Input field must not be empty.",position:"topRight"});return}n.innerHTML="",l.classList.remove("is-hidden");const s=await y(u,c);if(!s.data.hits.length){o.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.innerHTML="",d.reset(),l.classList.add("is-hidden"),p.classList.add("is-hidden");return}const a=s.data.hits.map(i=>g(i)).join("");n.innerHTML=a,p.classList.remove("is-hidden"),f.refresh(),d.reset()}catch{o.error({message:"Try again.",position:"topRight"})}finally{l.classList.add("is-hidden")}},v=async t=>{try{c++,l.classList.remove("is-hidden");const s=await y(u,c),a=s.data.hits.map(r=>g(r)).join("");n.insertAdjacentHTML("beforeend",a),f.refresh();const{height:i}=n.firstElementChild.getBoundingClientRect();scrollBy({top:i*2,behavior:"smooth"});const e=Math.ceil(s.data.totalHits/15);c>=e&&(p.classList.add("is-hidden"),o.warning({title:Note,message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{o.error({message:"The end of search results.",position:"topRight"})}finally{l.classList.add("is-hidden")}};d.addEventListener("submit",b);p.addEventListener("click",v);
//# sourceMappingURL=index.js.map
