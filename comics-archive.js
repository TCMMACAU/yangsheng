(function () {
  var root = document.getElementById("comics-archive");
  if (!root || !window.YSComics) return;
  var api = window.YSComics;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function selectedId() {
    var h = (location.hash || "").replace(/^#/, "");
    try { h = decodeURIComponent(h); } catch (e) {}
    return h;
  }
  function render() {
    var list = api.published();
    var current = list[0] || null;
    var id = selectedId();
    var one = id ? list.filter(function (c) { return c.id === id; })[0] : null;
    if (id && !one) {
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    }
    if (one) renderDetail(one, current);
    else renderList(list, current);
  }
  function renderList(list, current) {
    document.title = "過往四格 · 四時調攝";
    if (!list.length) {
      root.innerHTML = '<p class="lead">暫時未有已上線嘅四格。</p>';
      return;
    }
    var cards = list.map(function (c) {
      var isCur = current && c.id === current.id;
      return (
        '<a class="ca-card" href="#' + esc(c.id) + '">' +
          (isCur ? '<span class="ca-badge">本期</span>' : '') +
          '<div class="ca-thumb"><img src="' + esc(c.src) + '" alt="' + esc(c.alt) + '" loading="lazy" decoding="async" width="' + (c.width || 1152) + '" height="' + (c.height || 864) + '"></div>' +
          '<h2>' + esc(c.title) + '</h2>' +
          '<p class="date">' + esc(api.formatDate(c.published)) + '</p>' +
        '</a>'
      );
    }).join("");
    root.innerHTML =
      '<p class="kicker" style="margin-top:32px">四格漫畫 · 阿力同豆豆</p>' +
      '<h1 style="margin-top:4px">過往四格</h1>' +
      '<p class="lead">已經上線嘅四格，由新到舊排列。撳入去就可以睇完整幅。</p>' +
      '<div class="ca-grid">' + cards + '</div>';
  }
  function renderDetail(c, current) {
    document.title = c.title + " · 過往四格 · 四時調攝";
    var isCur = current && c.id === current.id;
    var links = (c.links || []).map(function (l) {
      return '<a href="' + esc(l.href) + '">' + esc(l.label) + '</a>';
    }).join("");
    root.innerHTML =
      '<p class="kicker" style="margin-top:32px"><a class="ca-back" href="/yangsheng/comics/">← 返過往四格</a></p>' +
      (isCur ? '<p class="ca-badge ca-badge-inline">本期</p>' : '') +
      '<h1 style="margin-top:4px">' + esc(c.title) + '</h1>' +
      '<p class="date" style="margin-bottom:18px">' + esc(api.formatDate(c.published)) + '</p>' +
      '<figure class="ca-full"><img src="' + esc(c.src) + '" alt="' + esc(c.alt) + '" decoding="async" width="' + (c.width || 1152) + '" height="' + (c.height || 864) + '"></figure>' +
      (links ? '<div class="ca-foot">' + links + '</div>' : '');
    root.querySelector(".ca-full") && root.querySelector(".ca-full").scrollIntoView({ block: "nearest" });
  }
  window.addEventListener("hashchange", render);
  render();
})();
