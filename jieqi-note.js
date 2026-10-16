(function(){
var P=location.pathname.replace(/index\.html$/,"");if(P!=="/yangsheng/"&&P!=="/yangsheng")return;
/* 節氣小記：每半月一則，新的加在最前；from 為開始顯示日期（澳門時間） */
var N=[
{id:"shuangjiang-2026",from:"2026-10-16",term:"霜降",slug:"shuangjiang",when:"10 月 23 日交節 · 至 11 月 7 日立冬",season:"autumn",seasonName:"秋收潤燥",
lead:"霜降是秋季最後一個節氣。澳門平地少見霜，但北風漸起，早晚溫差拉大，空氣也更乾。這半個月可以由「潤秋燥」慢慢過渡到「備冬藏」，飲食、衣著都一步步跟著收。",
parts:[
["飲食","溫潤清淡，時果適量",[
"柿子這時正當造，性味甘澀而寒，可作時令水果適量品嘗；不宜空腹多吃，脾胃虛寒、容易腹瀉的人宜少吃。",
"栗子、山藥、白蘿蔔是這時的平和食材，可以煮粥或煲湯。栗子較難消化，一次不宜多。",
"天涼後火鍋、燒烤、煎炸容易吃多，日常仍以清淡溫熱為主，記得多喝溫水。"]],
["起居","添衣有序，護膝暖足",[
"早晚涼、中午暖，出門可多帶一件薄外套，按氣溫增減，不必一下子穿得太厚。",
"背部、膝部和雙腳要注意保暖，冷氣和風扇可以收起，或把溫度調高一點。",
"睡前可用溫水浸腳約十至十五分鐘，水溫以舒適為度；足部感覺較差或有糖尿病的人，先用手試水溫。"]],
["簡單保健","起床慢一點，多曬太陽",[
"天氣轉涼，有些人早上會覺得膝部較緊。起床前可先在床上屈伸雙腿幾次，再慢慢下床；散步、太極拳等平緩運動較合適。",
"足三里在小腿外側、膝眼下約三寸，可每日以指腹輕輕按揉二至三分鐘，作日常保養。<b>請先諮詢醫師</b>。",
"草木轉黃，心情容易跟著低落。天氣好時多到戶外走走、曬曬太陽，與家人朋友見見面。"]]
],
note:"以上只供日常養生參考，不能代替醫師面診。如有持續咳嗽、關節腫痛或其他不適，請及早就醫。"}
];
var d=new Date(Date.now()+8*3600e3).toISOString().slice(0,10),n=null;
for(var k=0;k<N.length;k++)if(N[k].from<=d){n=N[k];break;}
if(!n)return;
var css="#jq-note{margin-top:2.5rem}#jq-note .jn-box{border:1px solid var(--color-line,#d8ccb6);border-radius:var(--radius-card,1.25rem);background:var(--color-paper,#f3ecdf);padding:1.5rem}#jq-note .jn-kick{font-size:.875rem;letter-spacing:.12em;color:#3F6B5C}#jq-note h2{margin-top:.4rem;font-family:'Noto Serif TC',serif;font-size:1.875rem;line-height:1.25;color:var(--color-ink,#1c241f)}#jq-note .jn-when{margin-top:.25rem;font-size:.875rem;color:var(--color-muted,#6e6558)}#jq-note .jn-lead{margin-top:1rem;max-width:46rem;color:var(--color-ink-soft,#3d4942);line-height:1.75}#jq-note .jn-grid{display:grid;gap:1.25rem;margin-top:1.25rem;border-top:1px solid var(--color-line,#d8ccb6);padding-top:1.25rem}@media(min-width:900px){#jq-note .jn-grid{grid-template-columns:repeat(3,1fr);gap:2rem}}#jq-note h3{font-family:'Noto Serif TC',serif;font-size:1.25rem;color:var(--color-ink,#1c241f)}#jq-note h3 span{margin-left:.5rem;font-family:'Noto Sans TC',sans-serif;font-size:.8rem;color:var(--color-muted,#6e6558)}#jq-note ul{margin-top:.5rem;padding:0;list-style:none}#jq-note li{position:relative;padding-left:1rem;margin-top:.5rem;font-size:.9375rem;line-height:1.7;color:var(--color-ink-soft,#3d4942)}#jq-note li:before{content:'';position:absolute;left:0;top:.7em;width:.35rem;height:.35rem;border-radius:50%;background:#3F6B5C;opacity:.7}#jq-note li b{color:var(--color-cinnabar,#9c3b2e);font-weight:600}#jq-note .jn-foot{margin-top:1.25rem;display:flex;flex-wrap:wrap;gap:.5rem 1.25rem;font-size:.875rem}#jq-note .jn-foot a{color:#3F6B5C;text-decoration:none;border-bottom:1px solid rgba(63,107,92,.35)}#jq-note .jn-cau{margin-top:1rem;font-size:.8125rem;color:var(--color-muted,#6e6558);line-height:1.6}@media print{#jq-note{display:none}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function html(){var g="";for(var i=0;i<n.parts.length;i++){var p=n.parts[i],li="";for(var j=0;j<p[2].length;j++)li+="<li>"+p[2][j]+"</li>";g+="<div><h3>"+p[0]+"<span>"+p[1]+"</span></h3><ul>"+li+"</ul></div>";}
return '<div class="jn-box"><p class="jn-kick">節氣小記 · 每半月一則</p><h2>'+n.term+'</h2><p class="jn-when">'+n.when+'</p><p class="jn-lead">'+n.lead+'</p><div class="jn-grid">'+g+'</div><div class="jn-foot"><a href="/yangsheng/jieqi/#'+n.slug+'">'+n.term+'的名稱由來與三候 ›</a><a href="/yangsheng/season/'+n.season+'">看季節養生：'+n.seasonName+' ›</a></div><p class="jn-cau">'+n.note+'</p></div>';}
function put(){if(document.getElementById("jq-note"))return;var s=document.querySelectorAll("main > section");if(s.length<1)return;var e=document.createElement("section");e.id="jq-note";e.className="mx-auto max-w-6xl px-4";e.setAttribute("aria-label","節氣小記 · "+n.term);e.innerHTML=html();s[0].parentNode.insertBefore(e,s[0].nextSibling);}
function go(){setTimeout(function(){put();new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true});},1200);}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
