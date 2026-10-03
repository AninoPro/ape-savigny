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
      var body = el("div", "event-body");
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
