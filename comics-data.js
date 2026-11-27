/* 四時調攝四格漫畫目錄。published 為澳門日期（YYYY-MM-DD）；當日或之後先算已上線。
 * 小雪《唔虛，所以不受補》已定稿，排 2026-11-28 上線，該日之前唔會出現喺首頁或過往。 */
(function (root) {
  var COMICS = [
    {
      id: "xiaoxue-bu-xu",
      title: "唔虛，所以不受補",
      published: "2026-11-28",
      src: "/yangsheng/art/comics/xiaoxue-bu-xu.jpg?v=1",
      width: 1152,
      height: 864,
      alt: "四格漫畫：冬天屋內，窗外有雪同月光。豆豆話入冬小雪啦，快啲進補下先；阿力話冬天主收藏，呢個時候好多陽熱鎖喺身體入面；阿力話呢個時候大補，反而容易上火，就成日會誤會自己虛不受補啦；阿力話所以呢，我哋煲碗熱湯，潤下就得啦。",
      links: [
        { href: "/yangsheng/season/winter", label: "睇冬季養生：冬藏補腎 ›" },
        { href: "/yangsheng/#jq-note", label: "小雪節氣小記 ›" }
      ]
    },
    {
      id: "lidong-bao-nuan",
      title: "薄外套，出門備",
      published: "2026-11-14",
      src: "/yangsheng/art/comics/lidong-bao-nuan.jpg?v=1",
      width: 1152,
      height: 864,
      alt: "四格漫畫：阿力同豆豆喺湖邊亭榭。豆豆話立冬喎，澳門仲咁暖；阿力話雖然日間仲係暖暖哋，但係一到夜晚就會涼；阿力著外套，話所以呢，出街記住帶外套；夜晚豆豆攬住阿力，話咁你比啲溫暖我啦。",
      links: [
        { href: "/yangsheng/season/winter", label: "睇冬季養生：冬藏補腎 ›" },
        { href: "/yangsheng/#jq-note", label: "立冬節氣小記 ›" }
      ]
    },
    {
      id: "autumn-tea",
      title: "秋季養生，飲茶最啱",
      published: "2026-10-26",
      src: "/yangsheng/art/comics/autumn-tea.jpg?v=4",
      width: 1152,
      height: 864,
      alt: "四格漫畫：阿力同豆豆穿古裝喺湖邊亭沖功夫茶。豆豆問阿力做緊乜；阿力話唔沖返杯茶飲下邊似古代人，豆豆問沖茶有乜講究；阿力話秋季天氣燥，最緊要生津潤肺，就好似鏡湖嘅桂花雪梨茶，豆豆叫整杯嘆下；豆豆飲完話杯茶幾香，阿力話好正係咪。",
      links: [
        { href: "/yangsheng/season/autumn", label: "睇秋季養生：秋收潤燥 ›" },
        { href: "/yangsheng/shiling/", label: "節氣食譜同茶飲 ›" }
      ]
    }
  ];

  function macauToday() {
    return new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
  }
  function published(list, today) {
    list = list || COMICS;
    today = today || macauToday();
    return list.filter(function (c) { return c.published <= today; }).slice().sort(function (a, b) {
      var d = b.published.localeCompare(a.published);
      return d !== 0 ? d : b.id.localeCompare(a.id);
    });
  }
  function current(list, today) {
    return published(list, today)[0] || null;
  }
  function formatDate(iso) {
    var p = (iso || "").split("-");
    if (p.length !== 3) return iso || "";
    return p[0] + "年" + Number(p[1]) + "月" + Number(p[2]) + "日";
  }
  root.YSComics = {
    COMICS: COMICS,
    macauToday: macauToday,
    published: published,
    current: current,
    formatDate: formatDate
  };
})(window);
