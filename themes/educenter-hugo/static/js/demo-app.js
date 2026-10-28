// demo-app.js — Fake but functional client-side logic for the school demo.
// Auth (localStorage), application form, fake payment, student dashboard.
// No real backend, no real payments, no real personal data.

(function () {
  'use strict';

  // Fallback mock students used if /data/students.json cannot be fetched.
  var FALLBACK_STUDENTS = [
    {
      id: "STU-2026-0001",
      email: "amine.benali@ecole-demo.ma",
      password: "demo123",
      name: "Amine Benali",
      avatar: "images/avatars/avatar-1.jpg",
      program: "Développement Digital",
      level: "Technicien Spécialisé (TS)",
      year: "2e année",
      campus: "ISTA Casablanca",
      points: 842,
      modules: ["Développement Web", "Bases de données", "Applications mobiles", "Gestion de projet"],
      grades: { "Développement Web": 16, "Bases de données": 14, "Applications mobiles": 15, "Gestion de projet": 17 },
      attendance: 88,
      announcements: [
        { title: "Rentrée universitaire", date: "2026-09-01", text: "La rentrée des TS Développement Digital a lieu le 1er septembre à 8h30 en amphi A." },
        { title: "Forum de l'emploi", date: "2026-12-05", text: "Rencontrez les recruteurs lors du forum de l'emploi et des stages à la Cité des Métiers de Casablanca." },
        { title: "Concours d'accès 2027", date: "2027-01-20", text: "Épreuves écrites et entretiens pour la session 2027. Convocation envoyée par e-mail." }
      ],
      exams: [
        { module: "Développement Web", date: "2026-12-12", time: "09:00", salle: "Salle 101" },
        { module: "Bases de données", date: "2026-12-15", time: "14:00", salle: "Salle 204" },
        { module: "Applications mobiles", date: "2026-12-17", time: "10:00", salle: "Lab info 3" }
      ],
      documents: [
        { title: "Attestation d'inscription 2026-2027", type: "Attestation", date: "2026-09-10" },
        { title: "Relevé de notes — semestre 1", type: "Relevé", date: "2027-02-05" },
        { title: "Certificat de scolarité", type: "Certificat", date: "2026-10-01" }
      ],
      messages: [
        { from: "Scolarité", date: "2026-09-20", subject: "Votre attestation est disponible", text: "Vous pouvez télécharger votre attestation d'inscription dans Documents." },
        { from: "M. Benali (formateur)", date: "2026-09-25", subject: "Rendu du projet Web", text: "N'oubliez pas de rendre votre projet de développement web avant le 5 octobre." }
      ]
    },
    {
      id: "STU-2026-0002",
      email: "sarah.tazi@ecole-demo.ma",
      password: "demo123",
      name: "Sarah Tazi",
      avatar: "images/avatars/avatar-2.jpg",
      program: "Gestion des Entreprises",
      level: "Technicien (T)",
      year: "1re année",
      campus: "CMC Casablanca-Settat",
      points: 791,
      modules: ["Comptabilité", "Gestion commerciale", "Ressources humaines", "Bureautique"],
      grades: { "Comptabilité": 13, "Gestion commerciale": 15, "Ressources humaines": 14, "Bureautique": 16 },
      attendance: 82,
      announcements: [
        { title: "Rentrée universitaire", date: "2026-09-01", text: "La rentrée des T Gestion a lieu le 1er septembre à 8h30 en amphi B." },
        { title: "Forum de l'emploi", date: "2026-12-05", text: "Rencontrez les recruteurs lors du forum de l'emploi et des stages à la Cité des Métiers de Casablanca." }
      ],
      exams: [
        { module: "Comptabilité", date: "2026-12-10", time: "14:00", salle: "Salle 302" },
        { module: "Gestion commerciale", date: "2026-12-14", time: "09:00", salle: "Salle 105" }
      ],
      documents: [
        { title: "Attestation d'inscription 2026-2027", type: "Attestation", date: "2026-09-10" },
        { title: "Certificat de scolarité", type: "Certificat", date: "2026-10-01" }
      ],
      messages: [
        { from: "Scolarité", date: "2026-09-22", subject: "Emploi du temps mis à jour", text: "Votre emploi du temps a été mis à jour. Consultez-le dans l'espace étudiant." }
      ]
    },
    {
      id: "STU-2026-0003",
      email: "karim.mansouri@ecole-demo.ma",
      password: "demo123",
      name: "Karim Mansouri",
      avatar: "images/avatars/avatar-3.jpg",
      program: "Électromécanique des Systèmes Automatisés",
      level: "Technicien Spécialisé (TS)",
      year: "2e année",
      campus: "ISTA Fès",
      points: 905,
      modules: ["Automatismes", "Maintenance industrielle", "Robotique", "Électricité"],
      grades: { "Automatismes": 17, "Maintenance industrielle": 15, "Robotique": 16, "Électricité": 14 },
      attendance: 91,
      announcements: [
        { title: "Rentrée universitaire", date: "2026-09-01", text: "La rentrée des TS Électromécanique a lieu le 1er septembre à 8h en atelier." },
        { title: "Visite usine", date: "2026-11-10", text: "Visite guidée d'une usine partenaire le 10 novembre. Inscription obligatoire auprès de la scolarité." }
      ],
      exams: [
        { module: "Automatismes", date: "2026-12-11", time: "09:00", salle: "Atelier A" },
        { module: "Maintenance industrielle", date: "2026-12-13", time: "14:00", salle: "Atelier B" }
      ],
      documents: [
        { title: "Attestation d'inscription 2026-2027", type: "Attestation", date: "2026-09-10" },
        { title: "Certificat de scolarité", type: "Certificat", date: "2026-10-01" }
      ],
      messages: [
        { from: "Scolarité", date: "2026-09-18", subject: "Visite usine — 10 novembre", text: "Pensez à vous inscrire pour la visite d'usine du 10 novembre." }
      ]
    },
    {
      id: "STU-2026-0004",
      email: "ines.berrada@ecole-demo.ma",
      password: "demo123",
      name: "Inès Berrada",
      avatar: "images/avatars/avatar-4.jpg",
      program: "Cuisine — Qualification",
      level: "Qualification",
      year: "1re année",
      campus: "Institut d'Hôtellerie, Agadir",
      points: 765,
      modules: ["Gastronomie marocaine", "Pâtisserie", "Hygiène alimentaire", "Service en salle"],
      grades: { "Gastronomie marocaine": 15, "Pâtisserie": 14, "Hygiène alimentaire": 16, "Service en salle": 13 },
      attendance: 85,
      announcements: [
        { title: "Rentrée universitaire", date: "2026-09-01", text: "La rentrée en Qualification Cuisine a lieu le 1er septembre en cuisine pédagogique." },
        { title: "Salon des métiers THR", date: "2027-02-10", text: "Démonstrations culinaires et rencontres avec les grands hôtels à Agadir." }
      ],
      exams: [
        { module: "Gastronomie marocaine", date: "2026-12-08", time: "10:00", salle: "Cuisine 1" },
        { module: "Pâtisserie", date: "2026-12-10", time: "09:00", salle: "Cuisine 2" }
      ],
      documents: [
        { title: "Attestation d'inscription 2026-2027", type: "Attestation", date: "2026-09-10" }
      ],
      messages: [
        { from: "Scolarité", date: "2026-09-21", subject: "Tenue de cuisine", text: "Merci de venir avec votre tenue de cuisine complète à chaque TP." }
      ]
    },
    {
      id: "STU-2026-0005",
      email: "youssef.idrissi@ecole-demo.ma",
      password: "demo123",
      name: "Youssef Idrissi",
      avatar: "images/avatars/avatar-5.jpg",
      program: "Infographie",
      level: "Technicien (T)",
      year: "2e année",
      campus: "ISTA Marrakech",
      points: 818,
      modules: ["Design graphique", "PAO", "Photographie", "Montage vidéo"],
      grades: { "Design graphique": 16, "PAO": 15, "Photographie": 14, "Montage vidéo": 17 },
      attendance: 87,
      announcements: [
        { title: "Rentrée universitaire", date: "2026-09-01", text: "La rentrée des T Infographie a lieu le 1er septembre en salle Mac." },
        { title: "Portfolio", date: "2026-11-20", text: "Rendu des portfolios finaux le 20 novembre. Présentation orale obligatoire." }
      ],
      exams: [
        { module: "Design graphique", date: "2026-12-09", time: "14:00", salle: "Salle Mac 1" },
        { module: "Montage vidéo", date: "2026-12-12", time: "10:00", salle: "Salle Mac 2" }
      ],
      documents: [
        { title: "Attestation d'inscription 2026-2027", type: "Attestation", date: "2026-09-10" },
        { title: "Certificat de scolarité", type: "Certificat", date: "2026-10-01" }
      ],
      messages: [
        { from: "Scolarité", date: "2026-09-19", subject: "Rendu portfolio", text: "Votre portfolio est à rendre le 20 novembre. Bonne continuation !" }
      ]
    }
  ];

  var STUDENTS = [];
  var studentsLoaded = false;

  function loadStudents() {
    return fetch("/data/students.json", { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        STUDENTS = data && data.students ? data.students : FALLBACK_STUDENTS;
        studentsLoaded = true;
      })
      .catch(function () {
        STUDENTS = FALLBACK_STUDENTS;
        studentsLoaded = true;
      });
  }

  // ---------- Auth ----------
  function currentStudent() {
    try {
      return JSON.parse(localStorage.getItem("demo_student") || "null");
    } catch (e) {
      return null;
    }
  }

  function isLoggedIn() {
    return localStorage.getItem("demo_token") === "true" && currentStudent() !== null;
  }

  function setSession(student) {
    localStorage.setItem("demo_token", "true");
    localStorage.setItem("demo_student", JSON.stringify(student));
  }

  function clearSession() {
    localStorage.removeItem("demo_token");
    localStorage.removeItem("demo_student");
    localStorage.removeItem("demo_application");
  }

  function findStudent(login) {
    return STUDENTS.find(function (s) {
      return s.email.toLowerCase() === login.toLowerCase() || s.name.toLowerCase() === login.toLowerCase();
    });
  }

  function show(el, msg, type) {
    el.textContent = msg;
    el.className = "demo-msg " + (type || "error");
    el.style.display = "block";
  }

  function hide(el) {
    el.style.display = "none";
  }

  // ---------- Application ----------
  function generateAppNumber() {
    var now = new Date();
    var y = now.getFullYear();
    var m = String(now.getMonth() + 1).padStart(2, "0");
    var d = String(now.getDate()).padStart(2, "0");
    var rnd = String(Math.floor(Math.random() * 9000 + 1000));
    return "APP-" + y + m + d + "-" + rnd;
  }

  // ---------- Router / page init ----------
  function path() {
    return window.location.pathname.toLowerCase();
  }

  function isProtectedPage() {
    var p = path();
    return p.indexOf("/dashboard") === 0 ||
           p.indexOf("/announcements") === 0 ||
           p.indexOf("/exams") === 0 ||
           p.indexOf("/documents") === 0 ||
           p.indexOf("/messages") === 0 ||
           p.indexOf("/profile") === 0;
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      localStorage.setItem("demo_return", window.location.pathname);
      window.location.href = "/login/";
    }
  }

  function redirectIfLoggedIn() {
    if (path().indexOf("/login") === 0 && isLoggedIn()) {
      var ret = localStorage.getItem("demo_return") || "/dashboard/";
      localStorage.removeItem("demo_return");
      window.location.href = ret;
    }
  }

  function init() {
    loadStudents().then(function () {
      var p = path();

      // Login page
      if (p.indexOf("/login") === 0) {
        redirectIfLoggedIn();
        initLoginPage();
        return;
      }

      // Protected pages
      if (isProtectedPage()) {
        requireAuth();
      }

      // Dashboard home
      if (p.indexOf("/dashboard") === 0) {
        initDashboardPage();
      }

      // Announcements
      if (p.indexOf("/announcements") === 0) {
        initListPage("announcements", "Annonces");
      }
      // Exams
      if (p.indexOf("/exams") === 0) {
        initListPage("exams", "Examens à venir");
      }
      // Documents
      if (p.indexOf("/documents") === 0) {
        initListPage("documents", "Documents et certificats");
      }
      // Messages
      if (p.indexOf("/messages") === 0) {
        initListPage("messages", "Messages");
      }
      // Profile
      if (p.indexOf("/profile") === 0) {
        initProfilePage();
      }

      // Application form
      if (p.indexOf("/apply") === 0 && p.indexOf("/apply/confirmation") !== 0 && p.indexOf("/apply/payment") !== 0) {
        initApplyPage();
      }
      // Payment
      if (p.indexOf("/apply/payment") === 0) {
        initPaymentPage();
      }
      // Confirmation
      if (p.indexOf("/apply/confirmation") === 0) {
        initConfirmationPage();
      }

      // Logout links
      var logoutLinks = document.querySelectorAll("[data-demo-logout]");
      logoutLinks.forEach(function (el) {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          clearSession();
          window.location.href = "/";
        });
      });
    });
  }

  // ---------- Login page ----------
  function initLoginPage() {
    var form = document.getElementById("demo-login-form");
    var msg = document.getElementById("demo-login-msg");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hide(msg);
      var login = document.getElementById("demo-login").value.trim();
      var password = document.getElementById("demo-password").value;

      if (!login || !password) {
        show(msg, "Veuillez remplir l'identifiant et le mot de passe.", "error");
        return;
      }

      var student = findStudent(login);
      if (!student || student.password !== password) {
        show(msg, "Identifiant ou mot de passe incorrect. Essayez les identifiants démo ci-dessous.", "error");
        return;
      }

      setSession(student);
      var ret = localStorage.getItem("demo_return") || "/dashboard/";
      localStorage.removeItem("demo_return");
      window.location.href = ret;
    });
  }

  // ---------- Dashboard ----------
  function initDashboardPage() {
    var student = currentStudent();
    if (!student) return;
    document.getElementById("demo-student-name").textContent = student.name;
    document.getElementById("demo-student-program").textContent = student.program + " — " + student.level;
    document.getElementById("demo-student-year").textContent = student.year + " · " + student.campus;
    document.getElementById("demo-student-points").textContent = student.points;
    document.getElementById("demo-student-attendance").textContent = student.attendance + "%";
    renderAvatar("demo-student-avatar", student.name);

    // Progress bars for grades
    var container = document.getElementById("demo-grades");
    if (container && student.modules) {
      container.innerHTML = "";
      student.modules.forEach(function (mod) {
        var grade = student.grades && student.grades[mod] !== undefined ? student.grades[mod] : 0;
        var pct = Math.round((grade / 20) * 100);
        var item = document.createElement("div");
        item.className = "demo-grade";
        item.innerHTML =
          '<div class="demo-grade-row"><span class="demo-grade-mod">' + escapeHtml(mod) + '</span>' +
          '<span class="demo-grade-val">' + grade + ' / 20</span></div>' +
          '<div class="demo-progress"><div class="demo-progress-bar" style="width:' + pct + '%"></div></div>';
        container.appendChild(item);
      });
    }

    // Weekly timetable
    renderTimetable(student);

    // Announcements / exams / documents / messages (lazy lists)
    renderSimpleList("demo-announcements", student.announcements, function (a) {
      return '<strong>' + escapeHtml(a.title) + '</strong> — ' + escapeHtml(a.date) + '<br><small>' + escapeHtml(a.text) + '</small>';
    });
    renderSimpleList("demo-exams", student.exams, function (e) {
      return escapeHtml(e.module) + ' — ' + escapeHtml(e.date) + ' ' + escapeHtml(e.time) + ' — ' + escapeHtml(e.salle);
    });
    renderSimpleList("demo-documents", student.documents, function (d) {
      return escapeHtml(d.title) + ' <span class="demo-badge">' + escapeHtml(d.type) + '</span> — ' + escapeHtml(d.date);
    });
    renderSimpleList("demo-messages", student.messages, function (m) {
      return '<strong>' + escapeHtml(m.from) + '</strong> — ' + escapeHtml(m.subject) + '<br><small>' + escapeHtml(m.text) + '</small>';
    });
  }

  function renderTimetable(student) {
    // Generic weekly timetable (fake but realistic)
    var days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var tbody = document.getElementById("demo-timetable");
    if (!tbody) return;
    tbody.innerHTML = "";
    // Build a schedule based on modules
    var mods = student.modules || [];
    var schedule = [
      ["08:00–10:00", mods[0] || "—", mods[2] || "—", mods[1] || "—", mods[3] || "—", "Atelier"],
      ["10:15–12:15", mods[1] || "—", mods[3] || "—", mods[0] || "—", mods[2] || "—", "Projet"],
      ["13:30–15:30", mods[2] || "—", mods[0] || "—", mods[3] || "—", mods[1] || "—", "—"],
      ["15:45–17:45", "—", "—", mods[1] || "—", mods[2] || "—", "—"]
    ];
    days.forEach(function (day, di) {
      var tr = document.createElement("tr");
      var tdDay = document.createElement("td");
      tdDay.className = "demo-day";
      tdDay.textContent = day;
      tr.appendChild(tdDay);
      schedule.forEach(function (row) {
        var td = document.createElement("td");
        td.textContent = row[di + 1];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function renderSimpleList(id, items, tpl) {
    var el = document.getElementById(id);
    if (!el || !items) return;
    el.innerHTML = "";
    items.forEach(function (item) {
      var div = document.createElement("div");
      div.className = "demo-item";
      div.innerHTML = tpl(item);
      el.appendChild(div);
    });
  }

  function initProfilePage() {
    var student = currentStudent();
    if (!student) return;
    document.getElementById("demo-profile-name").textContent = student.name;
    document.getElementById("demo-profile-email").textContent = student.email;
    document.getElementById("demo-profile-id").textContent = student.id;
    document.getElementById("demo-profile-program").textContent = student.program;
    document.getElementById("demo-profile-level").textContent = student.level;
    document.getElementById("demo-profile-year").textContent = student.year;
    document.getElementById("demo-profile-campus").textContent = student.campus;
    renderAvatar("demo-profile-avatar", student.name);
  }

  function initListPage(key, title) {
    var student = currentStudent();
    if (!student) return;
    var h2 = document.querySelector(".demo-page-title");
    if (h2) h2.textContent = title;
    renderSimpleList("demo-list", student[key] || [], function (item) {
      if (key === "announcements") {
        return '<strong>' + escapeHtml(item.title) + '</strong> <span class="demo-badge">' + escapeHtml(item.date) + '</span><br>' + escapeHtml(item.text);
      }
      if (key === "exams") {
        return escapeHtml(item.module) + ' — ' + escapeHtml(item.date) + ' ' + escapeHtml(item.time) + ' — <span class="demo-badge">' + escapeHtml(item.salle) + '</span>';
      }
      if (key === "documents") {
        return escapeHtml(item.title) + ' <span class="demo-badge">' + escapeHtml(item.type) + '</span> — ' + escapeHtml(item.date);
      }
      if (key === "messages") {
        return '<strong>' + escapeHtml(item.from) + '</strong> — ' + escapeHtml(item.subject) + '<br><small>' + escapeHtml(item.text) + '</small>';
      }
      return escapeHtml(String(item));
    });
  }

  // ---------- Application form ----------
  function initApplyPage() {
    var form = document.getElementById("demo-apply-form");
    var msg = document.getElementById("demo-apply-msg");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hide(msg);
      var app = {
        fullname: document.getElementById("demo-app-fullname").value.trim(),
        email: document.getElementById("demo-app-email").value.trim(),
        phone: document.getElementById("demo-app-phone").value.trim(),
        cin: document.getElementById("demo-app-cin").value.trim(),
        dob: document.getElementById("demo-app-dob").value,
        program: document.getElementById("demo-app-program").value,
        level: document.getElementById("demo-app-level").value,
        documents: []
      };
      var files = document.getElementById("demo-app-docs").files;
      for (var i = 0; i < files.length; i++) app.documents.push(files[i].name);

      if (!app.fullname || !app.email || !app.program || !app.level) {
        show(msg, "Veuillez remplir tous les champs obligatoires.", "error");
        return;
      }
      if (!document.getElementById("demo-app-terms").checked) {
        show(msg, "Vous devez accepter les conditions d'utilisation démo.", "error");
        return;
      }

      app.number = generateAppNumber();
      app.date = new Date().toISOString();
      localStorage.setItem("demo_application", JSON.stringify(app));
      window.location.href = "/apply/payment/";
    });
  }

  // ---------- Payment ----------
  function initPaymentPage() {
    var form = document.getElementById("demo-payment-form");
    var msg = document.getElementById("demo-payment-msg");
    var app = JSON.parse(localStorage.getItem("demo_application") || "null");
    if (!app) {
      window.location.href = "/apply/";
      return;
    }
    document.getElementById("demo-pay-appno").textContent = app.number;
    document.getElementById("demo-pay-name").textContent = app.fullname;
    document.getElementById("demo-pay-program").textContent = app.program + " (" + app.level + ")";
    document.getElementById("demo-pay-amount").textContent = "950,00 DH";

    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hide(msg);
      // Always succeeds — fake demo payment
      var receipt = {
        appNumber: app.number,
        amount: "950,00 DH",
        method: document.querySelector('input[name="demo-pay-method"]:checked').value || "card",
        date: new Date().toISOString(),
        status: "succès (démo)"
      };
      localStorage.setItem("demo_receipt", JSON.stringify(receipt));
      window.location.href = "/apply/confirmation/";
    });
  }

  // ---------- Confirmation ----------
  function initConfirmationPage() {
    var app = JSON.parse(localStorage.getItem("demo_application") || "null");
    var receipt = JSON.parse(localStorage.getItem("demo_receipt") || "null");
    if (!app) {
      window.location.href = "/apply/";
      return;
    }
    document.getElementById("demo-conf-appno").textContent = app.number;
    document.getElementById("demo-conf-name").textContent = app.fullname;
    document.getElementById("demo-conf-program").textContent = app.program + " (" + app.level + ")";
    document.getElementById("demo-conf-date").textContent = new Date(app.date).toLocaleDateString("fr-FR");
    if (receipt) {
      document.getElementById("demo-conf-receipt").style.display = "block";
      document.getElementById("demo-conf-receipt-no").textContent = receipt.appNumber;
      document.getElementById("demo-conf-receipt-amount").textContent = receipt.amount;
      document.getElementById("demo-conf-receipt-date").textContent = new Date(receipt.date).toLocaleDateString("fr-FR");
      document.getElementById("demo-conf-receipt-method").textContent = receipt.method;
    }
  }

  // ---------- Helpers ----------
  function renderAvatar(id, name) {
    var el = document.getElementById(id);
    if (!el) return;
    var initials = String(name || "")
      .split(/\s+/)
      .map(function (w) { return w.charAt(0); })
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";
    el.innerHTML = '<div class="demo-avatar-initials" role="img" aria-label="' + escapeHtml(name) + '">' + initials + '</div>';
  }

  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  init();
})();
