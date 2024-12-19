import os
import json

# Base directory containing the folders
BASE_DIR = "/Users/jacobbertilsson/Documents/NUXT Apps/LearningNUXT/my-nuxt-app/public/images/SvampBilder"

# Subfolders to include in the manifest
FOLDERS = ["Giftsvampar", "RödlistadeSvampar", "Matsvampar"]

manifest = {}

for folder in FOLDERS:
    folder_path = os.path.join(BASE_DIR, folder)
    if os.path.isdir(folder_path):
        # List all .jpg files in the folder
        files = [f for f in os.listdir(folder_path) if f.lower().endswith(".jpg")]
        manifest[folder] = files
    else:
        print(f"Warning: Directory not found: {folder_path}")
        manifest[folder] = []

# Write the manifest to a JSON file
manifest_path = os.path.join(BASE_DIR, "manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"manifest.json created at {manifest_path}")