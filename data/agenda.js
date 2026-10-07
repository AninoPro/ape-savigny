// Prochains rendez-vous de l'APE : c'est le seul fichier à modifier pour mettre l'agenda à jour.
//
// Pour ajouter un rendez-vous, copiez un bloc { ... }, ajoutez une virgule après le précédent, puis remplissez :
//   date    : "AAAA-MM-JJTHH:MM" (avec l'heure) ou "AAAA-MM-JJ" (toute la journée)
//   titre   : le nom du rendez-vous
//   lieu    : où ça se passe (facultatif)
//   details : une ou deux phrases (facultatif)
//   etiquette : petite étiquette colorée au-dessus du titre (facultatif)
//   lien    : adresse d'une page, par exemple l'événement Facebook (facultatif)
//   lienTexte : texte du lien, « Plus d'informations » par défaut (facultatif)
//
// Les rendez-vous passés disparaissent tout seuls. L'ordre n'a pas d'importance.
window.APE_AGENDA = [
  {
    date: "2026-10-12",
    titre: "Distribution des flyers de commande",
    etiquette: "Choix et prix sur le site",
    details: "Les flyers pour commander sapins et fromages sont distribués à l'école. Les choix et les prix sont aussi consultables ici. Date limite de commande : 10 novembre.",
    lien: "#prix-vente-sapins",
    lienTexte: "Voir les choix et les prix"
  },
  {
    date: "2026-11-10",
    titre: "Date limite de commande",
    details: "Dernier jour pour passer commande de sapins et de fromages."
  },
  {
    date: "2026-11-20",
    titre: "Distribution des fromages",
    lieu: "Savigny-sur-Braye",
    details: "Les fromages commandés arrivent le 20 novembre et sont distribués dans la foulée."
  },
  {
    date: "2026-12-04",
    titre: "Livraison des sapins",
    lieu: "Savigny-sur-Braye",
    details: "Livraison des sapins de Noël commandés."
  }
];
