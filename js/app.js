(() => {
  const S = window.STORY;
  const $ = (sel, root = document) => root.querySelector(sel);
  const DAY = 86400000;

  const parseDate = iso => new Date(iso + "T00:00:00");
  const fmtDate = iso => parseDate(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const daysSince = iso => Math.floor((Date.now() - parseDate(iso)) / DAY);
  const fmtNum = n => Math.round(n).toLocaleString("en-GB");

  function km(a, b) {
    const R = 6371, rad = x => x * Math.PI / 180;
    const dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  // Quadratic curve between two [lat, lng] points, bent sideways.
  function arc(a, b, n = 80, bend = 0.2) {
    const [y1, x1] = a, [y2, x2] = b;
    const cx = (x1 + x2) / 2 - (y2 - y1) * bend;
    const cy = (y1 + y2) / 2 + (x2 - x1) * bend;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, u = 1 - t;
      pts.push([u * u * y1 + 2 * u * t * cy + t * t * y2, u * u * x1 + 2 * u * t * cx + t * t * x2]);
    }
    return pts;
  }

  function withPhoto(wrap, src) {
    const img = $("img", wrap);
    wrap.classList.remove("nophoto");
    if (!src) { wrap.classList.add("nophoto"); img.removeAttribute("src"); return; }
    img.onerror = () => wrap.classList.add("nophoto");
    img.src = src;
  }

  // ---------- Reveal on scroll ----------
  const revealer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  const watchReveal = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => revealer.observe(el));

  // ---------- Intro ----------
  const apart = km(S.you.latlng, S.her.latlng);
  document.title = S.title;
  $("#title").textContent = S.title;
  $("#names").textContent = `${S.you.name} & ${S.her.name}`;
  $("#date").textContent = `Since ${fmtDate(S.metOn)}`;

  const stats = [
    { id: "days", value: fmtNum(daysSince(S.metOn)), label: "days since we met" },
    S.engagedOn && { value: fmtNum(daysSince(S.engagedOn)), label: "days engaged" },
    { value: fmtNum(apart), label: "km apart, never far" }
  ].filter(Boolean);
  $("#stats").innerHTML = "";
  stats.forEach(s => {
    const el = document.createElement("div");
    el.className = "stat";
    el.innerHTML = "<b></b><span></span>";
    $("b", el).textContent = s.value;
    $("span", el).textContent = s.label;
    $("#stats").appendChild(el);
  });
  $("#start").addEventListener("click", () => $("#journey").scrollIntoView({ behavior: "smooth" }));

  // ---------- Route map ----------
  $("#distance-line").textContent = S.distanceLine.replace("{km}", fmtNum(apart));

  if (window.L) initMap();
  else $(".map-wrap").innerHTML = '<p style="padding:40px;text-align:center">The map needs an internet connection.</p>';

  function initMap() {
    const map = L.map("map", { zoomControl: false, scrollWheelZoom: false, worldCopyJump: true });
    L.control.zoom({ position: "topleft" }).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    const allPoints = [S.you.latlng, S.her.latlng, ...S.pins.map(p => p.latlng)];
    const overview = () => map.flyToBounds(allPoints, { padding: [60, 60], duration: 1.4, maxZoom: 6 });
    map.fitBounds(allPoints, { padding: [60, 60], maxZoom: 6 });

    // Homes
    [S.you, S.her].forEach(p => {
      L.marker(p.latlng, {
        icon: L.divIcon({ className: "", html: `<div class="home"></div>`, iconSize: [0, 0] }),
        interactive: false,
        zIndexOffset: -100
      }).addTo(map).getElement().querySelector(".home").textContent = `${p.name} · ${p.city}`;
    });

    // Long-distance line + plane shuttling between homes
    const homeArc = arc(S.you.latlng, S.her.latlng, 160, 0.25);
    L.polyline(homeArc, { color: "#9e3550", weight: 2, opacity: .55, dashArray: "2 8", lineCap: "round", interactive: false }).addTo(map);
    const plane = L.marker(homeArc[0], {
      icon: L.divIcon({
        className: "plane",
        html: '<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      }),
      interactive: false,
      zIndexOffset: 500
    }).addTo(map);

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0, dir = 1, last = performance.now();
    const pointAt = f => {
      const i = Math.min(homeArc.length - 2, Math.floor(f * (homeArc.length - 1)));
      const k = f * (homeArc.length - 1) - i;
      const [a, b] = [homeArc[i], homeArc[i + 1]];
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    };
    function fly(now) {
      const dt = Math.min(64, now - last); last = now;
      t += dir * dt / 7000;
      if (t >= 1) { t = 1; dir = -1; } else if (t <= 0) { t = 0; dir = 1; }
      const here = pointAt(t), ahead = pointAt(Math.max(0, Math.min(1, t + dir * 0.01)));
      plane.setLatLng(here);
      const p1 = map.latLngToLayerPoint(here), p2 = map.latLngToLayerPoint(ahead);
      const deg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI + 90;
      const svg = plane.getElement()?.querySelector("svg");
      if (svg && (p1.x !== p2.x || p1.y !== p2.y)) svg.style.transform = `rotate(${deg}deg)`;
      requestAnimationFrame(fly);
    }
    if (!reduceMotion) requestAnimationFrame(fly);

    // Pins
    const markers = S.pins.map((p, i) => {
      const m = L.marker(p.latlng, {
        icon: L.divIcon({ className: "", html: `<div class="pin"><span>${i + 1}</span></div>`, iconSize: [34, 34], iconAnchor: [17, 34] }),
        zIndexOffset: 1000 + i,
        keyboard: true,
        title: p.title
      }).addTo(map);
      m.on("click", () => show(i));
      return m;
    });

    // Route drawn in order of the story when the map first scrolls into view
    const routePts = [];
    S.pins.forEach((p, i) => {
      if (i === 0) { routePts.push(p.latlng); return; }
      const prev = S.pins[i - 1].latlng;
      if (km(prev, p.latlng) < 0.05) return;
      routePts.push(...arc(prev, p.latlng, 60, 0.18).slice(1));
    });
    const route = L.polyline([], { color: "#c8506a", weight: 4, opacity: .85, lineCap: "round", lineJoin: "round", interactive: false }).addTo(map);
    function drawRoute() {
      if (reduceMotion) { route.setLatLngs(routePts); return; }
      let i = 0;
      const step = () => {
        i = Math.min(routePts.length, i + Math.max(1, Math.ceil(routePts.length / 120)));
        route.setLatLngs(routePts.slice(0, i));
        if (i < routePts.length) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { map.invalidateSize(); drawRoute(); obs.disconnect(); }
    }, { threshold: 0.4 }).observe($("#map"));

    // Story card
    const card = $("#card");
    const steps = [...S.pins, ...(S.next ? [{ ...S.next, isNext: true }] : [])];
    let current = -1, countdownTimer = null;

    function show(i) {
      current = i;
      const s = steps[i];
      markers.forEach((m, j) => m.getElement()?.querySelector(".pin")?.classList.toggle("active", j === i));
      $(".card-num", card).textContent = s.isNext ? "Soon" : `Stop ${i + 1}`;
      $(".card-date", card).textContent = s.isNext ? "" : [s.date, s.place].filter(Boolean).join(" · ");
      $(".card-title", card).textContent = s.title;
      $(".card-text", card).textContent = s.text || "";
      $(".card-count", card).textContent = `${i + 1} / ${steps.length}`;
      $(".card-prev", card).disabled = i === 0;
      $(".card-next", card).disabled = i === steps.length - 1;
      withPhoto($(".card-photo", card), s.isNext ? null : s.photo);
      $(".card-photo", card).hidden = !!s.isNext;

      clearInterval(countdownTimer);
      const cd = $(".card-countdown", card);
      cd.hidden = !(s.isNext && s.date);
      if (s.isNext && s.date) {
        const tick = () => {
          const ms = parseDate(s.date) - Date.now();
          if (ms <= 0) { cd.textContent = "Today. Finally."; return; }
          const d = Math.floor(ms / DAY), h = Math.floor(ms % DAY / 3600000), m = Math.floor(ms % 3600000 / 60000);
          cd.textContent = `${d} days · ${h} hrs · ${m} min to go`;
        };
        tick();
        countdownTimer = setInterval(tick, 30000);
      }

      card.hidden = false;
      $("#tour").hidden = true;

      if (s.isNext) overview();
      else {
        const mobile = innerWidth <= 720;
        const z = s.zoom || 12;
        // Offset the target so the pin isn't hidden behind the card.
        const pt = map.project(s.latlng, z);
        const shifted = mobile ? pt.add([0, map.getSize().y * 0.25]) : pt.add([170, 0]);
        map.flyTo(map.unproject(shifted, z), z, { duration: 1.6 });
      }
    }

    $("#tour").addEventListener("click", () => show(0));
    $(".card-next", card).addEventListener("click", () => current < steps.length - 1 && show(current + 1));
    $(".card-prev", card).addEventListener("click", () => current > 0 && show(current - 1));
    $(".card-close", card).addEventListener("click", () => {
      card.hidden = true;
      $("#tour").hidden = false;
      $("#tour").textContent = "Replay our route";
      markers.forEach(m => m.getElement()?.querySelector(".pin")?.classList.remove("active"));
      overview();
    });
    addEventListener("keydown", e => {
      if (card.hidden) return;
      if (e.key === "ArrowRight") $(".card-next", card).click();
      if (e.key === "ArrowLeft") $(".card-prev", card).click();
      if (e.key === "Escape") $(".card-close", card).click();
    });
  }

  // ---------- Polaroid wall ----------
  const wall = $("#wall");
  const touch = matchMedia("(hover: none)").matches;
  $("#wall-hint").textContent = touch
    ? "Tap a photo to turn it over · hold and drag to move it"
    : "Click a photo to turn it over · drag to move it around";

  let zTop = 10;
  const cards = S.polaroids.map(p => {
    const el = document.createElement("div");
    el.className = "polaroid";
    el.innerHTML = '<div class="inner"><div class="face front"><div class="ph"><img alt="" draggable="false"></div><div class="label"></div></div><div class="face back"><p></p></div></div>';
    withPhoto($(".ph", el), p.photo);
    $(".label", el).textContent = p.label || "";
    $(".back p", el).textContent = p.caption || "";
    el.style.setProperty("--r", `${(Math.random() * 14 - 7).toFixed(1)}deg`);
    el.dataset.jx = Math.random();
    el.dataset.jy = Math.random();
    wall.appendChild(el);
    draggable(el);
    return el;
  });

  let laidOutWidth = 0;
  function layout() {
    const W = wall.clientWidth;
    if (Math.abs(W - laidOutWidth) < 40) return;
    laidOutWidth = W;
    const cw = W < 520 ? 150 : 200;
    const ch = cw * 1.22;
    const cols = Math.max(2, Math.floor((W - 24) / (cw * 0.98)));
    const rows = Math.ceil(cards.length / cols);
    const cellW = (W - 24) / cols, cellH = ch * 1.02;
    wall.style.height = `${rows * cellH + 64}px`;
    cards.forEach((el, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const jitter = Math.max(0, cellW - cw);
      el.style.setProperty("--w", `${cw}px`);
      el.style.left = `${12 + c * cellW + el.dataset.jx * jitter}px`;
      el.style.top = `${32 + r * cellH + (el.dataset.jy - 0.5) * 24}px`;
    });
  }
  layout();
  addEventListener("resize", layout);

  function draggable(el) {
    let sx, sy, ox, oy, moved = false, dragging = false, hold = null;
    const clamp = (v, max) => Math.max(-20, Math.min(max, v));
    const begin = (x, y) => { sx = x; sy = y; ox = el.offsetLeft; oy = el.offsetTop; moved = false; };
    const lift = () => { dragging = true; el.classList.add("lifted"); el.style.zIndex = ++zTop; };
    const move = (x, y) => {
      const dx = x - sx, dy = y - sy;
      if (!moved && Math.hypot(dx, dy) > 6) moved = true;
      if (!dragging) return;
      el.style.left = `${clamp(ox + dx, wall.clientWidth - el.offsetWidth + 20)}px`;
      el.style.top = `${clamp(oy + dy, wall.clientHeight - el.offsetHeight + 20)}px`;
    };
    const drop = () => {
      dragging = false;
      el.classList.remove("lifted");
      if (!moved) el.classList.toggle("flipped");
    };

    el.addEventListener("mousedown", e => {
      if (e.button !== 0) return;
      e.preventDefault();
      begin(e.clientX, e.clientY);
      lift();
      const mm = e => move(e.clientX, e.clientY);
      const mu = () => { removeEventListener("mousemove", mm); removeEventListener("mouseup", mu); drop(); };
      addEventListener("mousemove", mm);
      addEventListener("mouseup", mu);
    });

    // Touch: tap flips, hold-then-drag moves, a quick swipe scrolls the page.
    el.addEventListener("touchstart", e => {
      const t = e.touches[0];
      begin(t.clientX, t.clientY);
      hold = setTimeout(() => { if (!moved) { lift(); navigator.vibrate?.(8); } }, 220);
    }, { passive: true });
    el.addEventListener("touchmove", e => {
      const t = e.touches[0];
      if (dragging) { e.preventDefault(); move(t.clientX, t.clientY); return; }
      if (Math.hypot(t.clientX - sx, t.clientY - sy) > 8) { moved = true; clearTimeout(hold); }
    }, { passive: false });
    el.addEventListener("touchend", e => {
      clearTimeout(hold);
      if (dragging) { e.preventDefault(); drop(); }
      else if (!moved) { e.preventDefault(); el.classList.toggle("flipped"); }
    });
  }

  // ---------- Ending ----------
  const msg = $("#message");
  S.message.split(/\n\s*\n/).forEach((para, i) => {
    const p = document.createElement("p");
    p.className = "reveal";
    p.style.transitionDelay = `${i * 0.35}s`;
    p.textContent = para.trim();
    msg.appendChild(p);
  });
  $("#signature").textContent = S.signature || "";

  const hearts = $(".hearts");
  for (let i = 0; i < 18; i++) {
    const h = document.createElement("span");
    h.textContent = "♥";
    h.style.left = `${Math.random() * 100}%`;
    h.style.fontSize = `${10 + Math.random() * 18}px`;
    h.style.animationDuration = `${9 + Math.random() * 10}s`;
    h.style.animationDelay = `${-Math.random() * 15}s`;
    hearts.appendChild(h);
  }

  watchReveal();
})();
