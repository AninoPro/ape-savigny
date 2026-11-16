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
      id: "brioches",
      evenement: "vente-sapins",
      titre: "Brioches et purées de fruits",
      intro: "Des brioches de Vendrennes (à conserver 21 jours, ou à congeler) et des purées de fruits Millefruits en gourdes de 90 g, sans sucres ajoutés, sans arômes ajoutés et sans conservateurs.",
      commandeAvant: "2026-11-30",
      livraison: "2026-12-19",
      lieu: "de 14 h à 17 h 30, au marché de Noël de Savigny",
      bon: "assets/bons/bon-commande-brioches-2026.pdf",
      produits: [
        { nom: "Brioche L'originale", formats: [["350 g", 4], ["700 g", 5.5]] },
        { nom: "Brioche aux pépites de chocolat", formats: [["400 g", 5]] },
        { nom: "Gâche pur beurre (nouveau)", formats: [["500 g", 5.5]] },
        { nom: "Purée de pomme", formats: [["Carton de 50 gourdes", 20]] },
        { nom: "Purée de pomme et poire", formats: [["Carton de 50 gourdes", 25]] },
        { nom: "Purée de pomme et fraise", formats: [["Carton de 50 gourdes", 25]] },
        { nom: "Purée de pomme et banane", formats: [["Carton de 50 gourdes", 25]] },
        { nom: "Panachage de purées", formats: [["8 étuis de 12 gourdes (96 gourdes) : 3 pomme, 3 pomme-poire, 3 pomme-fraise, 3 pomme-banane", 45]] }
      ],
      note: "Les gourdes se conservent 15 mois. Les chèques sont encaissés à la livraison."
    }
  ]
};
