// Albums photos de l'APE : affichés sous chaque événement d'« Une année avec l'APE ».
//
// Pour ajouter un album :
//   1. rangez les photos dans photos/<evenement>/<annee>/ (ex. photos/kermesse/2026/) ;
//   2. lancez  python3 scripts/photos.py  : il prépare les images et affiche un bloc à coller ici ;
//   3. remplissez le bloc :
//      dossier    : nom du dossier créé dans assets/img/albums/ (ne pas modifier)
//      evenement  : l'événement sous lequel l'album s'affiche, tel qu'écrit dans data-album="…" dans index.html
//                   (vente-sapins, marche-noel, classe-neige, carnabal, ventes-printemps, fete-du-jeu, kermesse)
//      titre      : le nom de l'album, affiché dans la visionneuse
//      date       : "AAAA-MM" (ou "AAAA" si le mois n'est pas connu), sert aussi au tri
//      couverture : numéro de la photo mise en avant (pour l'album le plus récent de l'événement)
//      photos     : une description par photo, dans l'ordre (01, 02…), lue par les lecteurs d'écran
//
// Aucun enfant reconnaissable sans autorisation écrite des parents.
window.APE_ALBUMS = [
  {
    dossier: "marche-noel-2025",
    evenement: "marche-noel",
    titre: "Marché de Noël",
    date: "2025-12",
    couverture: 6,
    photos: [
      "Le tracteur et le petit train décoré attendent les enfants sur le parking.",
      "Les wagons du petit train, habillés de sapin et de guirlandes, avec le Père Noël à bord.",
      "Le Père Noël salue depuis son wagon.",
      "Un lutin et des familles devant le petit train.",
      "Le Père Noël pose avec un bénévole de l'APE.",
      "Le stand de l'APE sous sa banderole, garni de gourmandises.",
      "Des quiches emballées, prêtes à être vendues.",
      "Des brioches et des tartes sur le stand.",
      "Quatre bénévoles en tablier de l'APE et bonnet de Noël derrière le stand.",
      "Des crêpes faites maison.",
      "Des gâteaux découpés en forme de sapin.",
      "Des gâteaux en forme de sapin aux pépites de chocolat.",
      "Des muffins nappés de chocolat.",
      "Un cake au chocolat décoré de bonbons.",
      "Des tourtes tout juste sorties du four.",
      "Des brioches emballées sur le stand.",
      "Des quiches maison sur une planche en bois."
    ]
  },
  {
    dossier: "train-pere-noel-2025",
    evenement: "marche-noel",
    titre: "Le petit train se fait beau",
    date: "2025-12",
    couverture: 1,
    photos: [
      "Un wagon du petit train couvert de branches de sapin et de guirlandes argentées.",
      "La porte d'un wagon encadrée de sapin et de guirlandes rouges.",
      "Des bénévoles décorent les wagons dans le hangar.",
      "Le tracteur du petit train, orné de guirlandes et d'une grosse boule rouge.",
      "Une boule rouge accrochée aux branches de sapin.",
      "Une décoration en forme de flocon suspendue dans le sapin."
    ]
  },
  {
    dossier: "vente-sapins-2025",
    evenement: "vente-sapins",
    titre: "Vente de sapins",
    date: "2025-12",
    couverture: 3,
    photos: [
      "Un camion rempli de sapins emballés dans leur filet.",
      "Deux bénévoles portent un grand sapin emballé dans le bois.",
      "Des sapins emballés alignés contre une barrière, prêts à être livrés."
    ]
  },
  {
    dossier: "kermesse-2025",
    evenement: "kermesse",
    titre: "Kermesse far west",
    date: "2025-06",
    couverture: 4,
    photos: [
      "Des danseuses et danseurs en chapeau de cow-boy pour une danse country.",
      "Les tables et les chaises installées pour le repas du soir.",
      "Un cheval en peluche avec son lasso, pour le jeu du rodéo.",
      "Des tipis blancs plantés dans l'herbe.",
      "Deux adultes devant le château gonflable.",
      "Les tipis et les cactus en carton du décor far west.",
      "Le stand de chamboule-tout sous sa tente."
    ]
  },
  {
    dossier: "fete-du-jeu-2026",
    evenement: "fete-du-jeu",
    titre: "Fête du jeu",
    date: "2026-05",
    couverture: 1,
    photos: [
      "Des bénévoles en tablier de l'APE préparent des crêpes.",
      "Une bénévole en tablier de l'APE derrière la crêpière.",
      "Une rangée de bénévoles aux crêpières.",
      "Une bénévole retourne une crêpe.",
      "L'école de musique joue dans la cour.",
      "Les tables installées sous le préau."
    ]
  },
  {
    dossier: "fete-du-jeu-2025",
    evenement: "fete-du-jeu",
    titre: "Fête du jeu",
    date: "2025-05",
    couverture: 4,
    photos: [
      "Deux bénévoles préparent les frites en cuisine.",
      "Deux bénévoles au travail en cuisine.",
      "Deux bénévoles sourient pour un selfie.",
      "Le buffet de gâteaux et de pizzas sous le préau, avec les bénévoles en tablier."
    ]
  },
  {
    dossier: "retour-classe-neige-cm2-2026",
    evenement: "classe-neige",
    titre: "Retour de la classe de neige des CM2",
    date: "2026",
    couverture: 1,
    photos: [
      "La table du buffet, avec des gâteaux et des gobelets.",
      "Des parts de pizza maison."
    ]
  }
];
