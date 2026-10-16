(function(){
var s=document.createElement("style");
s.textContent="#totop{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:50;width:56px;height:56px;border-radius:50%;border:0;background:#3F6B5C;color:#F3EEE4;font:500 11px/1.1 'Noto Serif TC',serif;letter-spacing:.06em;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;box-shadow:0 4px 14px rgba(26,40,52,.22);opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .25s,transform .25s,visibility .25s}#totop.on{opacity:1;visibility:visible;transform:none}#totop:focus-visible{outline:2px solid #1A2834;outline-offset:3px}#totop svg{width:18px;height:18px}body{padding-bottom:88px}@media (prefers-reduced-motion:reduce){#totop{transition:none}}@media print{#totop{display:none}}";
document.head.appendChild(s);
var b=document.createElement("button");b.id="totop";b.type="button";b.setAttribute("aria-label","返回頂部");
b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span aria-hidden="true">頂部</span>';
b.onclick=function(){var r=matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:r?"auto":"smooth"});};
document.body.appendChild(b);
function u(){b.classList.toggle("on",window.scrollY>600);}
addEventListener("scroll",u,{passive:true});u();
})();
