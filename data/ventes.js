// Ventes de l'APE : choix et prix consultables depuis « Une année avec l'APE » (bouton sous l'événement, puis tiroir).
// C'est le seul fichier à modifier pour mettre les prix à jour. Le site ne prend pas de commande :
// les familles commandent avec le bon papier distribué à l'école.
//
// Chaque vente :
//   id           : identifiant court, sert au lien direct (#prix-sapins)
//   evenement    : l'événement sous lequel la vente s'affiche, tel qu'écrit dans data-album="…" dans index.html
//   titre        : le nom de la vente
//   intro        : une phrase de présentation (facultatif)
//   commandeAvant: dernier jour de commande, "AAAA-MM-JJ". Une fois passé, le site indique que les commandes sont closes
//                  et présente les prix comme ceux de la dernière vente.
//   livraison    : jour de livraison ou de distribution, "AAAA-MM-JJ" (facultatif)
//   lieu         : où récupérer la commande (facultatif)
//   grille       : un tableau de prix (tailles en lignes, variétés en colonnes)…
//   produits     : … ou une liste de produits, chacun avec ses formats [format, prix]
//   options      : suppléments [libellé, prix] (facultatif)
//   note         : une remarque affichée en bas (facultatif)
//   bon          : le bon de commande à télécharger, en PDF, rangé dans assets/bons/ (facultatif).
//                  Proposé seulement tant que les commandes sont ouvertes.
//
// Prix en euros, sans le signe €.
window.APE_VENTES = {
  reglement: "En espèces ou par chèque à l'ordre de l'APE de Savigny-sur-Braye.",
  ventes: [
    {
      id: "sapins",
      evenement: "vente-sapins",
      titre: "Sapins de Noël",
      intro: "Des sapins locaux, coupés, vendus au bénéfice des enfants des écoles de Savigny-sur-Braye.",
      commandeAvant: "2026-11-10",
      livraison: "2026-12-04",
      lieu: "entre 16 h et 17 h, sur le parking de la garderie",
      bon: "assets/bons/bon-commande-sapins-2026.pdf",
      grille: {
        legende: "Hauteur (cm)",
        colonnes: ["Épicéa", "Pungens", "Nordmann"],
        lignes: [
          ["100 – 125", 12, 17, 26],
          ["125 – 150", 13, 20, 30],
          ["150 – 175", 16, 25, 35],
          ["175 – 200", 18, 30, 41],
          ["200 – 250", 25, 42, 52],
          ["250 – 300", 34, 55, 68],
          ["300 – 400", 61, 77, 87],
          ["400 – 500", 77, null, null]
        ]
      },
      options: [
        ["Support : demi-bûche percée", 6],
        ["Livraison à domicile, à moins de 8 km de Savigny (particuliers)", 3]
      ]
    },
    {
      id: "fromages",
      evenement: "vente-sapins",
      titre: "Fromages d'Auvergne",
      intro: "Des fromages de la Ferme de l'Oiseau.",
      commandeAvant: "2026-11-10",
      livraison: "2026-11-20",
      bon: "assets/bons/bon-commande-fromages-2026.pdf",
      produits: [
        { nom: "Saint-Nectaire", formats: [["Entier, environ 1,5 kg", 28], ["Demi, 800 g", 15], ["Quart, 400 g", 8]] },
        { nom: "Cantal", formats: [["1 kg", 20], ["500 g", 11]] },
        { nom: "Salers", formats: [["1 kg", 25], ["500 g", 14]] },
        { nom: "Bleu d'Auvergne", formats: [["500 g", 12]] },
        { nom: "Fourme d'Ambert", formats: [["500 g", 12]] }
      ],
      note: "Tous les fromages sont au lait cru."
    }
  ]
};
