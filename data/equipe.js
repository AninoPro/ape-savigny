// L'équipe de l'APE : page equipe.html. C'est le seul fichier à modifier pour la mettre à jour.
//
// Photos : rangez-les dans photos/equipe/ puis lancez  python3 scripts/photos.py
//   - photo de groupe   : photos/equipe/2026-2027.jpg     -> assets/img/equipe/groupe-2026-2027.webp
//   - photo d'un membre : photos/equipe/membres/julie.jpg -> assets/img/equipe/julie.webp
//
// Pour ajouter un membre, copiez un bloc { ... } dans la liste « membres », ajoutez une virgule
// après le précédent, puis remplissez :
//   prenom       : le prénom
//   nom          : le nom de famille (facultatif)
//   role         : le rôle dans l'APE (Présidente, Trésorier, Secrétaire adjointe, Membre actif…)
//   photo        : nom de la photo dans assets/img/equipe/, sans « .webp » (facultatif : sans photo, les initiales s'affichent)
//   metier       : son métier (facultatif)
//   enfants      : ses enfants à l'école (facultatif). Conseil : la classe sans le prénom,
//                  par exemple « Maman de deux enfants, en CE1 et en CM2 ».
//   presentation : une ou deux phrases (facultatif)
//
// Les membres s'affichent dans l'ordre de la liste.
// Ne publier que ce que chaque personne a accepté par écrit, et retirer ses informations si elle le demande.
window.APE_EQUIPE = {
  annee: "2026-2027",
  photoGroupe: "groupe-2026-2027",
  photoGroupeTexte: "Les bénévoles de l'APE pour l'année 2026-2027, réunis pour une photo de groupe.",
  membres: [
    // Exemple à copier (sans les // au début des lignes) :
    // {
    //   prenom: "Julie",
    //   nom: "",
    //   role: "Présidente",
    //   photo: "julie",
    //   metier: "Infirmière",
    //   enfants: "Maman de deux enfants, en moyenne section et en CE2",
    //   presentation: "Au bureau depuis trois ans, toujours partante pour les crêpes du Carna'bal."
    // }
  ]
};
