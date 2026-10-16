(function(){
var T=[["2026-01-05","小寒"],["2026-01-20","大寒"],["2026-02-04","立春"],["2026-02-18","雨水"],["2026-03-05","驚蟄"],["2026-03-20","春分"],["2026-04-05","清明"],["2026-04-20","穀雨"],["2026-05-05","立夏"],["2026-05-21","小滿"],["2026-06-05","芒種"],["2026-06-21","夏至"],["2026-07-07","小暑"],["2026-07-23","大暑"],["2026-08-07","立秋"],["2026-08-23","處暑"],["2026-09-07","白露"],["2026-09-23","秋分"],["2026-10-08","寒露"],["2026-10-23","霜降"],["2026-11-07","立冬"],["2026-11-22","小雪"],["2026-12-07","大雪"],["2026-12-22","冬至"],["2027-01-05","小寒"],["2027-01-20","大寒"],["2027-02-04","立春"],["2027-02-19","雨水"],["2027-03-06","驚蟄"],["2027-03-21","春分"],["2027-04-05","清明"],["2027-04-20","穀雨"],["2027-05-06","立夏"],["2027-05-21","小滿"],["2027-06-06","芒種"],["2027-06-21","夏至"],["2027-07-07","小暑"],["2027-07-23","大暑"],["2027-08-08","立秋"],["2027-08-23","處暑"],["2027-09-08","白露"],["2027-09-23","秋分"],["2027-10-08","寒露"],["2027-10-24","霜降"],["2027-11-07","立冬"],["2027-11-22","小雪"],["2027-12-07","大雪"],["2027-12-22","冬至"]];
var d=new Date(Date.now()+8*3600e3).toISOString().slice(0,10),i=-1;
for(var k=0;k<T.length;k++)if(T[k][0]<=d)i=k;
if(i<0||i>=T.length-1)return;
var n=T[i+1],m=+n[0].slice(5,7),dd=+n[0].slice(8);
var txt="今日節氣 · "+T[i][1]+"　　下一個 · "+n[1]+" "+m+"月"+dd+"日";
var s=document.createElement("style");s.textContent="#jq-strip{background:#ece4d4;color:#3a3226;font:500 13px/1.4 'Noto Serif TC',serif;text-align:center;padding:6px 12px;letter-spacing:.08em;border-bottom:1px solid rgba(0,0,0,.06)}#jq-strip b{color:#3F6B5C;font-weight:600}@media print{#jq-strip{display:none}}";document.head.appendChild(s);
function put(){if(document.getElementById("jq-strip"))return;var e=document.createElement("div");e.id="jq-strip";e.setAttribute("role","note");e.innerHTML="今日節氣 · <b>"+T[i][1]+"</b>　　下一個 · "+n[1]+" "+m+"月"+dd+"日";e.setAttribute("aria-label",txt);document.body.insertBefore(e,document.body.firstChild);}
function go(){setTimeout(function(){put();new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true});},1200);}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
