(function(){
/* Prefetch slow destinations: static pages (full reload) + suixi lazy chunk. */
var PAGES=["/yangsheng/jieqi/","/yangsheng/wenhua/","/yangsheng/tizhi/","/yangsheng/shiling/","/yangsheng/suixi/","/yangsheng/"];
var CHUNKS=[
  "/yangsheng/assets/suixi-vOuKplant2.js",
  "/yangsheng/assets/foods-E60plant1.js",
  "/yangsheng/assets/site-frame-CmDBnav2.js",
  "/yangsheng/assets/routes-sMEKTID9.js",
  "/yangsheng/assets/index-BkQbplant2.js"
];
var done=Object.create(null);
function mark(u){if(done[u])return true;done[u]=1;return false;}
function prefetchHtml(url){
  if(mark("h:"+url))return;
  var l=document.createElement("link");
  l.rel="prefetch";
  l.as="document";
  l.href=url;
  document.head.appendChild(l);
}
function preloadMod(url){
  if(mark("m:"+url))return;
  var l=document.createElement("link");
  l.rel="modulepreload";
  l.href=url;
  document.head.appendChild(l);
}
function warmAll(){
  PAGES.forEach(prefetchHtml);
  CHUNKS.forEach(preloadMod);
}
function hover(e){
  var a=e.target&&e.target.closest&&e.target.closest("a[href]");
  if(!a)return;
  var href=a.getAttribute("href")||"";
  if(href.indexOf("/yangsheng/jieqi")>=0||href.indexOf("/yangsheng/wenhua")>=0||href.indexOf("/yangsheng/tizhi")>=0||href.indexOf("/yangsheng/shiling")>=0){
    prefetchHtml(a.href);
  }
  if(href.indexOf("/suixi")>=0){
    preloadMod("/yangsheng/assets/suixi-vOuKplant2.js");
    preloadMod("/yangsheng/assets/foods-E60plant1.js");
  }
  if(href==="/yangsheng/"||href==="/yangsheng"){
    preloadMod("/yangsheng/assets/index-BkQbplant2.js");
    preloadMod("/yangsheng/assets/site-frame-CmDBnav2.js");
  }
}
document.addEventListener("pointerenter",hover,true);
document.addEventListener("touchstart",hover,{capture:true,passive:true});
function idle(){
  if(window.requestIdleCallback)requestIdleCallback(warmAll,{timeout:2500});
  else setTimeout(warmAll,1200);
}
if(document.readyState!=="loading")idle();else document.addEventListener("DOMContentLoaded",idle);
})();
