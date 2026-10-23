(function(){
/* 體質小測試：參考「九種體質」的分類，只作生活習慣參考，不是診斷。答案只在本機計算，不會傳送或儲存。 */
var Q=[
["qx","容易覺得疲倦，說話多了或稍為活動便覺得氣不夠？"],
["yx","比身邊的人怕冷，手腳經常冰涼？"],
["yin","手心腳心容易發熱，或常覺口乾、喉嚨乾？"],
["ts","常覺身體沉重，腹部較鬆軟，或喉嚨多痰？"],
["sr","面部容易油光，或常覺口苦、易長暗瘡？"],
["xy","皮膚容易出現瘀青，或唇色、面色偏暗？"],
["qy","情緒容易緊張或低落，常不自覺歎氣？"],
["tb","容易打噴嚏、鼻癢，或對花粉、某些食物較敏感？"],
["ph","大多數日子精神飽滿，睡得安穩？"],
["ph","天氣冷熱轉變時，大致都能適應？"]];
var O=["很少","有時","經常"];
var T={
ph:["平和","整體較平穩。",["保持現有的作息和飲食習慣，按時令增減衣物。","飲食均衡、不偏嗜，三餐定時。","維持適量運動，例如散步、太極或游泳。"]],
qx:["氣虛","容易累，精力較易消耗。",["作息規律，避免過度勞累和熬夜。","飲食可選山藥、小米、紅棗等平和食材，少吃生冷。","運動以散步、太極等緩和為主，量力而行。"]],
yx:["陽虛","較怕冷，手腳易涼。",["注意腰背、膝部和雙腳保暖，少吹冷氣。","少吃生冷和冰凍食物，飲食以溫熱為主，可配生薑等溫和食材。","天氣好時多曬太陽、多活動。"]],
yin:["陰虛","容易覺得燥熱、口乾。",["盡量早睡，避免熬夜。","少吃煎炸、辛辣食物，可選百合、雪耳、梨等滋潤食材。","多喝溫水，運動不要大汗淋漓。"]],
ts:["痰濕","身體易覺沉重。",["飲食清淡，七分飽，少吃甜膩和油膩食物。","可選冬瓜、薏米、赤小豆等家常食材。","多活動，避免久坐，居處保持乾爽。"]],
sr:["濕熱","容易油膩、口苦。",["少吃煎炸、辛辣、甜食，少飲酒。","可選冬瓜、綠豆、青瓜等清淡食材。","保持居處通風，衣著透氣，作息規律。"]],
xy:["血瘀","面色、唇色偏暗，易有瘀青。",["注意保暖，多活動，避免久坐不動。","可選黑木耳、洋蔥等家常食材，飲食清淡。","如有不明原因的瘀青或疼痛，請及早就醫。"]],
qy:["氣鬱","情緒較易受影響。",["多到戶外走走，與家人朋友傾談。","保持規律運動，例如散步、八段錦。","可選陳皮、柑橘等時令食材；如情緒持續低落，請找醫師或專業人士傾談。"]],
tb:["特稟","對外界較敏感。",["留意並避開自己已知的致敏原。","換季時注意保暖，花粉多時可戴口罩。","新食物先少量嘗試；如出現過敏反應，請及早就醫。"]]};
var root=document.getElementById("tz");if(!root)return;
var h='<form id="tz-f">';
for(var i=0;i<Q.length;i++){h+='<fieldset><legend><span>'+(i+1)+'</span>'+Q[i][1]+'</legend><div class="op">';for(var j=0;j<3;j++)h+='<label><input type="radio" name="q'+i+'" value="'+j+'"><span>'+O[j]+'</span></label>';h+='</div></fieldset>';}
h+='<p class="hint" id="tz-hint" hidden>還有題目未答，請答完全部 10 題。</p><button type="submit" class="go">看看結果</button></form><div id="tz-r" hidden></div>';
root.innerHTML=h;
var f=document.getElementById("tz-f"),r=document.getElementById("tz-r");
f.addEventListener("submit",function(e){e.preventDefault();
var s={},ph=0,miss=0;for(var i=0;i<Q.length;i++){var c=f.querySelector('input[name="q'+i+'"]:checked');if(!c){miss++;continue;}var v=+c.value;if(Q[i][0]==="ph")ph+=v;else s[Q[i][0]]=v;}
var hint=document.getElementById("tz-hint");if(miss){hint.hidden=false;return;}hint.hidden=true;
var hi=[],mid=[];for(var k in s){if(s[k]===2)hi.push(k);else if(s[k]===1)mid.push(k);}
var main,also=[];
if(hi.length){main=hi.slice(0,2);also=hi.slice(2).concat(mid).slice(0,2);}
else if(mid.length>=3&&ph<3){main=mid.slice(0,2);}
else{main=["ph"];also=mid.slice(0,2);}
var o='<p class="kicker">你的結果</p><h2>較接近：'+main.map(function(k){return T[k][0];}).join("、")+'</h2>';
for(var m=0;m<main.length;m++){var t=T[main[m]];o+='<div class="rc"><h3>'+t[0]+'<span>'+t[1]+'</span></h3><ul>';for(var n=0;n<t[2].length;n++)o+='<li>'+t[2][n]+'</li>';o+='</ul></div>';}
if(also.length)o+='<p>另外，你在「'+also.map(function(k){return T[k][0];}).join("」「")+'」相關的題目也答了「有時」或「經常」，平日可多留意。</p>';
o+='<div class="warn"><p><b>這不是診斷。</b>本測試只根據你的答案，參考「九種體質」的分類作生活習慣提示。人的體質會隨年齡、季節和生活轉變，亦可能兼有幾種傾向。如想了解自己的體質，或身體有不適，請找中醫師面診。</p></div><button type="button" class="to" id="tz-again">重新再答</button> <a class="to" href="/yangsheng/shiling/">看本節氣食譜與保健 →</a>';
r.innerHTML=o;r.hidden=false;f.hidden=true;r.scrollIntoView({block:"start"});
document.getElementById("tz-again").onclick=function(){f.reset();f.hidden=false;r.hidden=true;window.scrollTo(0,root.offsetTop-20);};});
})();
