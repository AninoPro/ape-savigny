# Site de l'APE de Savigny-sur-Braye

Site statique (HTML, CSS, un peu de JavaScript). Pas de build, pas de dépendance, pas de cookies.

## Modifier le site

- **Ajouter une réunion ou un événement** : `data/agenda.js`. Les dates passées disparaissent seules.
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
- Photos (`assets/img/`) : issues de la page Facebook de l'APE. Aucun gros plan d'enfant n'a été retenu. Ajouter des photos d'enfants uniquement avec autorisation écrite des représentants légaux. Les images sont en WebP, 1400 px max : convertir de la même façon pour en ajouter.
- Les quatre bénévoles du stand (`benevoles-stand.webp`) sont reconnaissables : à confirmer avec elles et eux, sinon retirer l'image (index.html, section « L'APE en images »).
- Mentions légales (`mentions-legales.html`) : à relire par le bureau.
