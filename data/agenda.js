// Prochains rendez-vous de l'APE : c'est le seul fichier à modifier pour mettre l'agenda à jour.
//
// Pour ajouter un rendez-vous, copiez un bloc { ... }, ajoutez une virgule après le précédent, puis remplissez :
//   date    : "AAAA-MM-JJTHH:MM" (avec l'heure) ou "AAAA-MM-JJ" (toute la journée)
//   titre   : le nom du rendez-vous
//   lieu    : où ça se passe (facultatif)
//   details : une ou deux phrases (facultatif)
//   etiquette : petite étiquette colorée au-dessus du titre (facultatif)
//   lien    : adresse d'une page, par exemple l'événement Facebook (facultatif)
//
// Les rendez-vous passés disparaissent tout seuls. L'ordre n'a pas d'importance.
window.APE_AGENDA = [
  {
    date: "2026-10-12",
    titre: "Distribution des flyers de commande",
    etiquette: "Plus d'infos sur les choix bientôt !",
    details: "Les flyers pour commander sapins et fromages sont distribués. Très bientôt, les choix et les prix seront aussi consultables sur ce site. Date limite de commande : 10 novembre."
  },
  {
    date: "2026-11-10",
    titre: "Date limite de commande",
    details: "Dernier jour pour passer commande de sapins et de fromages."
  },
  {
    date: "2026-12-04",
    titre: "Livraison des sapins et fromages",
    lieu: "Savigny-sur-Braye",
    details: "Livraison des sapins de Noël et fromages commandés."
  }
];
