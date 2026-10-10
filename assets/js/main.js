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
        var l = el("a", "", x.e.lienTexte || "Plus d'informations");
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

// L'équipe (data/equipe.js) : photo de groupe et portraits dans « Qui sommes-nous »,
// fiches détaillées dans un tiroir. Le bouton retour du téléphone ferme le tiroir.
// Liens directs : #equipe-complete (toute l'équipe) ou #equipe-<prénom>[-<nom>] (une fiche).
(function () {
  var team = window.APE_EQUIPE;
  var drawer = document.getElementById("team-drawer");
  if (!team || !drawer) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function slug(m) {
    return [m.prenom, m.nom].filter(Boolean).join(" ").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function fullName(m) { return [m.prenom, m.nom].filter(Boolean).join(" "); }
  function portrait(m, cls) {
    var pic = el("span", cls);
    if (m.photo) {
      var img = el("img");
      img.src = "assets/img/equipe/" + m.photo + ".webp";
      img.alt = "";
      img.loading = "lazy";
      pic.appendChild(img);
    } else {
      pic.textContent = (m.prenom.charAt(0) + (m.nom ? m.nom.charAt(0) : "")).toUpperCase();
    }
    pic.setAttribute("aria-hidden", "true");
    return pic;
  }

  var title = team.annee ? "L'équipe " + team.annee : "L'équipe";
  document.getElementById("team-title").textContent = title;
  document.getElementById("drawer-title").textContent = title;
  var group = document.getElementById("team-group-img");
  if (team.photoGroupe) {
    group.src = "assets/img/equipe/" + team.photoGroupe + ".webp";
    group.alt = team.photoGroupeTexte || "";
  } else group.closest("figure").remove();

  var members = (team.membres || []).filter(function (m) { return m && m.prenom; });
  if (!members.length) return;

  // Portraits dans la page : prénom et rôle
  var roster = document.getElementById("team-roster");
  var more = document.getElementById("team-more");
  members.forEach(function (m) {
    var li = el("li");
    var b = el("button", "roster-item");
    b.type = "button";
    b.appendChild(portrait(m, "roster-photo"));
    b.appendChild(el("strong", "", fullName(m)));
    if (m.role) b.appendChild(el("span", "", m.role));
    b.setAttribute("aria-label", fullName(m) + (m.role ? ", " + m.role : "") + " : voir sa présentation");
    b.addEventListener("click", function () { open(slug(m)); });
    li.appendChild(b);
    roster.appendChild(li);
  });
  roster.hidden = false;
  more.hidden = false;
  document.getElementById("team-ask").hidden = false;
  more.addEventListener("click", function () { open("complete"); });

  // Fiches détaillées dans le tiroir
  var list = document.getElementById("members-list");
  members.forEach(function (m) {
    var li = el("li", "member");
    li.id = "membre-" + slug(m);
    li.tabIndex = -1;
    li.appendChild(portrait(m, "member-photo"));
    var body = el("div", "member-body");
    if (m.role) body.appendChild(el("p", "member-role", m.role));
    body.appendChild(el("h3", "", fullName(m)));
    var facts = el("dl", "member-facts");
    [["Dans la vie", m.metier], ["À l'école", m.enfants]].forEach(function (f) {
      if (!f[1]) return;
      facts.appendChild(el("dt", "", f[0]));
      facts.appendChild(el("dd", "", f[1]));
    });
    if (facts.children.length) body.appendChild(facts);
    // Une ligne vide dans la présentation sépare deux paragraphes
    if (m.presentation) m.presentation.split(/\n\s*\n/).forEach(function (t) {
      body.appendChild(el("p", "member-text", t.trim()));
    });
    li.appendChild(body);
    list.appendChild(li);
  });

  var opener = null;
  function open(target) {
    if (!drawer.open) {
      opener = document.activeElement;
      history.pushState({ drawer: true }, "", "#equipe-" + target);
      drawer.showModal();
    }
    var card = document.getElementById("membre-" + target);
    if (card) {
      card.scrollIntoView({ block: "start" });
      card.focus({ preventScroll: true });
    } else drawer.querySelector(".members").scrollTop = 0;
  }

  drawer.querySelector(".drawer-close").addEventListener("click", function () { drawer.close(); });
  drawer.addEventListener("click", function (e) { if (e.target === drawer) drawer.close(); });
  drawer.addEventListener("close", function () {
    if (history.state && history.state.drawer) history.back();
    if (opener && opener.focus) opener.focus();
  });
  window.addEventListener("popstate", function () {
    if (drawer.open && !(history.state && history.state.drawer)) drawer.close();
  });

  var m = location.hash.match(/^#equipe-(.+)$/);
  if (m) {
    history.replaceState(null, "", "#equipe");
    document.getElementById("equipe").scrollIntoView();
    open(decodeURIComponent(m[1]));
  }
})();

// Ventes (data/ventes.js) : sous chaque événement concerné d'« Une année avec l'APE », un bouton par vente
// ouvre le tiroir des choix et des prix. Consultation seulement : on commande avec le bon papier.
// Liens directs : #prix-<evenement> (toutes les ventes de l'événement) ou #prix-<evenement>-<id>.
(function () {
  var data = window.APE_VENTES;
  var drawer = document.getElementById("sale-drawer");
  if (!data || !Array.isArray(data.ventes) || !drawer) return;

  var dayFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  var euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 2, minimumFractionDigits: 0 });
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function day(s) { return new Date(s + "T00:00"); }
  function longDay(s) { return dayFmt.format(day(s)); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function isOpen(v) { return !!v.commandeAvant && day(v.commandeAvant) >= today; }

  function section(v, eventKey) {
    var sec = el("section", "sale");
    sec.id = "prix-" + eventKey + "-" + v.id;
    sec.tabIndex = -1;
    sec.appendChild(el("h3", "", v.titre));
    if (v.intro) sec.appendChild(el("p", "sale-intro", v.intro));

    if (isOpen(v)) {
      var dates = el("dl", "sale-dates");
      dates.appendChild(el("dt", "", "Date limite"));
      dates.appendChild(el("dd", "", cap(longDay(v.commandeAvant))));
      if (v.livraison) {
        dates.appendChild(el("dt", "", "Livraison"));
        dates.appendChild(el("dd", "", cap(longDay(v.livraison)) + (v.lieu ? ", " + v.lieu : "")));
      }
      sec.appendChild(dates);
      if (v.bon) {
        var pdf = el("a", "btn btn--soft btn--small sale-download", "Télécharger le bon de commande (PDF)");
        pdf.href = v.bon;
        pdf.setAttribute("download", "");
        sec.appendChild(pdf);
      }
    } else {
      sec.appendChild(el("p", "sale-closed", "Les commandes sont closes. Voici les prix de la dernière vente, à titre indicatif."));
    }

    if (v.grille) {
      var g = v.grille;
      var wrap = el("div", "sale-grid");
      var table = el("table");
      table.appendChild(el("caption", "", "Prix des " + v.titre.toLowerCase() + " selon la hauteur et la variété"));
      var head = el("tr");
      var corner = el("th", "", g.legende || "");
      corner.scope = "col";
      head.appendChild(corner);
      g.colonnes.forEach(function (c) {
        var th = el("th", "", c);
        th.scope = "col";
        head.appendChild(th);
      });
      var thead = el("thead");
      thead.appendChild(head);
      table.appendChild(thead);
      var tbody = el("tbody");
      g.lignes.forEach(function (row) {
        var tr = el("tr");
        var th = el("th", "", row[0]);
        th.scope = "row";
        tr.appendChild(th);
        row.slice(1).forEach(function (p) { tr.appendChild(el("td", "", p == null ? "–" : euro.format(p))); });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      wrap.appendChild(table);
      sec.appendChild(wrap);
    }

    if (v.produits) {
      var list = el("ul", "sale-products");
      v.produits.forEach(function (p) {
        var li = el("li");
        li.appendChild(el("h4", "", p.nom));
        var rows = el("dl");
        p.formats.forEach(function (f) {
          rows.appendChild(el("dt", "", f[0]));
          rows.appendChild(el("dd", "", euro.format(f[1])));
        });
        li.appendChild(rows);
        list.appendChild(li);
      });
      sec.appendChild(list);
    }

    if (v.options && v.options.length) {
      var opts = el("div", "sale-options");
      opts.appendChild(el("h4", "", "En option"));
      var dl = el("dl");
      v.options.forEach(function (o) {
        dl.appendChild(el("dt", "", o[0]));
        dl.appendChild(el("dd", "", euro.format(o[1])));
      });
      opts.appendChild(dl);
      sec.appendChild(opts);
    }
    if (v.note) sec.appendChild(el("p", "sale-note", v.note));
    return sec;
  }

  function howTo() {
    var box = el("section", "sale-how");
    box.appendChild(el("h3", "", "Comment commander"));
    var ol = el("ol");
    [
      "Remplissez le bon de commande distribué à l'école, ou téléchargez-le et imprimez-le.",
      "Glissez-le dans une enveloppe avec le règlement et rapportez-le à l'école avant la date limite.",
      "Récupérez votre commande le jour de la livraison."
    ].forEach(function (t) { ol.appendChild(el("li", "", t)); });
    box.appendChild(ol);
    if (data.reglement) box.appendChild(el("p", "", "Règlement : " + data.reglement.charAt(0).toLowerCase() + data.reglement.slice(1)));
    var ask = el("p");
    ask.appendChild(document.createTextNode("Une question ? Écrivez-nous à "));
    var a = el("a", "", "savigny.ape@gmail.com");
    a.href = "mailto:savigny.ape@gmail.com";
    ask.appendChild(a);
    ask.appendChild(document.createTextNode("."));
    box.appendChild(ask);
    return box;
  }

  // Boutons sous chaque événement
  var byEvent = {};
  data.ventes.forEach(function (v) {
    if (!v || !v.id || !v.evenement) return;
    (byEvent[v.evenement] = byEvent[v.evenement] || []).push(v);
  });
  Object.keys(byEvent).forEach(function (key) {
    var moment = document.querySelector('.moment[data-album="' + key + '"]');
    if (!moment) { console.warn("Vente : aucun événement data-album=\"" + key + "\" dans index.html"); return; }
    var ventes = byEvent[key];
    var text = moment.querySelector(".moment-text");
    var open = ventes.filter(isOpen).map(function (v) { return v.commandeAvant; }).sort()[0];
    if (open) {
      var tag = el("p", "moment-tag", "Commandes jusqu'au " + longDay(open).replace(/^\S+ /, ""));
      text.insertBefore(tag, text.firstChild);
    }
    var box = el("div", "moment-sales");
    ventes.forEach(function (v) {
      var b = el("button", "btn btn--soft btn--small");
      b.type = "button";
      b.textContent = v.titre;
      b.setAttribute("aria-label", v.titre + " : voir les choix et les prix");
      b.addEventListener("click", function () { show(key, v.id); });
      box.appendChild(b);
    });
    var label = el("p", "moment-sales-label", "Voir les choix et les prix");
    label.setAttribute("aria-hidden", "true");
    text.appendChild(label);
    text.appendChild(box);
  });

  // Tiroir
  var body = document.getElementById("sales-body");
  var title = document.getElementById("sale-title");
  var opener = null;

  function show(key, id) {
    var ventes = byEvent[key];
    if (!ventes) return false;
    body.textContent = "";
    var notice = el("p", "sale-notice", "Pas de commande en ligne : ces prix sont donnés pour vous aider à remplir le bon de commande papier, qui fait foi.");
    body.appendChild(notice);
    ventes.forEach(function (v) { body.appendChild(section(v, key)); });
    body.appendChild(howTo());
    title.textContent = ventes.length > 1 ? "Choix et prix" : ventes[0].titre;
    if (!drawer.open) {
      opener = document.activeElement;
      if (!(history.state && history.state.prix)) history.pushState({ prix: true }, "", "#prix-" + key + (id ? "-" + id : ""));
      drawer.showModal();
    }
    var target = id && document.getElementById("prix-" + key + "-" + id);
    if (target && ventes.length > 1) {
      target.scrollIntoView({ block: "start" });
      target.focus({ preventScroll: true });
    } else body.scrollTop = 0;
    return true;
  }

  drawer.querySelector(".drawer-close").addEventListener("click", function () { drawer.close(); });
  drawer.addEventListener("click", function (e) { if (e.target === drawer) drawer.close(); });
  drawer.addEventListener("close", function () {
    if (history.state && history.state.prix) history.back();
    if (opener && opener.focus) opener.focus();
  });
  window.addEventListener("popstate", function () {
    if (drawer.open && !(history.state && history.state.prix)) drawer.close();
  });

  // Lien direct, au chargement ou depuis un lien de la page (agenda)
  function fromHash() {
    var m = location.hash.match(/^#prix-(.+)$/);
    if (!m || drawer.open) return;
    var rest = decodeURIComponent(m[1]);
    var key = Object.keys(byEvent).filter(function (k) { return rest === k || rest.indexOf(k + "-") === 0; })[0];
    if (!key) return;
    if (!(history.state && history.state.prix)) history.replaceState(null, "", "#projets");
    document.getElementById("projets").scrollIntoView();
    show(key, rest.slice(key.length + 1));
  }
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
