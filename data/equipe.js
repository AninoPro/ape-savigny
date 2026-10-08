// L'équipe de l'APE : section « L'équipe » de l'accueil (portraits) et son tiroir (fiches détaillées).
// C'est le seul fichier à modifier pour la mettre à jour.
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
//   presentation : une ou deux phrases (facultatif). Pour plusieurs paragraphes, entourez le texte
//                  de `…` (accents graves) et séparez les paragraphes par une ligne vide.
//
// Les membres s'affichent dans l'ordre de la liste.
// Ne publier que ce que chaque personne a accepté par écrit, et retirer ses informations si elle le demande.
window.APE_EQUIPE = {
  annee: "2026-2027",
  photoGroupe: "groupe-2026-2027",
  photoGroupeTexte: "Les bénévoles de l'APE pour l'année 2026-2027, réunis pour une photo de groupe.",
  membres: [
    {
      prenom: "Valérie",
      role: "Présidente",
      photo: "valerie",
      metier: "Clerc de notaire",
      enfants: "Maman d'une collégienne de 11 ans et de Jules, en CM2",
      presentation: `Membre de l'APE pour la 6e année, je suis présidente pour ma dernière année au sein de cette association qui m'a tant apporté sur le plan humain ! J'y ai rencontré de bons copains et même des amis. Être à l'APE, c'est donner un peu de temps, faire quelques réunions… mais c'est surtout donner à mes enfants un formidable exemple de solidarité et d'entraide.

En dehors de l'APE, je fais du sport, je lis pas mal, et j'aime beaucoup la déco et la mode.`
    },
    { prenom: "Cassandre", role: "Vice-présidente" },
    {
      prenom: "Thomas",
      role: "Trésorier",
      photo: "thomas",
      metier: "Développeur informatique",
      enfants: "Papa de Liliana, en petite section, dans la classe de Marianne et Romy",
      presentation: "Au quotidien je passe pas mal de temps sur l'ordinateur bien sûr pour les projets, j'adore la bidouille et faire des expériences robotiques et autre ! J'aime aussi beaucoup faire la cuisine, et j'ai plutôt intérêt parce que ma femme est une ex-championne de boxe... Je passe aussi beaucoup de temps à jouer à des jeux de société et on est toujours en recherche de partenaires si ça vous dit !"
    },
    { prenom: "Edith", role: "Vice-trésorière" },
    {
      prenom: "Adeline",
      nom: "G.",
      role: "Secrétaire",
      photo: "adeline-g",
      metier: "Assistante commerciale et logistique dans le thermoformage industriel",
      enfants: "Maman de deux enfants, en CE2 et en CM2",
      presentation: `👋 Coucou ! Moi c’est Adeline !

Je suis maman de Maël, en CM2, et d’Emma, en CE2, et ma petite famille s’est installée à Savigny-sur-Braye depuis un peu plus de six ans.

Depuis quelques années, je m’investis avec plaisir au sein de l’APE, où j’ai trouvé une vraie petite famille et de belles amitiés. J’apprécie particulièrement la bonne ambiance et la convivialité qui règnent entre nous, et je suis ravie de pouvoir contribuer, avec toute l’équipe, aux différentes actions et projets pour les enfants de l’école de Savigny.

Dans la vie professionnelle, je suis assistante commerciale et logistique dans le secteur du thermoformage industriel, notamment pour les industries agroalimentaires. Je suis également femme d’agriculteur.

C’est donc avec beaucoup de plaisir que je poursuis cette belle aventure au sein de l’APE en tant que secrétaire cette année ! 😊`
    },
    {
      prenom: "Adeline",
      nom: "R.",
      role: "Vice-secrétaire",
      photo: "adeline-r",
      metier: "Auto-entrepreneuse dans le bien-être et la connaissance de soi",
      enfants: "Maman d'un enfant en petite section, dans la classe de Camille",
      presentation: "Adeline, auto entrepreneuse dans le domaine du bien-être et de la connaissance de soi. Maman de Margaux, petite section, dans la classe de Camille. 😊"
    },
    { prenom: "Céline", role: "Membre", metier: "Animatrice d'ateliers de développement personnel", enfants: "Maman de trois enfants : un en grande section, un en moyenne section et un petit de 2 ans" },
    { prenom: "Alexia", role: "Membre", metier: "Agricultrice" },
    { prenom: "Hind", role: "Membre", metier: "Mère au foyer", enfants: "Maman d'un enfant en petite section, dans la classe de Camille" },
    {
      prenom: "Cassandra",
      role: "Membre",
      photo: "cassandra",
      metier: "Technicienne de laboratoire",
      enfants: "Maman de Liliana, en petite section, dans la classe de Marianne et Romy",
      presentation: `Je suis assez sportive et j'adore rire ! Au quotidien pour le moment je suis en recherche d'emploi parce qu'on vient de s'installer dans la région, donc j'ai beaucoup de temps à consacrer à la rénovation de notre maison et à plein d'activités. J'aime aussi la bonne cuisine et jouer aux jeux de société ! En plus contrairement à monsieur je ne suis pas mauvaise perdante 😂

Par contre je suis une ex-championne de boxe alors en garde ! 🥊`
    },
    { prenom: "Laura", role: "Membre", metier: "Assistante manager", enfants: "Maman d'un enfant en moyenne section" },
    { prenom: "Manon", role: "Membre", enfants: "Maman de deux enfants, en grande section et en petite section" },
    { prenom: "Bénédicte", role: "Membre", enfants: "Maman d'un enfant en moyenne section" },

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
