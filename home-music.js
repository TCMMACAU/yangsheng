(function () {
  /* 四時調攝 · 養生音樂：四季古琴 + 細選曲掣（點選／靜音後自動收起） */
  var BASE = "/yangsheng/audio/";
  var STORAGE_KEY = "yangsheng-music-track";
  var MAX_VOL = 0.5;
  var DEFAULT_LEVEL = 40; /* → 0.2 */
  var FADE_IN_MS = 2500;
  var FADE_OUT_MS = 500;

  var TRACKS = [
    {
      id: "spring",
      src: BASE + "spring-meihua.mp3",
      title: "春 · 《梅花三弄》",
      hint: "古琴 · 生機",
      credit: "《梅花三弄》：RafaelCaro，Freesound，CC BY 4.0"
    },
    {
      id: "summer",
      src: BASE + "summer-improvisation.mp3",
      title: "夏 · 即興一",
      hint: "古琴 · 靜氣",
      credit: "Improvisation No.1：Charlie Huang，Wikimedia Commons，CC BY-SA 3.0"
    },
    {
      id: "autumn",
      src: BASE + "autumn-guqin-reflection.mp3",
      title: "秋 · 琴語晨思",
      hint: "古琴 · 收斂",
      credit: "Guqin Reflection（琴语晨思）：RainStreetCat，Pixabay Content License"
    },
    {
      id: "winter",
      src: BASE + "winter-guqin-melody.mp3",
      title: "冬 · 古琴旋律",
      hint: "古琴 · 清冷",
      credit: "Guqin Melody：LunarBoomMusic，Pixabay Content License"
    }
  ];

  function currentSeasonId() {
    /* Asia/Macau：立春～立夏春，立夏～立秋夏，立秋～立冬秋，立冬～立春冬；用月日近似 */
    var d = new Date(Date.now() + 8 * 3600e3);
    var md = (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
    if (md >= 204 && md < 505) return "spring";
    if (md >= 505 && md < 807) return "summer";
    if (md >= 807 && md < 1107) return "autumn";
    return "winter";
  }

  function trackById(id) {
    for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i];
    return null;
  }

  function readPref() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === "muted") return { kind: "muted" };
      if (v && trackById(v)) return { kind: "track", id: v };
    } catch (e) {}
    return { kind: "track", id: currentSeasonId() };
  }

  function writePref(v) {
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch (e) {}
  }

  var css =
    "#ys-music{position:relative;flex-shrink:0;z-index:30}" +
    "#ys-music .ys-btn{max-width:7.5rem;min-height:2.25rem;overflow:hidden;border:1px solid var(--color-line,#d8ccb6);border-radius:9999px;background:color-mix(in srgb,var(--color-paper,#f3ecdf) 92%,transparent);padding:0 .7rem;font-size:.7rem;letter-spacing:.06em;text-overflow:ellipsis;white-space:nowrap;color:var(--color-ink,#1c241f);cursor:pointer}" +
    "#ys-music .ys-btn[aria-pressed='true']{background:#3F6B5C;color:#f3ecdf;border-color:transparent}" +
    "#ys-music .ys-panel{position:absolute;right:0;top:calc(100% + .4rem);z-index:60;width:min(88vw,16.5rem);max-height:min(70vh,22rem);overflow-y:auto;border:1px solid var(--color-line,#d8ccb6);border-radius:.85rem;background:var(--color-paper,#f3ecdf);padding:.65rem;box-shadow:0 .75rem 1.75rem rgb(0 0 0 / .16)}" +
    "#ys-music .ys-kick{font-size:.7rem;letter-spacing:.1em;color:#3F6B5C;margin:0 0 .4rem}" +
    "#ys-music .ys-track{display:flex;align-items:center;justify-content:space-between;gap:.4rem;width:100%;min-height:2.4rem;margin:0 0 .35rem;padding:.4rem .55rem;border:1px solid var(--color-line,#d8ccb6);border-radius:.65rem;background:#faf6ee;text-align:left;cursor:pointer;color:var(--color-ink,#1c241f)}" +
    "#ys-music .ys-track[aria-pressed='true']{border-color:#3F6B5C;background:#eef4f1}" +
    "#ys-music .ys-track .t{display:block;font-family:'Noto Serif TC',serif;font-size:.85rem;line-height:1.25}" +
    "#ys-music .ys-track .h{display:block;margin-top:.1rem;font-size:.65rem;color:var(--color-muted,#6e6558)}" +
    "#ys-music .ys-track .a{shrink:0;font-size:.7rem;color:#3F6B5C;white-space:nowrap}" +
    "#ys-music .ys-mute{display:inline-flex;align-items:center;min-height:2rem;margin-top:.15rem;padding:0 .7rem;border:1px solid var(--color-line,#d8ccb6);border-radius:9999px;background:transparent;font-size:.75rem;color:var(--color-ink,#1c241f);cursor:pointer}" +
    "#ys-music .ys-credit{margin:.45rem 0 0;font-size:.62rem;line-height:1.45;color:var(--color-muted,#6e6558)}" +
    "@media(max-width:640px){" +
    "#ys-music .ys-btn{max-width:5.5rem;padding:0 .5rem;font-size:.65rem}" +
    "#ys-music .ys-panel{position:fixed;left:.5rem;right:.5rem;top:calc(env(safe-area-inset-top,0px) + 3.6rem);width:auto;max-width:none;max-height:min(60vh,20rem)}" +
    "}" +
    "@media print{#ys-music{display:none}}";

  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var audio = null;
  var fadeTimer = null;
  var playingId = null;
  var pending = null;
  var panelOpen = false;
  var mutedVisit = false;
  var level = DEFAULT_LEVEL;
  var root = null;
  var armHandler = null;

  function clearFade() {
    if (fadeTimer) clearInterval(fadeTimer);
    fadeTimer = null;
  }

  function ramp(el, to, ms, done) {
    clearFade();
    var from = el.volume;
    var t0 = performance.now();
    fadeTimer = setInterval(function () {
      var k = Math.min(1, (performance.now() - t0) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k >= 1) {
        clearFade();
        if (done) done();
      }
    }, 50);
  }

  function ensureAudio() {
    if (!audio) audio = new Audio();
    return audio;
  }

  function disarm() {
    pending = null;
    if (armHandler) {
      window.removeEventListener("pointerdown", armHandler);
      window.removeEventListener("keydown", armHandler);
      armHandler = null;
    }
  }

  function arm(track) {
    disarm();
    pending = track;
    armHandler = function () {
      if (!pending || mutedVisit || playingId) {
        disarm();
        return;
      }
      startTrack(pending).then(function (ok) {
        if (ok) disarm();
      });
    };
    window.addEventListener("pointerdown", armHandler);
    window.addEventListener("keydown", armHandler);
  }

  function startTrack(track) {
    var el = ensureAudio();
    clearFade();
    el.pause();
    el.loop = true;
    el.preload = "auto";
    el.volume = 0;
    el.src = track.src;
    return el
      .play()
      .then(function () {
        playingId = track.id;
        mutedVisit = false;
        ramp(el, (level / 100) * MAX_VOL, FADE_IN_MS);
        render();
        return true;
      })
      .catch(function () {
        playingId = null;
        render();
        return false;
      });
  }

  function playTrack(track) {
    disarm();
    mutedVisit = false;
    if (playingId === track.id) {
      stop(true);
      return;
    }
    writePref(track.id);
    startTrack(track);
  }

  function stop(rememberMute) {
    if (rememberMute) {
      writePref("muted");
      mutedVisit = true;
    }
    disarm();
    playingId = null;
    var el = audio;
    render();
    if (!el) return;
    ramp(el, 0, FADE_OUT_MS, function () {
      el.pause();
      el.currentTime = 0;
    });
  }

  function closePanel() {
    panelOpen = false;
    render();
  }

  function openPanel() {
    panelOpen = !panelOpen;
    render();
  }

  function creditFor(id) {
    var t = trackById(id);
    return t ? t.credit : "";
  }

  function panelHtml() {
    var pref = readPref();
    var now = trackById(playingId);
    var html =
      '<p class="ys-kick">養生音樂 · 四季古琴</p>';
    for (var i = 0; i < TRACKS.length; i++) {
      var t = TRACKS[i];
      var on = playingId === t.id;
      html +=
        '<button type="button" class="ys-track" data-id="' +
        t.id +
        '" aria-pressed="' +
        (on ? "true" : "false") +
        '"><span><span class="t">' +
        t.title +
        '</span><span class="h">' +
        t.hint +
        '</span></span><span class="a">' +
        (on ? "■" : "▶") +
        "</span></button>";
    }
    html +=
      '<button type="button" class="ys-mute" data-mute="1">■ 靜音</button>';
    var cred = now
      ? now.credit
      : pref.kind === "track"
        ? creditFor(pref.id)
        : TRACKS.map(function (x) {
            return x.credit;
          }).join("；");
    html += '<p class="ys-credit">' + cred + "</p>";
    return html;
  }

  function btnLabel() {
    var now = trackById(playingId);
    if (now) return "♪ " + now.title.replace(/^([春夏秋冬]).*/, "$1");
    return "♪ 養生音樂";
  }

  function render() {
    if (!root) return;
    var btn = root.querySelector(".ys-btn");
    var panel = root.querySelector(".ys-panel");
    if (btn) {
      btn.setAttribute("aria-expanded", panelOpen ? "true" : "false");
      btn.setAttribute("aria-pressed", playingId ? "true" : "false");
      btn.setAttribute("aria-label", playingId ? "播放緊：" + (trackById(playingId) || {}).title : "養生音樂");
      btn.textContent = btnLabel();
    }
    if (panelOpen) {
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "ys-panel";
        panel.setAttribute("role", "group");
        panel.setAttribute("aria-label", "養生音樂");
        root.appendChild(panel);
      }
      panel.innerHTML = panelHtml();
    } else if (panel) {
      panel.remove();
    }
  }

  function onRootClick(e) {
    var mute = e.target.closest("[data-mute]");
    if (mute) {
      stop(true);
      closePanel();
      return;
    }
    var trackBtn = e.target.closest(".ys-track");
    if (trackBtn) {
      var t = trackById(trackBtn.getAttribute("data-id"));
      if (t) playTrack(t);
      closePanel();
      return;
    }
    if (e.target.closest(".ys-btn")) {
      openPanel();
    }
  }

  function onDocPointer(e) {
    if (!panelOpen || !root) return;
    if (root.contains(e.target)) return;
    closePanel();
  }

  function mountTarget() {
    var headerRight = document.querySelector("header .flex.items-center.gap-2");
    if (headerRight) return headerRight;
    var headerInner = document.querySelector("header .mx-auto.flex");
    return headerInner || null;
  }

  function put() {
    var target = mountTarget();
    if (!target) return;
    if (document.getElementById("ys-music")) {
      root = document.getElementById("ys-music");
      return;
    }
    root = document.createElement("div");
    root.id = "ys-music";
    root.innerHTML = '<button type="button" class="ys-btn" aria-expanded="false">♪ 養生音樂</button>';
    root.addEventListener("click", onRootClick);
    target.appendChild(root);
    render();
  }

  function bootPlay() {
    var pref = readPref();
    if (pref.kind === "muted") {
      mutedVisit = true;
      return;
    }
    var track = trackById(pref.id) || trackById(currentSeasonId()) || TRACKS[2];
    startTrack(track).then(function (ok) {
      if (!ok) arm(track);
    });
  }

  function go() {
    put();
    new MutationObserver(function () {
      if (!document.getElementById("ys-music")) put();
    }).observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener("pointerdown", onDocPointer, true);
    setTimeout(bootPlay, 400);
  }

  if (document.readyState !== "loading") go();
  else document.addEventListener("DOMContentLoaded", go);
})();
