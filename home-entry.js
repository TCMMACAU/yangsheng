(function(){
var P=location.pathname.replace(/index\.html$/,"");if(P!=="/yangsheng/"&&P!=="/yangsheng")return;
var C=[["/yangsheng/jieqi/","節氣 · 二十四時","節氣","二十四節氣逐一介紹，配合時令起居與飲食。","jieqi","節氣曆書與時令果葉"],["/yangsheng/wenhua/","文化 · 中醫源流","文化","從經典、典故與嶺南澳門風俗，認識中醫文化。","wenhua","線裝醫書、毛筆與青瓷杯"]];
function card(c){return '<a class="group overflow-hidden rounded-card border border-line bg-paper" href="'+c[0]+'"><img src="/yangsheng/art/home-'+c[4]+'.jpg?v=2" alt="'+c[5]+'" class="aspect-[4/3] w-full object-cover"><div class="flex items-end justify-between gap-3 p-4"><div><p class="text-sm" style="color:#3F6B5C">'+c[1]+'</p><h2 class="mt-1 font-serif text-3xl text-ink">'+c[2]+'</h2><p class="mt-1 text-sm text-ink-soft">'+c[3]+'</p></div><span class="mb-1 h-8 w-1.5 rounded-full" style="background:#3F6B5C"></span></div></a>';}
function put(){if(document.getElementById("home-entry"))return;var s=document.querySelectorAll("section:not(#jq-note)");if(s.length<2)return;var e=document.createElement("section");e.id="home-entry";e.className="mx-auto mt-4 grid max-w-6xl gap-4 px-4 sm:grid-cols-2";e.setAttribute("aria-label","節氣與文化");e.innerHTML=card(C[0])+card(C[1]);s[1].parentNode.insertBefore(e,s[1].nextSibling);}
function go(){setTimeout(function(){put();new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true});},1200);}
if(document.readyState!=="loading")go();else document.addEventListener("DOMContentLoaded",go);
})();
