// Affiche les rendez-vous de data/agenda.js : la liste « Prochains rendez-vous »,
// la carte de l'accueil et la carte « Prochain rendez-vous » de la section Rejoindre.
(function () {
  var agenda = window.APE_AGENDA;
  if (!Array.isArray(agenda)) return;

  var now = Date.now();
  var events = agenda
    .map(function (e) {
      var allDay = String(e.date).length === 10;
      var d = new Date(allDay ? e.date + "T00:00" : e.date);
      return { e: e, d: d, allDay: allDay, end: d.getTime() + (allDay ? 24 : 3) * 3600 * 1000 };
    })
    .filter(function (x) { return !isNaN(x.d) && x.end > now; })
    .sort(function (a, b) { return a.d - b.d; });

  var fmt = function (opts) { return new Intl.DateTimeFormat("fr-FR", opts); };
  var longDay = fmt({ weekday: "long", day: "numeric", month: "long" });
  var dayNum = fmt({ day: "numeric" });
  var monthShort = fmt({ month: "short" });
  var timeFmt = fmt({ hour: "2-digit", minute: "2-digit" });

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function hourOf(x) {
    return x.allDay ? "" : timeFmt.format(x.d).replace(":", "h").replace(/h00$/, "h");
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  // Liste complète
  var list = document.getElementById("agenda-list");
  if (list) {
    list.textContent = "";
    if (!events.length) {
      var empty = el("li", "event-empty");
      empty.appendChild(document.createTextNode("Aucun rendez-vous n'est annoncé pour le moment. Les prochaines dates seront publiées ici et sur "));
      var a = el("a", "", "notre page Facebook");
      a.href = "https://www.facebook.com/apesavigny/";
      a.rel = "noopener";
      empty.appendChild(a);
      empty.appendChild(document.createTextNode("."));
      list.appendChild(empty);
    }
    events.forEach(function (x) {
      var li = el("li", "event");
      var badge = el("time", "event-date");
      badge.setAttribute("datetime", x.e.date);
      badge.appendChild(el("b", "", dayNum.format(x.d)));
      badge.appendChild(el("span", "", monthShort.format(x.d)));
      var body = el("div", "event-card");
      if (x.e.etiquette) body.appendChild(el("span", "event-tag", x.e.etiquette));
      body.appendChild(el("h3", "", x.e.titre));
      var when = cap(longDay.format(x.d)) + (hourOf(x) ? " à " + hourOf(x) : "") + (x.e.lieu ? " · " + x.e.lieu : "");
      body.appendChild(el("p", "event-when", when));
      if (x.e.details) body.appendChild(el("p", "", x.e.details));
      if (x.e.lien) {
        var l = el("a", "", "Plus d'informations");
        l.href = x.e.lien;
        l.rel = "noopener";
        body.appendChild(l);
      }
      li.appendChild(badge);
      li.appendChild(body);
      list.appendChild(li);
    });
  }

  var next = events[0];
  if (!next) return;

  // Carte de l'accueil
  var hero = document.getElementById("hero-next");
  if (hero) {
    hero.textContent = "";
    hero.appendChild(el("strong", "", cap(longDay.format(next.d))));
    hero.appendChild(document.createTextNode(next.e.titre + (hourOf(next) ? " · " + hourOf(next) : "")));
    hero.hidden = false;
  }

  // Carte « Rejoindre »
  var target = document.getElementById("prochaine-reunion");
  if (target) {
    target.textContent = "";
    var time = el("time", "date", cap(longDay.format(next.d)));
    time.setAttribute("datetime", next.e.date);
    target.appendChild(time);
    target.appendChild(el("p", "", [hourOf(next), next.e.lieu].filter(Boolean).join(" · ")));
    target.appendChild(el("p", "", next.e.titre));
    if (next.e.details) target.appendChild(el("p", "", next.e.details));
  }
})();

// Photos de data/albums.js, rangées sous chaque événement d'« Une année avec l'APE »
// (attribut data-album), et visionneuse plein écran.
(function () {
  var albums = window.APE_ALBUMS;
  var viewer = document.getElementById("viewer");
  if (!Array.isArray(albums) || !viewer) return;

  var monthYear = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function when(a) {
    var d = String(a.date);
    if (d.length < 7) return d;
    var s = monthYear.format(new Date(d + "-01T12:00"));
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function src(a, i, mini) {
    var n = String(i + 1).padStart(2, "0");
    return "assets/img/albums/" + a.dossier + "/" + n + (mini ? "-mini" : "") + ".webp";
  }

  // Toutes les photos d'un événement, album le plus récent d'abord, sa couverture en tête
  function photosOf(event) {
    var list = albums
      .filter(function (a) { return a.evenement === event && a.dossier && a.photos && a.photos.length; })
      .sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
    var items = [];
    list.forEach(function (a, k) {
      var cover = Math.min(Math.max((a.couverture || 1) - 1, 0), a.photos.length - 1);
      var order = a.photos.map(function (_, i) { return i; });
      if (k === 0) order = [cover].concat(order.filter(function (i) { return i !== cover; }));
      order.forEach(function (i) {
        items.push({ album: a, big: src(a, i), mini: src(a, i, true), alt: a.photos[i] || "", label: a.titre + " · " + when(a) });
      });
    });
    return { albums: list, items: items };
  }

  var used = {};
  document.querySelectorAll(".moment[data-album]").forEach(function (moment) {
    var event = moment.dataset.album;
    var box = moment.querySelector(".moment-photos");
    var title = moment.querySelector("h3").textContent;
    var p = photosOf(event);
    used[event] = true;
    if (!p.items.length) {
      if (box && !box.children.length) { box.remove(); moment.classList.add("moment--plain"); }
      return;
    }
    moment.viewer = { title: title, items: p.items };
    box.textContent = "";
    var shown = Math.min(p.items.length, 3);
    box.className = "moment-photos moment-photos--" + shown;
    p.items.slice(0, shown).forEach(function (it, i) {
      var b = el("button");
      b.type = "button";
      var img = el("img");
      img.src = it.mini;
      img.alt = "";
      img.loading = "lazy";
      b.appendChild(img);
      var rest = p.items.length - shown;
      if (i === shown - 1 && rest > 0) b.appendChild(el("span", "moment-more", "+" + rest));
      b.setAttribute("aria-label", "Voir les photos : " + title + ", photo " + (i + 1) + " sur " + p.items.length);
      b.addEventListener("click", function () { open(moment.viewer, i); });
      box.appendChild(b);
    });
    var years = p.albums.map(function (a) { return String(a.date).slice(0, 4); })
      .filter(function (y, i, all) { return all.indexOf(y) === i; });
    var info = el("p", "moment-count", p.items.length + (p.items.length > 1 ? " photos" : " photo") + " · " + years.join(", "));
    moment.querySelector(".moment-text").appendChild(info);
  });
  albums.forEach(function (a) {
    if (!used[a.evenement]) console.warn("Album " + a.dossier + " : aucun événement data-album=\"" + a.evenement + "\" dans index.html");
  });

  // Visionneuse
  var title = document.getElementById("viewer-title");
  var meta = document.getElementById("viewer-meta");
  var big = document.getElementById("viewer-img");
  var caption = document.getElementById("viewer-caption");
  var strip = document.getElementById("viewer-strip");
  var prev = viewer.querySelector(".viewer-prev");
  var next = viewer.querySelector(".viewer-next");
  var current = null, index = 0, opener = null;

  function show(i) {
    var items = current.items, n = items.length;
    index = (i + n) % n;
    var it = items[index];
    big.src = it.big;
    big.alt = it.alt;
    caption.textContent = it.alt;
    meta.textContent = it.label + " · " + (index + 1) + "\u00a0/\u00a0" + n;
    strip.querySelectorAll("button").forEach(function (b, j) {
      if (j === index) {
        b.setAttribute("aria-current", "true");
        b.scrollIntoView({ block: "nearest", inline: "center" });
      } else b.removeAttribute("aria-current");
    });
    if (n > 1) new Image().src = items[(index + 1) % n].big;
    history.replaceState(null, "", "#album-" + it.album.dossier);
  }

  function open(v, i) {
    current = v;
    opener = document.activeElement;
    title.textContent = v.title;
    prev.hidden = next.hidden = v.items.length < 2;
    strip.textContent = "";
    v.items.forEach(function (it, j) {
      var li = el("li");
      var b = el("button");
      b.type = "button";
      b.setAttribute("aria-label", "Photo " + (j + 1) + (it.alt ? " : " + it.alt : ""));
      var t = el("img");
      t.src = it.mini;
      t.alt = "";
      t.loading = "lazy";
      b.appendChild(t);
      b.addEventListener("click", function () { show(j); });
      li.appendChild(b);
      strip.appendChild(li);
    });
    viewer.showModal();
    show(i);
  }

  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });
  viewer.querySelector(".viewer-close").addEventListener("click", function () { viewer.close(); });
  viewer.addEventListener("close", function () {
    history.replaceState(null, "", "#projets");
    if (opener && opener.focus) opener.focus();
  });
  viewer.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });

  // Balayage du doigt sur la photo
  var startX = null;
  var stage = viewer.querySelector(".viewer-stage");
  stage.addEventListener("pointerdown", function (e) { startX = e.clientX; });
  stage.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50 && current.items.length > 1) show(index + (dx < 0 ? 1 : -1));
  });

  // Lien direct vers un album : ape-savigny.fr/#album-kermesse-2025
  var m = location.hash.match(/^#album-(.+)$/);
  if (m) {
    var dossier = decodeURIComponent(m[1]);
    document.querySelectorAll(".moment[data-album]").forEach(function (moment) {
      if (!moment.viewer || current) return;
      var i = moment.viewer.items.findIndex(function (it) { return it.album.dossier === dossier; });
      if (i >= 0) { moment.scrollIntoView(); open(moment.viewer, i); }
    });
  }
})();

