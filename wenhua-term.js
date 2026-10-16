(function(){
/* 本節氣文化：新的加在最前；from 為開始顯示日期（澳門時間）。引文須已核對原典。 */
var N=[
{from:"2026-11-01",term:"立冬",slug:"lidong",when:"11 月 7 日交節",items:[
["《禮記·月令》","迎冬之禮","「立冬之日，天子親帥三公、九卿、大夫以迎冬於北郊。」","古代立冬是一件大事。立冬當日，天子帶著百官到北郊「迎冬」，以儀式迎接季節的轉換。"],
["《禮記·月令》","天子始裘","「是月也，天子始裘。」","孟冬十月，天子開始穿上皮裘。換季添衣，古今皆然。"]]},
{from:"2026-10-16",term:"霜降",slug:"shuangjiang",when:"10 月 23 日交節 · 至 11 月 7 日立冬",items:[
["《禮記·月令》","霜始降，百工休","「是月也，霜始降，則百工休。乃命有司曰：『寒氣總至，民力不堪，其皆入室。』」","季秋九月，霜開始降下，工匠便停工休息；官府又叮囑百姓，寒氣將至，回到屋內。古人按天時安排作息，天冷便收工歸家。"],
["《素問·寶命全形論》","四時之法成","「天覆地載，萬物悉備，莫貴於人。人以天地之氣生，四時之法成。」","意思是人依天地之氣而生，順著四時的規律成長。節氣更替，也是一個留意天時與起居的機會。"]]}
];
var d=new Date(Date.now()+8*3600e3).toISOString().slice(0,10),n=null;
for(var k=0;k<N.length;k++)if(N[k].from<=d){n=N[k];break;}
var el=document.getElementById("term-wh");if(!el)return;if(!n){el.remove();return;}
var h='<p class="kicker">本節氣文化</p><h2>'+n.term+'</h2><p class="date">'+n.when+'</p>';
for(var i=0;i<n.items.length;i++){var t=n.items[i];h+='<h3>'+t[1]+'</h3><blockquote>'+t[2]+'<cite>'+t[0]+'</cite></blockquote><p>'+t[3]+'</p>';}
h+='<a class="to" href="/yangsheng/jieqi/#'+n.slug+'">'+n.term+'的名稱由來與三候 →</a>';
el.innerHTML=h;el.setAttribute("aria-label","本節氣文化 · "+n.term);el.hidden=false;
})();
