#!/usr/bin/env python3
"""Update bits/images/maps/ from the map previews in a redeclipse/maps checkout, keeping thumbnails of maps since removed."""
import argparse
import pathlib
import sys

from PIL import Image

SIZE = 256
QUALITY = 85


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("maps", type=pathlib.Path, help="redeclipse/maps checkout holding <map>.png previews")
    parser.add_argument("out", type=pathlib.Path, help="thumbnail directory")
    args = parser.parse_args()

    previews = sorted(args.maps.glob("*.png"))
    if not previews:
        sys.exit(f"no map previews found in {args.maps}")

    args.out.mkdir(parents=True, exist_ok=True)
    for preview in previews:
        target = args.out / (preview.stem + ".jpg")
        with Image.open(preview) as image:
            image = image.convert("RGB")
            image.thumbnail((SIZE, SIZE), Image.LANCZOS)
            image.save(target, "JPEG", quality=QUALITY, optimize=True)

    print(f"{len(previews)} thumbnails updated in {args.out}")


if __name__ == "__main__":
    main()
