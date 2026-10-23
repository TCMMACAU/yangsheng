(function(){
var A=window.SHILING||[],el=document.getElementById("sl-list");if(!el)return;
var d=new Date(Date.now()+8*3600e3).toISOString().slice(0,10),cur=null,nxt=null;
for(var i=0;i<A.length;i++){if(A[i].from<=d)cur=A[i];else if(!nxt)nxt=A[i];}
function li(a,tag){var h="<"+tag+">";for(var i=0;i<a.length;i++)h+="<li>"+a[i]+"</li>";return h+"</"+tag+">";}
var DOC="懷孕、有長期病患或正在服藥，請先諮詢醫師。";
function term(t,lab){
var h='<article id="'+t.slug+'"><p class="kicker">'+lab+'</p><h2>'+t.term+'</h2><p class="date">'+t.when+'</p>';
for(var i=0;i<t.recipes.length;i++){var r=t.recipes[i];
h+='<div class="rc" id="'+t.slug+'-r'+(i+1)+'"><p class="tag">'+r.kind+' · '+r.serve+'</p><h3>'+r.name+'</h3><div class="two"><div><p class="sg">材料</p>'+li(r.ing,"ul")+'</div><div><p class="sg">做法</p>'+li(r.steps,"ol")+'</div></div><div class="warn"><p class="sg">不宜 · 留意</p>'+li(r.not.concat([DOC]),"ul")+'</div></div>';}
var c=t.care;
h+='<div class="rc care" id="'+t.slug+'-care"><p class="tag">一分鐘自我保健 · '+c.type+'</p><h3>'+c.name+'</h3>'+(c.acu?'<p class="ask">請先諮詢醫師</p>':'')+'<p class="sg">位置</p><p>'+c.where+'</p><p class="sg">步驟</p>'+li(c.steps,"ol")+'<div class="warn"><p class="sg">留意</p>'+li(c.caution.concat([c.acu?"穴位按揉只作日常保養，<b>請先諮詢醫師</b>；懷孕、有長期病患或正在服藥者尤其要先問醫師。":DOC]),"ul")+'</div></div>';
return h+'<a class="to" href="/yangsheng/jieqi/#'+t.slug+'">'+t.term+'的名稱由來與三候 →</a></article>';}
var h="";if(cur)h+=term(cur,"本節氣");if(nxt)h+=term(nxt,"下一個節氣 · 預覽");
el.innerHTML=h||'<p>本節氣內容整理中。</p>';
if(location.hash){var t=document.getElementById(location.hash.slice(1));if(t)t.scrollIntoView();}
})();
