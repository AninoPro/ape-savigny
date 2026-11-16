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
//   image   : une image très pâle en fond de carte, rangée dans assets/img/agenda/ (facultatif)
//   bouton  : true pour afficher le lien comme un bouton (facultatif)
//
// Les rendez-vous passés disparaissent tout seuls. L'ordre n'a pas d'importance.
window.APE_AGENDA = [
  {
    date: "2026-11-13",
    titre: "Vente de chocolats de Noël de la maternelle",
    image: "assets/img/agenda/chocolats-noel-2026.webp",
    details: "Les Chocolats du Cœur, au profit de la coopérative scolaire de la maternelle. Commande en ligne avant le 13 novembre, ou avec le catalogue distribué à l'école.",
    lien: "https://asso.initiatives.fr/q/ALHNLH",
    lienTexte: "Commandez ici",
    bouton: true
  },
  {
    date: "2026-11-23",
    titre: "Distribution des fromages",
    lieu: "Savigny-sur-Braye",
    details: "Les fromages commandés arrivent le 23 novembre et sont distribués dans la foulée."
  },
  {
    date: "2026-11-30",
    titre: "Brioches et purées de fruits : date limite de commande",
    etiquette: "Choix et prix sur le site",
    details: "Dernier jour pour rapporter à l'école le bon de commande des brioches de Vendrennes et des gourdes de purée de fruits, avec le règlement.",
    lien: "#prix-vente-sapins-brioches",
    lienTexte: "Voir les choix et les prix"
  },
  {
    date: "2026-12-19T14:00",
    titre: "Marché de Noël de Savigny",
    etiquette: "Stand de l'APE et petit train",
    details: "Retrouvez le stand de l'APE de 14 h à 17 h 30 et la balade en petit train pour les enfants de 15 h à 17 h 30. Les brioches et purées de fruits commandées sont à récupérer sur le stand."
  },
  {
    date: "2026-12-04",
    titre: "Livraison des sapins",
    lieu: "Savigny-sur-Braye",
    details: "Livraison des sapins de Noël commandés."
  },
  {
    date: "2027-05-14",
    titre: "Fête du jeu",
    lieu: "Savigny-sur-Braye",
    details: "L'APE tient la buvette et la restauration."
  },
  {
    date: "2027-06-26",
    titre: "Kermesse de fin d'année",
    details: "Stands de jeux, tombola et repas le soir : les élèves finissent l'année en fête."
  }
];
