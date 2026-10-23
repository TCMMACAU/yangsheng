(function(){
/* 分享：WhatsApp、微信（手機用系統分享選單；電腦顯示本機預先生成的二維碼）、複製連結。不經第三方追蹤。 */
var Q={"":"home","season/spring/":"spring","season/summer/":"summer","season/autumn/":"autumn","season/winter/":"winter","suixi/":"suixi","notes/":"notes","jieqi/":"jieqi","wenhua/":"wenhua","tizhi/":"tizhi","shiling/":"shiling"};
var p=location.pathname.replace(/index\.html$/,"").replace(/^\/yangsheng\/?/,"");if(p&&!/\/$/.test(p))p+="/";
var qr=Q[p];
var css="#sh-btn{position:fixed;left:max(16px,env(safe-area-inset-left));bottom:max(16px,env(safe-area-inset-bottom));z-index:50;height:48px;padding:0 18px;border-radius:99px;border:1px solid #d8ccb6;background:#faf6ee;color:#2b2620;font:500 15px/1 'Noto Serif TC',serif;letter-spacing:.08em;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 4px 14px rgba(26,40,52,.16)}#sh-btn svg{width:18px;height:18px}#sh-btn:focus-visible,#sh-m button:focus-visible,#sh-m a:focus-visible{outline:2px solid #3F6B5C;outline-offset:2px}"+
"#sh-m{position:fixed;left:max(16px,env(safe-area-inset-left));bottom:calc(max(16px,env(safe-area-inset-bottom)) + 58px);z-index:51;width:min(300px,calc(100vw - 32px));background:#faf6ee;border:1px solid #d8ccb6;border-radius:18px;padding:12px;box-shadow:0 10px 30px rgba(26,40,52,.2);font:15px/1.5 'Noto Sans TC',sans-serif;color:#2b2620}#sh-m[hidden]{display:none}#sh-m .t{margin:0 4px 8px;font:600 15px 'Noto Serif TC',serif}#sh-m a,#sh-m button.o{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;margin:0 0 6px;border:1px solid #e0d5c2;border-radius:12px;background:#fff;color:#2b2620;text-decoration:none;font:inherit;cursor:pointer;text-align:left}#sh-m i{display:inline-block;width:10px;height:10px;border-radius:50%;font-style:normal}#sh-m .qr{text-align:center;padding:8px 0 2px}#sh-m .qr img{width:180px;height:180px;display:block;margin:0 auto 6px;image-rendering:pixelated}#sh-m .qr p{margin:0;font-size:14px;color:#5b5246}#sh-m .ok{margin:4px 4px 0;font-size:13px;color:#3F6B5C;min-height:1.2em}#sh-m .x{position:absolute;top:6px;right:8px;border:0;background:none;font-size:20px;line-height:1;color:#5b5246;cursor:pointer;padding:6px}body{padding-bottom:80px}@media print{#sh-btn,#sh-m{display:none}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function url(){return location.href.split("?")[0];}
function ttl(){return document.title.replace(/\s*[|·]\s*四時調攝\s*$/,"")+" · 四時調攝";}
var mob=matchMedia("(pointer:coarse)").matches;
function build(){
var b=document.createElement("button");b.id="sh-btn";b.type="button";b.setAttribute("aria-haspopup","true");b.setAttribute("aria-expanded","false");b.setAttribute("aria-controls","sh-m");
b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>分享';
var m=document.createElement("div");m.id="sh-m";m.hidden=true;m.setAttribute("role","dialog");m.setAttribute("aria-label","分享此頁");
m.innerHTML='<button type="button" class="x" aria-label="關閉">×</button><p class="t">分享此頁</p><a id="sh-wa" target="_blank" rel="noopener noreferrer"><i style="background:#25D366"></i>WhatsApp</a><button type="button" class="o" id="sh-wx"><i style="background:#07C160"></i>微信 WeChat</button><div class="qr" id="sh-qr" hidden></div><button type="button" class="o" id="sh-cp"><i style="background:#3F6B5C"></i>複製連結</button><p class="ok" id="sh-ok" aria-live="polite"></p>';
document.body.appendChild(b);document.body.appendChild(m);
function close(){m.hidden=true;b.setAttribute("aria-expanded","false");}
b.onclick=function(){if(m.hidden){m.querySelector("#sh-wa").href="https://wa.me/?text="+encodeURIComponent(ttl()+"\n"+url());m.querySelector("#sh-qr").hidden=true;m.querySelector("#sh-ok").textContent="";m.hidden=false;b.setAttribute("aria-expanded","true");}else close();};
m.querySelector(".x").onclick=close;
document.addEventListener("keydown",function(e){if(e.key==="Escape")close();});
document.addEventListener("click",function(e){if(!m.hidden&&!m.contains(e.target)&&!b.contains(e.target))close();});
m.querySelector("#sh-wx").onclick=function(){
if(mob&&navigator.share){navigator.share({title:ttl(),url:url()}).catch(function(){});return;}
var q=m.querySelector("#sh-qr");
q.innerHTML=qr?'<img src="/yangsheng/qr/'+qr+'.svg" alt="此頁的二維碼" width="180" height="180"><p>用微信掃一掃，再分享</p>':'<p>請複製連結，再貼到微信分享。</p>';q.hidden=!q.hidden;};
m.querySelector("#sh-cp").onclick=function(){var u=url(),ok=m.querySelector("#sh-ok");
function done(){ok.textContent="已複製連結";}
if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(u).then(done,fb);else fb();
function fb(){var t=document.createElement("textarea");t.value=u;t.setAttribute("readonly","");t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();try{document.execCommand("copy");done();}catch(e){ok.textContent=u;}t.remove();}};
}
function put(){if(!document.getElementById("sh-btn"))build();}
function go(){setTimeout(function(){put();new MutationObserver(put).observe(document.body,{childList:true});},1200);}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
