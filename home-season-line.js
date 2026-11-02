/* 四時調攝 · 本季一句
   訪客一入首頁即知而家邊季；唔重複節氣小記正文。
   插位：hero 之後、節氣小記之前。交節前 7 日顯示「即將入季」。 */
(function(){
var P=location.pathname.replace(/index\.html$/,"");
if(P!=="/yangsheng/"&&P!=="/yangsheng")return;

/* 季節邊界：立春／立夏／立秋／立冬（澳門日） */
var BOUND=[
  {from:"2026-02-04",to:"2026-05-04",id:"spring",name:"春生萬物",line:"疏肝理氣，順應生發；早春宜少酸多甘。",href:"/yangsheng/season/spring",tone:"#4f7a45"},
  {from:"2026-05-05",to:"2026-08-06",id:"summer",name:"夏長養心",line:"養心防暑，健脾祛濕；清淡溫熱，忌一味冰凍。",href:"/yangsheng/season/summer",tone:"#9c3b2e"},
  {from:"2026-08-07",to:"2026-11-06",id:"autumn",name:"秋收潤燥",line:"養陰潤燥，潤肺為先；時果適量，護膝暖足。",href:"/yangsheng/season/autumn",tone:"#a56b2d"},
  {from:"2026-11-07",to:"2027-02-03",id:"winter",name:"冬藏補腎",line:"補腎藏精，溫陽防寒；少耗多收，唔使急住大補。",href:"/yangsheng/season/winter",tone:"#3F6B5C"},
  {from:"2027-02-04",to:"2027-05-05",id:"spring",name:"春生萬物",line:"疏肝理氣，順應生發；早春宜少酸多甘。",href:"/yangsheng/season/spring",tone:"#4f7a45"}
];

var d=new Date(Date.now()+8*3600e3).toISOString().slice(0,10);
var cur=null;
for(var i=0;i<BOUND.length;i++){
  if(BOUND[i].from<=d&&d<=BOUND[i].to){cur=BOUND[i];break;}
}
if(!cur)cur=BOUND[3];

var next=null;
for(var j=0;j<BOUND.length;j++){
  if(BOUND[j].from>d){next=BOUND[j];break;}
}
var soon="";
if(next){
  var days=Math.round((Date.parse(next.from)-Date.parse(d))/864e5);
  if(days>=0&&days<=7){
    soon=" · "+days+" 日後入"+next.name.slice(0,1)+"季";
  }
}

var css="#home-season-line{margin-top:1.25rem}#home-season-line .hsl-box{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem 1.25rem;border:1px solid var(--color-line,#d8ccb6);border-radius:999px;background:var(--color-paper,#f3ecdf);padding:.85rem 1.25rem}#home-season-line .hsl-kick{font-size:.75rem;letter-spacing:.14em;color:"+cur.tone+"}#home-season-line .hsl-main{font-family:'Noto Serif TC',serif;font-size:1.15rem;color:var(--color-ink,#1c241f);line-height:1.35}#home-season-line .hsl-line{margin-top:.2rem;font-size:.9rem;color:var(--color-ink-soft,#3d4942);max-width:36rem}#home-season-line a{display:inline-flex;align-items:center;min-height:2.5rem;padding:.35rem 1rem;border-radius:999px;border:1px solid "+cur.tone+";color:"+cur.tone+";text-decoration:none;font-size:.875rem;white-space:nowrap}#home-season-line a:hover{background:"+cur.tone+";color:#fff}@media(max-width:640px){#home-season-line .hsl-box{border-radius:1.25rem;align-items:flex-start}#home-season-line a{width:100%;justify-content:center}}@media print{#home-season-line{display:none}}";

var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

function html(){
  return '<div class="hsl-box"><div><p class="hsl-kick">本季一句'+soon+'</p><p class="hsl-main">而家 · '+cur.name+'</p><p class="hsl-line">'+cur.line+'</p></div><a href="'+cur.href+'">進入'+cur.name.slice(0,1)+'季 ›</a></div>';
}

function put(){
  if(document.getElementById("home-season-line"))return;
  var main=document.querySelector("main");
  var first=main&&main.querySelector("section");
  if(!first||!first.parentNode)return;
  var e=document.createElement("section");
  e.id="home-season-line";
  e.className="mx-auto max-w-6xl px-4";
  e.setAttribute("aria-label","本季一句 · "+cur.name);
  e.innerHTML=html();
  /* 先季後節氣：有 jq-note 就插喺佢前面；否則 hero 之後 */
  var jq=document.getElementById("jq-note");
  if(jq&&jq.parentNode){
    jq.parentNode.insertBefore(e,jq);
  }else{
    first.parentNode.insertBefore(e,first.nextSibling);
  }
}

function go(){
  /* 略遲過 jieqi-note(1200)，確保可插喺小記之前 */
  setTimeout(function(){
    put();
    new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true});
  },1300);
}
if(document.readyState!=="loading")go();
else document.addEventListener("DOMContentLoaded",go);
})();
