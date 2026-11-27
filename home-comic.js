(function(){
var P=location.pathname.replace(/index\.html$/,"");if(P!=="/yangsheng/"&&P!=="/yangsheng")return;
var KICK="四格漫畫 · 阿力同豆豆 · 隔周六更新";
var ARCHIVE_HREF="/yangsheng/comics/";
var ARCHIVE_LABEL="睇過往四格 ›";
var css="#home-comic{margin-top:2.5rem}#home-comic .hc-box{border:1px solid var(--color-line,#d8ccb6);border-radius:var(--radius-card,1.25rem);background:var(--color-paper,#f3ecdf);padding:1.5rem}#home-comic .hc-kick{font-size:.875rem;letter-spacing:.12em;color:#3F6B5C}#home-comic h2{margin-top:.4rem;margin-bottom:1rem;font-family:'Noto Serif TC',serif;font-size:1.875rem;line-height:1.25;color:var(--color-ink,#1c241f)}#home-comic figure{overflow:hidden;border:1px solid var(--color-line,#d8ccb6);border-radius:var(--radius-card,1.25rem);background:var(--color-paper,#f3ecdf);margin:0}#home-comic img{display:block;width:100%;height:auto}#home-comic .hc-foot{margin-top:1rem;display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;font-size:.875rem}#home-comic .hc-foot a{color:#3F6B5C;text-decoration:none;border-bottom:1px solid rgba(63,107,92,.35)}@media print{#home-comic{display:none}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c];});}
function comic(){
  var api=window.YSComics;
  if(api&&typeof api.current==="function")return api.current();
  return null;
}
function html(c){
  var links=(c.links||[]).map(function(l){return '<a href="'+esc(l.href)+'">'+esc(l.label)+'</a>';});
  links.push('<a href="'+ARCHIVE_HREF+'">'+ARCHIVE_LABEL+'</a>');
  return '<div class="hc-box"><p class="hc-kick">'+esc(KICK)+'</p><h2>'+esc(c.title)+'</h2><figure><img src="'+esc(c.src)+'" alt="'+esc(c.alt)+'" loading="lazy" decoding="async" width="'+(c.width||1152)+'" height="'+(c.height||864)+'"></figure><div class="hc-foot">'+links.join("")+'</div></div>';
}
function anchor(){
var note=document.getElementById("jq-note");
if(note)return note;
var s=document.querySelectorAll("main > section");
return s.length?s[0]:null;
}
function put(){
if(document.getElementById("home-comic"))return;
var c=comic();if(!c)return;
var a=anchor();if(!a||!a.parentNode)return;
var e=document.createElement("section");
e.id="home-comic";
e.className="mx-auto max-w-6xl px-4";
e.setAttribute("aria-label",KICK+" · "+c.title);
e.innerHTML=html(c);
a.parentNode.insertBefore(e,a.nextSibling);
}
function go(){setTimeout(function(){put();new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true});},1400);}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
