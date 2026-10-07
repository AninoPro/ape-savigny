# Site de l'APE de Savigny-sur-Braye

Site statique (HTML, CSS, un peu de JavaScript). Pas de build, pas de dépendance, pas de cookies.

## Modifier le site

- **Mettre à jour l'agenda** (section « Prochains rendez-vous », carte d'accueil, carte « Rejoindre ») : uniquement `data/agenda.js`. Copier un bloc, changer la date, le titre, le lieu. Les dates passées disparaissent seules, et sans rendez-vous futur la section renvoie vers Facebook.
- **Ajouter des photos d'un événement** (section « Une année avec l'APE ») :
  1. Ranger les photos dans `photos/<evenement>/<annee>/`, par exemple `photos/kermesse/2026/`. Ce dossier contient les originaux et n'est **pas publié** (il est dans `.gitignore`).
  2. Lancer `python3 scripts/photos.py` (nécessite Pillow : `pip3 install Pillow`). Le script numérote les photos, crée les versions WebP dans `assets/img/albums/` et affiche un bloc à coller dans `data/albums.js`.
  3. Dans `data/albums.js`, remplir le titre, la date et une description par photo. `evenement` indique sous quel événement l'album s'affiche : il doit correspondre à un `data-album="…"` d'index.html (`vente-sapins`, `marche-noel`, `classe-neige`, `carnabal`, `ventes-printemps`, `fete-du-jeu`, `kermesse`). Quand un événement a plusieurs albums (plusieurs années), toutes les photos sont regroupées, les plus récentes d'abord.
  4. Chaque album a un lien direct à partager, par exemple `https://ape-savigny.fr/#album-kermesse-2025`.
- **Retirer une photo** : supprimer l'original dans `photos/`, ses deux fichiers WebP dans `assets/img/albums/<album>/`, et sa description dans `data/albums.js`. Les photos suivantes ne sont pas renumérotées : renommer les fichiers à la main ou supprimer plutôt la dernière.
- **Présenter l'équipe** (page `equipe.html`) : uniquement `data/equipe.js`. Photo de groupe dans `photos/equipe/<annee>.jpg`, portraits dans `photos/equipe/membres/<prenom>.jpg`, puis `python3 scripts/photos.py`. Chaque membre : prénom, rôle, et au choix nom, photo, métier, enfants à l'école, petite présentation. Sans membre renseigné, la page affiche la photo de groupe et un message d'attente.
- **Changer un texte** : `index.html`. Chaque section est commentée.
- **Couleurs et polices** : variables en haut de `assets/css/style.css`.
- **Tester en local** : `python3 -m http.server 8000` puis ouvrir http://localhost:8000.

## Mettre en ligne (GitHub Pages)

1. Dépôt GitHub public, puis **Settings > Pages > Deploy from a branch > `main` / `(root)`**.
2. Avant le domaine, le site est visible sur `https://<compte>.github.io/<dépôt>/`.
3. Quand le DNS OVH est prêt : créer un fichier `CNAME` à la racine contenant `ape-savigny.fr` (il est volontairement absent pour que le lien de prévisualisation fonctionne). Dans **Settings > Pages > Custom domain**, saisir `ape-savigny.fr`, puis cocher **Enforce HTTPS** quand c'est possible.

## Domaine chez OVH (zone DNS)

Ajouter ces enregistrements (et supprimer les anciens `A`/`AAAA` du domaine nu s'il y en a) :

| Type | Sous-domaine | Cible |
|---|---|---|
| A | (vide) | 185.199.108.153 |
| A | (vide) | 185.199.109.153 |
| A | (vide) | 185.199.110.153 |
| A | (vide) | 185.199.111.153 |
| CNAME | www | `<compte>.github.io.` |

La propagation prend de quelques minutes à quelques heures. Vérifier les IP sur la documentation GitHub Pages avant de les saisir.

## Contenu à vérifier avant publication définitive

- Le calendrier « Une année avec l'APE » est tiré des publications Facebook des dernières années : confirmer les mois.
- Albums photos : les photos reçues sur WhatsApp où des enfants sont reconnaissables ont été écartées dans `photos/_ecartees/` (non publié). Les remettre uniquement avec autorisation écrite des représentants légaux. Les adultes reconnaissables (bénévoles, équipe 2026-2027) : à confirmer avec les personnes concernées.
- Photos (`assets/img/`) : issues de la page Facebook de l'APE. Aucun gros plan d'enfant n'a été retenu. Ajouter des photos d'enfants uniquement avec autorisation écrite des représentants légaux. Les images sont en WebP, 1400 px max : convertir de la même façon pour en ajouter.
- Les anciennes images de la mosaïque « L'APE en images » et des tuiles d'« Une année avec l'APE » (`benevoles-stand`, `sapins-camion`, `stand-marche`, `kermesse-saloon`, `illu-noel`, `muffins`, `brioches-quiches`, `sapins-pile`, `pere-noel-train`, `kermesse-tipis`) ne sont plus affichées : elles peuvent être supprimées ou réutilisées.
- Page équipe : ne publier un nom, un portrait, un métier ou une information sur les enfants qu'avec l'accord écrit de la personne, et retirer sur simple demande. Conseil : indiquer la classe des enfants sans leur prénom. La page est en `noindex` pour ne pas remonter dans les moteurs de recherche.
- Mentions légales (`mentions-legales.html`) : à mettre à jour après l'élection du bureau (directeur ou directrice de la publication = président(e) en exercice) et à chaque changement de siège, de téléphone ou d'hébergeur.
