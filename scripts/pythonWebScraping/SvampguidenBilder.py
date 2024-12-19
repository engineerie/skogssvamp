import os
import requests
from bs4 import BeautifulSoup

# Base URLs
listing_url = "https://svampguiden.com/matsvampar/lista/"
species_prefix = "https://svampguiden.com/art/visa/"
image_base = "https://svampguiden.com/assets/img/sg_img/sg_artbilder/"

# Create a directory to store the images
os.makedirs("mushroom_images", exist_ok=True)

# Step 1: Get all species pages
response = requests.get(listing_url)
response.raise_for_status()
soup = BeautifulSoup(response.text, 'html.parser')

# Find all links to species pages
species_links = []
for a_tag in soup.find_all('a', href=True):
    href = a_tag['href']
    if href.startswith(species_prefix):
        if href not in species_links:
            species_links.append(href)

# Step 2: For each species page, scrape title and images
for link in species_links:
    species_resp = requests.get(link)
    species_resp.raise_for_status()
    species_soup = BeautifulSoup(species_resp.text, 'html.parser')
    
    # Extract the Latin name from the title tag
    full_title = species_soup.title.get_text(strip=True)
    # The title format seems to be: "CommonName – LatinName"
    # We'll assume there's always a dash.
    if '–' in full_title:
        latin_name = full_title.split('–')[-1].strip()
    else:
        # Fallback if format differs
        latin_name = full_title.strip()
    
    # Clean latin_name for a filename
    # Replace spaces with underscores and remove problematic chars
    safe_latin_name = latin_name.replace(' ', '_').replace('/', '_')
    
    # Step 3: Find the image(s)
    # The images are likely in <img> tags. We look for img src containing the special folder.
    img_tags = species_soup.find_all('img', src=True)
    image_urls = [img['src'] for img in img_tags if "assets/img/sg_img/sg_artbilder" in img['src']]
    
    # Step 4: Download the image(s)
    # If multiple images per species, we can number them.
    for i, img_url in enumerate(image_urls, start=1):
        # Some pages might have relative URLs, ensure absolute:
        if not img_url.startswith('http'):
            img_url = requests.compat.urljoin(link, img_url)
        
        img_resp = requests.get(img_url)
        img_resp.raise_for_status()
        
        # Construct filename. If multiple images, append a number.
        filename = f"{safe_latin_name}.jpg" if len(image_urls) == 1 else f"{safe_latin_name}_{i}.jpg"
        filepath = os.path.join("mushroom_images", filename)
        
        with open(filepath, 'wb') as f:
            f.write(img_resp.content)
        
        print(f"Saved: {filepath}")