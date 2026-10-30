(function () {
  /* Static-page header: fill season chip + notes count to match SPA chrome. */
  function seasonName() {
    var d = new Date(Date.now() + 8 * 3600e3);
    var md = (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
    if (md >= 204 && md < 505) return "春";
    if (md >= 505 && md < 807) return "夏";
    if (md >= 807 && md < 1107) return "秋";
    return "冬";
  }

  function notesCount() {
    try {
      var raw = localStorage.getItem("sishi-tiaoshe");
      if (!raw) return 0;
      var data = JSON.parse(raw);
      var state = data && data.state ? data.state : data;
      return (state && state.tips && state.tips.length) || 0;
    } catch (e) {
      return 0;
    }
  }

  function ensure() {
    var chip = document.getElementById("ys-season-chip");
    if (chip) {
      chip.textContent = "今屬" + seasonName();
      chip.hidden = false;
    }
    var nEl = document.querySelector(".hdr-actions .notes-n");
    if (nEl) nEl.textContent = String(notesCount());
  }

  if (document.readyState !== "loading") ensure();
  else document.addEventListener("DOMContentLoaded", ensure);
})();
