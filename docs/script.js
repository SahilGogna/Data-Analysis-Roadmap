/* ═══════════════════════════════════════════
   ORU — Data Analyst Roadmap
   Concept A: The Winding Trail
   GSAP ScrollTrigger + dynamic SVG path
═══════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Progress bar ──────────────────────── */
  const progressBar = document.getElementById("progressBar");
  window.addEventListener("scroll", function () {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollable > 0 ? window.scrollY / scrollable * 100 : 0).toFixed(2) + "%";
  }, { passive: true });

  /* ── Nav solidify ──────────────────────── */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("solid", window.scrollY > 60);
  }, { passive: true });
  nav.classList.toggle("solid", window.scrollY > 60);

  /* ── Fade-up (generic sections) ─────────── */
  const fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); fadeObs.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".fade-up").forEach(function (el) { fadeObs.observe(el); });

  /* ── Criteria cards stagger ─────────────── */
  const criteriaGrid = document.querySelector(".criteria__grid");
  if (criteriaGrid) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        entries[0].target.querySelectorAll(".criteria__item").forEach(function (card, i) {
          setTimeout(function () { card.classList.add("visible"); }, i * 140);
        });
        this.disconnect();
      }
    }, { threshold: 0.1 }).observe(criteriaGrid);
  }

  /* ══════════════════════════════════════════
     PATH ENGINE
  ════════════════════════════════════════════ */

  function buildPath() {
    var container  = document.getElementById("roadmapContainer");
    var svg        = document.getElementById("roadmapSvg");
    var pathGlow   = document.getElementById("pathGlow");
    var pathMain   = document.getElementById("pathMain");
    var pathFlow   = document.getElementById("pathFlow");
    var nodesGroup = document.getElementById("pathNodes");
    var traveler   = document.getElementById("pathTraveler");
    if (!container || !svg || !pathMain) return;

    /* 1 — Dimensions */
    var cRect = container.getBoundingClientRect();
    var W = cRect.width;
    var H = container.offsetHeight;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.style.height = H + "px";

    /* 2 — Checkpoint positions (center of each .phase__node) */
    var checkpoints = [];
    container.querySelectorAll(".phase").forEach(function (phase) {
      var nodeEl = phase.querySelector(".phase__node");
      if (!nodeEl) return;
      var nr = nodeEl.getBoundingClientRect();
      checkpoints.push({
        x:      nr.left + nr.width  / 2 - cRect.left,
        y:      nr.top  + nr.height / 2 - cRect.top,
        nodeEl: nodeEl,
        phase:  phase
      });
    });
    if (checkpoints.length < 2) return;

    /* 3 — Path points: top anchor → checkpoints → bottom anchor */
    var pts = [{ x: W / 2, y: Math.max(0, checkpoints[0].y - 100) }]
      .concat(checkpoints.map(function (c) { return { x: c.x, y: c.y }; }))
      .concat([{ x: W / 2, y: Math.min(H, checkpoints[checkpoints.length - 1].y + 100) }]);

    /* 4 — Smooth cubic bezier path string */
    function makeD(points) {
      var d = "M " + points[0].x.toFixed(1) + " " + points[0].y.toFixed(1);
      for (var i = 1; i < points.length; i++) {
        var p0 = points[i - 1], p1 = points[i];
        var pull = (p1.y - p0.y) * 0.5;
        d += " C " + p0.x.toFixed(1) + " " + (p0.y + pull).toFixed(1) +
             ", " + p1.x.toFixed(1) + " " + (p1.y - pull).toFixed(1) +
             ", " + p1.x.toFixed(1) + " " + p1.y.toFixed(1);
      }
      return d;
    }

    var pathD = makeD(pts);
    [pathGlow, pathMain, pathFlow].forEach(function (p) { p.setAttribute("d", pathD); });

    /* 5 — SVG checkpoint halos (pure decoration, always visible) */
    nodesGroup.innerHTML = "";
    checkpoints.forEach(function (cp) {
      var halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("cx", cp.x.toFixed(1));
      halo.setAttribute("cy", cp.y.toFixed(1));
      halo.setAttribute("r", "28");
      halo.setAttribute("fill", "none");
      halo.setAttribute("stroke", "rgba(118,34,215,0.18)");
      halo.setAttribute("stroke-width", "1");
      nodesGroup.appendChild(halo);
    });

    /* 6 — Initialise path as invisible (draw on scroll) */
    var pathLen = pathMain.getTotalLength();
    gsap.set([pathMain, pathGlow], { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    gsap.set(pathFlow, { opacity: 0 });

    /* Precompute each checkpoint's fractional position along the path */
    /* We walk the path in small steps and find the nearest point to each checkpoint */
    var totalPathLen = pathLen;
    var checkpointFractions = checkpoints.map(function (cp) {
      /* Binary-search for the path length at which we're closest to cp (x,y) */
      var lo = 0, hi = totalPathLen, best = 0, bestDist = Infinity;
      for (var iter = 0; iter < 30; iter++) {
        var mid = (lo + hi) / 2;
        var pt  = pathMain.getPointAtLength(mid);
        var dist = Math.hypot(pt.x - cp.x, pt.y - cp.y);
        if (dist < bestDist) { bestDist = dist; best = mid; }
        /* Also check lo and hi halves */
        var ptLo  = pathMain.getPointAtLength(lo  + (mid - lo)  / 2);
        var ptHi  = pathMain.getPointAtLength(mid + (hi  - mid) / 2);
        var dLo   = Math.hypot(ptLo.x - cp.x, ptLo.y - cp.y);
        var dHi   = Math.hypot(ptHi.x - cp.x, ptHi.y - cp.y);
        if (dLo < dHi) hi = mid; else lo = mid;
      }
      return best / totalPathLen;
    });

    /* 7 — GSAP scroll-driven path draw */
    gsap.to([pathMain, pathGlow], {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 72%",
        end: "bottom 28%",
        scrub: 1.4,
        onUpdate: function (self) {
          var drawn = totalPathLen * self.progress;
          var pt = pathMain.getPointAtLength(drawn);

          /* Traveler dot — convert SVG coords → container px */
          var svgRect = svg.getBoundingClientRect();
          var scaleX = svgRect.width  / W;
          var scaleY = svgRect.height / H;
          traveler.style.left = (pt.x * scaleX).toFixed(1) + "px";
          traveler.style.top  = (pt.y * scaleY).toFixed(1) + "px";
          traveler.classList.toggle("visible", self.progress > 0.02);

          /* Activate flow dots once drawing begins */
          gsap.set(pathFlow, { opacity: self.progress > 0.05 ? 0.35 : 0 });

          /* Activate checkpoint nodes as path reaches them */
          checkpoints.forEach(function (cp, i) {
            cp.nodeEl.classList.toggle("active", self.progress >= checkpointFractions[i] - 0.015);
          });
        }
      }
    });

    /* 8 — Card entrance animations */
    checkpoints.forEach(function (cp) {
      var card = cp.phase.querySelector(".phase__card");
      if (!card) return;
      ScrollTrigger.create({
        trigger: cp.phase,
        start: "top 74%",
        onEnter: function () { card.classList.add("visible"); }
      });
    });
  }

  /* ── Boot ──────────────────────────────── */
  function init() {
    gsap.registerPlugin(ScrollTrigger);
    buildPath();
  }

  /* ── Debounced resize ──────────────────── */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
      buildPath();
    }, 240);
  });

  /* Defer two frames so the browser has painted the layout */
  requestAnimationFrame(function () {
    requestAnimationFrame(init);
  });

})();
