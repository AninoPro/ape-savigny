// Affiche le prochain rendez-vous de data/agenda.js dans la carte « Prochaine réunion ».
(function () {
  var target = document.getElementById("prochaine-reunion");
  var hero = document.getElementById("hero-next");
  var agenda = window.APE_AGENDA;
  if (!target || !Array.isArray(agenda)) return;

  var now = new Date();
  var next = agenda
    .map(function (e) { return { e: e, d: new Date(e.date) }; })
    .filter(function (x) { return !isNaN(x.d) && x.d.getTime() + 3 * 3600 * 1000 > now.getTime(); })
    .sort(function (a, b) { return a.d - b.d; })[0];
  if (!next) return;

  var day = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(next.d);
  var hour = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(next.d).replace(":", "h").replace(/h00$/, "h");

  function p(text, cls) {
    var el = document.createElement("p");
    if (cls) el.className = cls;
    el.textContent = text;
    return el;
  }
  target.textContent = "";
  var time = document.createElement("time");
  time.setAttribute("datetime", next.e.date);
  time.className = "date";
  time.style.display = "block";
  time.textContent = day;
  target.appendChild(time);
  target.appendChild(p(hour + (next.e.lieu ? " · " + next.e.lieu : "")));
  if (next.e.titre) target.appendChild(p(next.e.titre));
  if (next.e.details) target.appendChild(p(next.e.details));

  if (hero) {
    hero.textContent = "";
    var strong = document.createElement("strong");
    strong.textContent = "Prochaine réunion : " + day;
    hero.appendChild(strong);
    hero.appendChild(document.createTextNode(hour + (next.e.lieu ? " · " + next.e.lieu.split(",")[0] : "")));
    hero.hidden = false;
  }
})();
