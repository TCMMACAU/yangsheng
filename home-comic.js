(function(){
var P=location.pathname.replace(/index\.html$/,"");if(P!=="/yangsheng/"&&P!=="/yangsheng")return;
var TITLE="薄外套，出門備";
var KICK="四格漫畫 · 阿力同豆豆 · 隔周六更新";
var ALT="四格漫畫：阿力同豆豆喺湖邊亭榭。豆豆話立冬喎，澳門仲咁暖；阿力話雖然日間仲係暖暖哋，但係一到夜晚就會涼；阿力著外套，話所以呢，出街記住帶外套；夜晚豆豆攬住阿力，話咁你比啲溫暖我啦。";
var SRC="/yangsheng/art/comics/lidong-bao-nuan.jpg?v=1";
var css="#home-comic{margin-top:2.5rem}#home-comic .hc-box{border:1px solid var(--color-line,#d8ccb6);border-radius:var(--radius-card,1.25rem);background:var(--color-paper,#f3ecdf);padding:1.5rem}#home-comic .hc-kick{font-size:.875rem;letter-spacing:.12em;color:#3F6B5C}#home-comic h2{margin-top:.4rem;margin-bottom:1rem;font-family:'Noto Serif TC',serif;font-size:1.875rem;line-height:1.25;color:var(--color-ink,#1c241f)}#home-comic figure{overflow:hidden;border:1px solid var(--color-line,#d8ccb6);border-radius:var(--radius-card,1.25rem);background:var(--color-paper,#f3ecdf);margin:0}#home-comic img{display:block;width:100%;height:auto}#home-comic .hc-foot{margin-top:1rem;display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;font-size:.875rem}#home-comic .hc-foot a{color:#3F6B5C;text-decoration:none;border-bottom:1px solid rgba(63,107,92,.35)}@media print{#home-comic{display:none}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function html(){
return '<div class="hc-box"><p class="hc-kick">'+KICK+'</p><h2>'+TITLE+'</h2><figure><img src="'+SRC+'" alt="'+ALT+'" loading="lazy" decoding="async" width="1152" height="864"></figure><div class="hc-foot"><a href="/yangsheng/season/winter">睇冬季養生：冬藏補腎 ›</a><a href="/yangsheng/#jq-note">立冬節氣小記 ›</a></div></div>';
}
function anchor(){
var note=document.getElementById("jq-note");
if(note)return note;
var s=document.querySelectorAll("main > section");
return s.length?s[0]:null;
}
function put(){
if(document.getElementById("home-comic"))return;
var a=anchor();if(!a||!a.parentNode)return;
var e=document.createElement("section");
e.id="home-comic";
e.className="mx-auto max-w-6xl px-4";
e.setAttribute("aria-label",KICK+" · "+TITLE);
e.innerHTML=html();
a.parentNode.insertBefore(e,a.nextSibling);
}
function go(){setTimeout(function(){put();new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true});},1400);}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
