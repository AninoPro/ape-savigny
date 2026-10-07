#!/usr/bin/env python3
"""Prépare les photos des albums pour le site.

Les originaux (photos WhatsApp, etc.) se rangent dans photos/<evenement>/<annee>/,
par exemple photos/kermesse/2026/. Ce dossier n'est pas publié (voir .gitignore).
Un dossier dont le nom commence par « _ » est ignoré (photos/_ecartees/ par exemple).

Lancer depuis la racine du site :  python3 scripts/photos.py

Le script :
  1. renomme les nouvelles photos en 01.jpg, 02.jpg… à la suite des précédentes ;
  2. crée pour chacune, dans assets/img/albums/<evenement>-<annee>/, une version
     WebP de 1400 px max (NN.webp) et une miniature de 640 px (NN-mini.webp) ;
  3. affiche un bloc prêt à coller dans data/albums.js pour chaque nouvel album.

Le dossier photos/equipe/ est à part (section « L'équipe », data/equipe.js) :
  photos/equipe/2026-2027.jpg      -> assets/img/equipe/groupe-2026-2027.webp (photo de groupe)
  photos/equipe/membres/Julie.jpg  -> assets/img/equipe/julie.webp (portrait)

Nécessite Pillow (pip3 install Pillow).
"""
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "photos"
OUT = ROOT / "assets" / "img" / "albums"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
NUMBERED = re.compile(r"^\d{2,3}\.jpg$")


def number_new_files(folder):
    files = sorted(p for p in folder.iterdir() if p.suffix.lower() in EXTS)
    done = [p for p in files if NUMBERED.match(p.name)]
    todo = [p for p in files if not NUMBERED.match(p.name)]
    n = max((int(p.stem) for p in done), default=0)
    for p in todo:
        n += 1
        target = folder / f"{n:02d}.jpg"
        im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        im.save(target, quality=92)
        p.unlink()
        print(f"  {p.name} -> {target.name}")


def export(src, dest, size, quality):
    if dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
        return False
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    im.thumbnail((size, size), Image.LANCZOS)
    im.save(dest, "WEBP", quality=quality, method=6)
    return True


def slugify(name):
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def export_team():
    team = SRC / "equipe"
    if not team.is_dir():
        return
    print("equipe")
    dest = ROOT / "assets" / "img" / "equipe"
    dest.mkdir(parents=True, exist_ok=True)
    for p in sorted(team.iterdir()):
        if p.suffix.lower() in EXTS:
            name = f"groupe-{slugify(p.stem)}"
            export(p, dest / f"{name}.webp", 1400, 80)
            print(f"  photo de groupe : {name}")
    members = team / "membres"
    if members.is_dir():
        for p in sorted(members.iterdir()):
            if p.suffix.lower() in EXTS:
                name = slugify(p.stem)
                export(p, dest / f"{name}.webp", 900, 80)
                print(f'  portrait : photo: "{name}"')


def main():
    if not SRC.is_dir():
        sys.exit(f"Dossier introuvable : {SRC}")
    known = (ROOT / "data" / "albums.js").read_text(encoding="utf-8")
    export_team()
    for event in sorted(p for p in SRC.iterdir() if p.is_dir() and not p.name.startswith("_") and p.name != "equipe"):
        for year in sorted(p for p in event.iterdir() if p.is_dir() and not p.name.startswith("_")):
            slug = f"{event.name}-{year.name}"
            print(slug)
            number_new_files(year)
            dest = OUT / slug
            dest.mkdir(parents=True, exist_ok=True)
            photos = sorted(year.glob("*.jpg"))
            made = 0
            for p in photos:
                made += export(p, dest / f"{p.stem}.webp", 1400, 80)
                export(p, dest / f"{p.stem}-mini.webp", 640, 72)
            print(f"  {len(photos)} photos, {made} converties")
            if f'"{slug}"' not in known:
                print(f"\n  Nouvel album : à ajouter dans data/albums.js\n  {{\n"
                      f'    dossier: "{slug}",\n    evenement: "{event.name}",\n'
                      f'    titre: "",\n    date: "{year.name}",\n'
                      f"    couverture: 1,\n    photos: [\n"
                      + "".join(f'      "", // {p.stem}\n' for p in photos)
                      + "    ]\n  },\n")


if __name__ == "__main__":
    main()
