/* ═══════════════════════════════════════════
   ORU — Data Analyst Roadmap
   Concept B: The Metro Map
   Station interactions + line draw-in
═══════════════════════════════════════════ */

(function () {
  "use strict";

  /* ══════════════════════════════════════════
     STATION DATA
  ════════════════════════════════════════════ */
  var STATIONS = {

    /* ── EXCEL LINE ─────────────────────── */
    e1: {
      line: "Excel Line",
      lineColor: "#217346",
      name: "Excel Basics",
      time: "Weeks 1–2",
      desc: "The tool every analyst touches on day one. Before Python, before SQL — you need to be fluent here. Focus on the formulas hiring managers actually test for.",
      topics: [
        "Sorting, filtering & conditional formatting",
        "SUM, AVERAGE, COUNTIF, IF statements",
        "SUMIF & COUNTIF for conditional totals",
        "Named ranges & data validation"
      ],
      resources: [
        { label: "Excel Roadmap", url: "https://github.com/SahilGogna/Study-Resources/blob/main/analysis/excel-roadmap.md" },
        { label: "Excel Free Course", url: "https://www.youtube.com/watch?v=7QNgqq154gE" }
      ]
    },
    e2: {
      line: "Excel Line",
      lineColor: "#217346",
      name: "Pivot Tables & VLOOKUP",
      time: "Weeks 2–3",
      desc: "Pivot tables are the fastest way to slice and summarize data. VLOOKUP (and the newer INDEX MATCH) shows up in almost every analyst test.",
      topics: [
        "Pivot tables: grouping, filtering, calculated fields",
        "VLOOKUP: exact & approximate match",
        "INDEX MATCH for reverse/two-way lookups",
        "Slicers and pivot charts"
      ],
      resources: []
    },
    e3: {
      line: "Excel Line",
      lineColor: "#217346",
      name: "Dashboards — Transfer to SQL",
      time: "Week 3",
      desc: "Build a simple dashboard to consolidate what you learned. Then board the SQL line — this is where the real analysis work begins.",
      topics: [
        "Combining charts + pivot tables in one view",
        "Basic conditional formatting rules",
        "Simple KPI tracking layout",
        "Transfer: board the SQL line →"
      ],
      resources: []
    },

    /* ── SQL LINE ────────────────────────── */
    s1: {
      line: "SQL Line",
      lineColor: "#1E40AF",
      name: "SQL Basics",
      time: "Weeks 3–5",
      desc: "SQL is the #1 skill on data analyst job descriptions. Start with the fundamentals — every subsequent tool assumes you know these cold.",
      topics: [
        "SELECT, FROM, WHERE, ORDER BY",
        "GROUP BY + HAVING",
        "Aggregate functions: COUNT, SUM, AVG, MIN, MAX",
        "Filtering with AND, OR, NOT, IN, BETWEEN, LIKE"
      ],
      resources: [
        { label: "SQL Roadmap", url: "https://github.com/SahilGogna/Study-Resources/blob/main/analysis/sql.md" },
        { label: "SQL DDL_DML", url: "https://github.com/SahilGogna/SQL-ORU/tree/main/1.%20DDL_DML" },
        { label: "DQL Practice", url: "https://github.com/SahilGogna/SQL-ORU/tree/main/2.%20DQL" },
        { label: "Case Study", url: "https://github.com/SahilGogna/SQL-ORU/tree/main/3.%20Bike%20Case%20Study" }
      ]
    },
    s2: {
      line: "SQL Line",
      lineColor: "#1E40AF",
      name: "JOINs & Aggregation — branches to Python",
      time: "Weeks 5–6",
      desc: "JOINs are how you combine tables — essential for any real-world dataset. Once you're comfortable here, Python foundations start in parallel.",
      topics: [
        "INNER JOIN, LEFT JOIN, RIGHT JOIN",
        "Multi-table queries",
        "Subqueries (simple nested SELECT)",
        "Python line branches here → start Week 6"
      ],
      resources: [
        { label: "Joins", url: "https://github.com/SahilGogna/SQL-ORU/tree/main/5.%20Joins" },
        { label: "Sub Queries", url: "https://github.com/SahilGogna/SQL-ORU/tree/main/4.%20sub_queries" }
      ]
    },
    s3: {
      line: "SQL Line",
      lineColor: "#1E40AF",
      name: "Window Functions",
      time: "Weeks 6–8",
      desc: "Window functions separate junior analysts from senior ones in interviews. Practice these until they feel automatic.",
      topics: [
        "ROW_NUMBER, RANK, DENSE_RANK",
        "PARTITION BY for segmented calculations",
        "LAG & LEAD for period-over-period analysis",
        "CTEs (Common Table Expressions) for readable queries"
      ],
      resources: [
        { label: "Practice Questions", url: "https://github.com/SahilGogna/SQL-ORU/tree/main/6.%20Window%20Functions" },
        { label: "75 SQL Questions", url: "https://github.com/SahilGogna/Study-Resources/blob/main/analysis/sql-75-questions.md" }
      ]
    },

    /* ── PYTHON LINE ─────────────────────── */
    p1: {
      line: "Python Line",
      lineColor: "#3776AB",
      name: "Python Foundations",
      time: "Weeks 6–8",
      desc: "Start Python while you're finishing SQL — they reinforce each other. The goal here isn't to become a software engineer, it's to understand enough to use Pandas.",
      topics: [
        "Variables, data types, conditionals",
        "Loops and list comprehensions",
        "Functions and scope",
        "Jupyter Notebook setup + importing libraries"
      ],
      resources: [
        { label: "Python Roadmap", url: "https://github.com/SahilGogna/Study-Resources/blob/main/python/Python_Roadmap.md" },
        { label: "Foundations Checklist", url: "https://github.com/SahilGogna/Study-Resources/blob/main/python/Python_Foundations_Checklist.md" },
        { label: "50 Practice Problems", url: "https://github.com/SahilGogna/Study-Resources/blob/main/python/python-50-question-easy.md" }
      ]
    },
    p2: {
      line: "Python Line",
      lineColor: "#3776AB",
      name: "Pandas & Analysis — branches to Viz",
      time: "Weeks 8–11",
      desc: "Pandas is the library. Reading data, cleaning it, grouping, merging, plotting — this is the day-to-day work of a data analyst. The Viz line branches here.",
      topics: [
        "Reading CSVs & DataFrames",
        "Filter, groupby, merge, pivot_table",
        "Handling missing values & duplicates",
        "matplotlib & seaborn for quick plots",
        "Libraries - NumPy, Pandas, Matplotlib, Seaborn"
      ],
      resources: [
        { label: "Pandas Video", url: "https://www.youtube.com/watch?v=2uvysYbKdjM&t=71s" },
        { label: "Visulization Video", url: "https://www.youtube.com/watch?v=DAQNHzOcO5A" },
      ]
    },
    p3: {
      line: "Python Line",
      lineColor: "#3776AB",
      name: "Projects",
      time: "Weeks 11+",
      desc: "Apply everything you've learned to real datasets. End-to-end: business question → clean data → explore → insight → recommendation. Host it on GitHub.",
      topics: [
        "Pick real-world datasets (e-commerce, HR, finance)",
        "Define a business question before writing code",
        "Document your process in a clean Jupyter Notebook",
        "Write a clear README: problem, approach, findings"
      ],
      resources: [
        { label: "Python Project Ideas", url: "https://github.com/SahilGogna/Study-Resources/blob/main/python/PythonProjects.md" },
        { label: "End to End Project Idea", url: "https://github.com/SahilGogna/Study-Resources/tree/main/project-ideas" }
      ]
    },

    /* ── VIZ + STATS LINE ────────────────── */
    v1: {
      line: "Viz + Stats Line",
      lineColor: "#7C3AED",
      name: "Tableau / Power BI",
      time: "Weeks 9–13",
      desc: "Pick one and go deep — Tableau or Power BI. Check local job postings and use whichever appears more. Clean, story-driven dashboards are the goal.",
      topics: [
        "Connecting to data sources (CSV, database)",
        "Bar, line, scatter, area charts",
        "Dashboard layout and design principles",
        "Filters, drill-downs, and publishing"
      ],
      resources: [
        { label: "Data Viz Guide", url: "https://github.com/SahilGogna/Study-Resources/blob/main/analysis/data-visualization.md" }
      ]
    },
    v2: {
      line: "Viz + Stats Line",
      lineColor: "#7C3AED",
      name: "Statistics — branches to Career",
      time: "Weeks 10–13",
      desc: "You don't need a degree. Just enough to understand what numbers mean, why trends are real (or aren't), and how to defend your conclusions. Career line branches here.",
      topics: [
        "Mean, median, mode, standard deviation",
        "Correlation vs causation",
        "Hypothesis testing basics + p-values",
        "Normal distribution & outlier detection"
      ],
      resources: []
    },
    v3: {
      line: "Viz + Stats Line",
      lineColor: "#7C3AED",
      name: "Data Storytelling",
      time: "Weeks 12–15",
      desc: "This is the skill that separates analysts who get promoted from analysts who just produce reports. What → Why → What to do. That's the whole framework.",
      topics: [
        "Structure: What happened → Why → Recommendation",
        "Writing clear executive summaries",
        "Presenting findings without reading slides",
        "Using AI (Claude/ChatGPT) to write SQL faster"
      ],
      resources: []
    },

    /* ── CAREER LINE ─────────────────────── */
    c1: {
      line: "Career Line",
      lineColor: "#7622D7",
      name: "Portfolio Hub",
      time: "Months 3–4",
      desc: "2–3 complete end-to-end projects on GitHub. This is your proof of work. Every application you send should link to this.",
      topics: [
        "2–3 projects across different domains",
        "Each project: problem, data, analysis, insights",
        "Clean GitHub repo with descriptive README",
        "SQL + Python + Viz represented across projects"
      ],
      resources: [
        { label: "Project Ideas Bank", url: "https://github.com/SahilGogna/Study-Resources/tree/main/project-ideas" },
        { label: "Python Project Ideas", url: "https://github.com/SahilGogna/Study-Resources/blob/main/python/PythonProjects.md" }
      ]
    },
    c2: {
      line: "Career Line",
      lineColor: "#7622D7",
      name: "Resume & LinkedIn",
      time: "Months 4–5",
      desc: "One page, ATS-friendly resume. LinkedIn headline: what you want to be, not what you are. Both should tell a consistent story of someone who's ready to add value.",
      topics: [
        "ATS-friendly format: no tables, no columns",
        "Quantify impact: '500K+ rows analyzed using SQL'",
        "LinkedIn headline: 'Aspiring Data Analyst | SQL · Python · Tableau'",
        "Connect proactively with recruiters at target companies"
      ],
      resources: [
        { label: "Resume Guide", url: "https://github.com/SahilGogna/Study-Resources/blob/main/resume-cl/resume-guide.md" },
        { label: "Resume Cheat Sheet", url: "https://github.com/SahilGogna/Study-Resources/blob/main/resume-cl/The%20Ultimate%20Resume%20Cheat%20Sheet.md" },
        { label: "Cover Letter Guide", url: "https://github.com/SahilGogna/Study-Resources/blob/main/resume-cl/cover-letter.md" },
        { label: "LinkedIn Guide", url: "https://github.com/SahilGogna/Study-Resources/blob/main/portfolio/linkedin.md" }
      ]
    },
    c3: {
      line: "Career Line",
      lineColor: "#7622D7",
      name: "Job Ready ★",
      time: "Months 5–6",
      desc: "Three things make you job-ready: you can answer SQL live, you have 2–3 real projects to reference, and you can explain your analysis to a non-technical person clearly.",
      topics: [
        "SQL under pressure (shared screen, think aloud)",
        "STAR method for behavioral questions",
        "Take-home case studies (48-hour datasets)",
        "Mock interviews with a mentor or peer"
      ],
      resources: [
        { label: "SQL Interview Guide", url: "https://www.youtube.com/watch?v=oe6oCw3MwyM" },
        { label: "Data Interview Guide", url: "https://github.com/SahilGogna/Study-Resources/blob/main/analysis/data-interview-guide.md" },
        { label: "BA Interview Questions", url: "https://github.com/SahilGogna/Study-Resources/blob/main/analysis/Business%20Analyst%20Interview%20Questions.md" },
        { label: "Job Application Guide", url: "https://github.com/SahilGogna/Study-Resources/blob/main/interview-process/job-application-process-guide.md" }
      ]
    }
  };

  /* ══════════════════════════════════════════
     LINE DRAW-IN ANIMATION
  ════════════════════════════════════════════ */
  var LINE_IDS = [
    { main: "lineExcel", glow: "lineExcelGlow", conn: null, delay: 0 },
    { main: "lineSql", glow: "lineSqlGlow", conn: "connES", delay: 600 },
    { main: "linePython", glow: "linePythonGlow", conn: "connSP", delay: 1100 },
    { main: "lineViz", glow: "lineVizGlow", conn: "connPV", delay: 1600 },
    { main: "lineCareer", glow: "lineCareerGlow", conn: "connVC", delay: 2100 }
  ];

  /* Map line IDs to station group IDs for staggered station appearance */
  var LINE_STATIONS = {
    lineExcel: ["e1", "e2", "e3"],
    lineSql: ["s1", "s2", "s3"],
    linePython: ["p1", "p2", "p3"],
    lineViz: ["v1", "v2", "v3"],
    lineCareer: ["c1", "c2", "c3"]
  };

  function initLineAnimations() {
    /* Set proper stroke-dasharray on each line path from its actual length */
    LINE_IDS.forEach(function (entry) {
      var mainEl = document.getElementById(entry.main);
      var glowEl = document.getElementById(entry.glow);
      if (!mainEl) return;

      var len = mainEl.getTotalLength();
      [mainEl, glowEl].forEach(function (el) {
        if (!el) return;
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
      });
    });

    /* Stagger each line drawing */
    LINE_IDS.forEach(function (entry, i) {
      setTimeout(function () {
        var mainEl = document.getElementById(entry.main);
        var glowEl = document.getElementById(entry.glow);
        var connEl = entry.conn ? document.getElementById(entry.conn) : null;

        if (mainEl) {
          var len = mainEl.getTotalLength();
          /* Set transition duration proportional to line length */
          var dur = Math.max(0.6, len / 280);
          mainEl.style.transition = "stroke-dashoffset " + dur + "s cubic-bezier(0.4,0,0.2,1)";
          mainEl.style.strokeDashoffset = 0;
        }
        if (glowEl) {
          var lenG = glowEl.getTotalLength();
          var durG = Math.max(0.6, lenG / 280);
          glowEl.style.transition = "stroke-dashoffset " + durG + "s cubic-bezier(0.4,0,0.2,1)";
          glowEl.style.strokeDashoffset = 0;
        }

        /* Show connector line after a short delay */
        if (connEl) {
          setTimeout(function () {
            connEl.classList.add("visible");
          }, 400);
        }

        /* Make stations appear after line draws */
        var stationIds = LINE_STATIONS[entry.main] || [];
        stationIds.forEach(function (sid, si) {
          setTimeout(function () {
            var el = document.querySelector("[data-station='" + sid + "']");
            if (el) el.classList.add("ready");
          }, 400 + si * 120);
        });

      }, entry.delay);
    });
  }

  /* ══════════════════════════════════════════
     PANEL MANAGEMENT
  ════════════════════════════════════════════ */
  var panel = document.getElementById("modalCard");
  var overlay = document.getElementById("modalBackdrop");
  var closeBtn = document.getElementById("panelClose");

  var activeStation = null;

  function openPanel(stationId) {
    var data = STATIONS[stationId];
    if (!data) return;

    /* De-activate previously active station */
    if (activeStation) {
      var prev = document.querySelector("[data-station='" + activeStation + "']");
      if (prev) prev.classList.remove("active");
    }
    activeStation = stationId;

    /* Mark new station active */
    var stEl = document.querySelector("[data-station='" + stationId + "']");
    if (stEl) stEl.classList.add("active");

    /* Populate panel content */
    var badgeEl = document.getElementById("panelLineBadge");
    var dotEl = document.getElementById("panelLineDot");
    dotEl.style.background = data.lineColor;
    badgeEl.style.background = data.lineColor + "22";
    badgeEl.style.color = data.lineColor;
    badgeEl.style.borderLeft = "3px solid " + data.lineColor;
    document.getElementById("panelLineName").textContent = data.line.toUpperCase();

    document.getElementById("panelStationName").textContent = data.name;
    document.getElementById("panelTime").textContent = data.time;
    document.getElementById("panelDesc").textContent = data.desc;

    var topicsList = document.getElementById("panelTopics");
    topicsList.innerHTML = "";
    data.topics.forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t;
      topicsList.appendChild(li);
    });

    var resourcesWrap = document.getElementById("panelResources");
    var resourcesLabel = document.getElementById("panelResourcesLabel");
    resourcesWrap.innerHTML = "";

    if (data.resources && data.resources.length > 0) {
      resourcesLabel.style.display = "";
      data.resources.forEach(function (r) {
        var a = document.createElement("a");
        a.href = r.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "panel__chip";
        a.textContent = r.label + " ↗";
        resourcesWrap.appendChild(a);
      });
    } else {
      resourcesLabel.style.display = "none";
      var p = document.createElement("p");
      p.className = "panel__no-resources";
      p.textContent = "";
      resourcesWrap.appendChild(p);
    }

    /* Show panel */
    panel.classList.add("open");
    overlay.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");

    if (activeStation) {
      var el = document.querySelector("[data-station='" + activeStation + "']");
      if (el) el.classList.remove("active");
      activeStation = null;
    }
  }

  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });

  /* ══════════════════════════════════════════
     STATION CLICK HANDLERS
  ════════════════════════════════════════════ */
  document.querySelectorAll(".station").forEach(function (el) {
    var id = el.getAttribute("data-station");

    el.addEventListener("click", function () {
      openPanel(id);
    });

    /* Keyboard accessibility */
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPanel(id);
      }
    });
  });

  /* ══════════════════════════════════════════
     BOOT
  ════════════════════════════════════════════ */
  /* Small delay so CSS transitions are ready */
  setTimeout(initLineAnimations, 120);

})();