// Page équipe : photo de groupe et portraits de data/equipe.js (et la carte « L'équipe » de l'accueil)
(function () {
  var team = window.APE_EQUIPE;
  if (!team) return;

  var teaserYear = document.getElementById("teaser-year");
  var teaserImg = document.getElementById("teaser-img");
  if (teaserYear && team.annee) teaserYear.textContent = "L'équipe " + team.annee;
  if (teaserImg && team.photoGroupe) {
    teaserImg.src = "assets/img/equipe/" + team.photoGroupe + ".webp";
    teaserImg.alt = team.photoGroupeTexte || "";
  }

  var list = document.getElementById("members-list");
  if (!list) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  if (team.annee) {
    document.getElementById("team-year").textContent = team.annee;
    document.title = "L'équipe " + team.annee + " – APE de Savigny-sur-Braye";
  }
  var group = document.getElementById("team-group");
  if (team.photoGroupe) {
    var g = group.querySelector("img");
    g.src = "assets/img/equipe/" + team.photoGroupe + ".webp";
    g.alt = team.photoGroupeTexte || "";
  } else group.remove();

  var members = (team.membres || []).filter(function (m) { return m && m.prenom; });
  document.getElementById("members-empty").hidden = members.length > 0;

  members.forEach(function (m) {
    var name = [m.prenom, m.nom].filter(Boolean).join(" ");
    var li = el("li", "member");
    var pic = el("div", "member-photo");
    if (m.photo) {
      var img = el("img");
      img.src = "assets/img/equipe/" + m.photo + ".webp";
      img.alt = "Portrait de " + name + ".";
      img.loading = "lazy";
      pic.appendChild(img);
    } else {
      var initials = el("span", "", (m.prenom.charAt(0) + (m.nom ? m.nom.charAt(0) : "")).toUpperCase());
      initials.setAttribute("aria-hidden", "true");
      pic.appendChild(initials);
    }
    li.appendChild(pic);
    if (m.role) li.appendChild(el("p", "member-role", m.role));
    li.appendChild(el("h3", "", name));
    var facts = el("dl", "member-facts");
    [["Dans la vie", m.metier], ["À l'école", m.enfants]].forEach(function (f) {
      if (!f[1]) return;
      facts.appendChild(el("dt", "", f[0]));
      facts.appendChild(el("dd", "", f[1]));
    });
    if (facts.children.length) li.appendChild(facts);
    if (m.presentation) li.appendChild(el("p", "member-text", m.presentation));
    list.appendChild(li);
  });
})();
