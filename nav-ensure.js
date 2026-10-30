(function(){
/* Ensure 體質 / 食譜保健 always appear in top nav (survives stale site-frame cache). */
var ITEMS=[
  {href:"/yangsheng/tizhi/", label:"體質", after:"/yangsheng/wenhua/"},
  {href:"/yangsheng/shiling/", label:"食譜保健", after:"/yangsheng/tizhi/"}
];
var CLS="inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm text-ink-soft hover:bg-paper-deep";
var CLS_ON="inline-flex h-11 shrink-0 items-center rounded-full bg-ink px-4 text-sm text-paper";
function absPath(h){try{return new URL(h,location.href).pathname.replace(/\/$/,"")+"/"}catch(e){return h}}
function isOn(href){
  var p=location.pathname.replace(/index\.html$/,"");
  if(p.slice(-1)!=="/")p+="/";
  return p.indexOf(absPath(href).replace(/\/$/,""))===0 || p===absPath(href);
}
function pill(href,label){
  var a=document.createElement("a");
  a.href=href;
  a.textContent=label;
  a.className=isOn(href)?CLS_ON:CLS;
  if(isOn(href))a.setAttribute("aria-current","page");
  return a;
}
function findNavs(){
  var list=[];
  document.querySelectorAll("nav").forEach(function(n){
    var links=n.querySelectorAll("a[href]");
    var hasWenhua=false;
    for(var i=0;i<links.length;i++){
      if((links[i].getAttribute("href")||"").indexOf("/wenhua")>=0){hasWenhua=true;break;}
    }
    if(hasWenhua)list.push(n);
  });
  return list;
}
function ensureOne(nav){
  ITEMS.forEach(function(it){
    var exists=false;
    var anchors=nav.querySelectorAll("a[href]");
    for(var i=0;i<anchors.length;i++){
      if((anchors[i].getAttribute("href")||"").indexOf(it.href.replace(/\/$/,""))>=0){exists=true;break;}
    }
    if(exists)return;
    var a=pill(it.href,it.label);
    // insert after matching predecessor if present, else append
    var after=null;
    for(var j=0;j<anchors.length;j++){
      var h=anchors[j].getAttribute("href")||"";
      if(h.indexOf(it.after.replace(/\/$/,""))>=0)after=anchors[j];
    }
    if(after&&after.nextSibling)nav.insertBefore(a,after.nextSibling);
    else if(after)nav.appendChild(a);
    else nav.appendChild(a);
  });
  // Also ensure static-style nav-pill pages get classes if they use hdr-nav
  if(nav.classList.contains("hdr-nav")){
    nav.querySelectorAll("a[href*='tizhi'],a[href*='shiling']").forEach(function(a){
      if(!a.classList.contains("nav-pill")){
        a.className="nav-pill"+(isOn(a.getAttribute("href"))?" on":"");
      }
    });
  }
}
function put(){findNavs().forEach(ensureOne);}
function go(){
  put();
  setTimeout(put,0);
  setTimeout(put,800);
  setTimeout(put,1600);
  var sched=0;
  new MutationObserver(function(){
    if(sched)return;
    sched=requestAnimationFrame(function(){sched=0;put();});
  }).observe(document.documentElement,{childList:true,subtree:true});
}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
