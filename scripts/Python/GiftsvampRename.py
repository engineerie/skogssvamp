import os
import shutil

def main():
    # Directory where the script is located
    script_dir = os.path.dirname(os.path.realpath(__file__))
    output_dir = os.path.join(script_dir, "output")

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Dictionary to keep track of filenames and their counts
    files_seen = {}

    for filename in os.listdir(script_dir):
        if filename.lower().endswith(".jpg"):
            original_path = os.path.join(script_dir, filename)

            # Skip if this is already in the output folder
            if os.path.isdir(original_path):
                continue

            # Extract the base name without extension
            base, ext = os.path.splitext(filename)

            # Clean name: take everything before the first dash
            clean_name = base.split('-', 1)[0].strip()

            # Check if we've seen this clean_name before
            if clean_name in files_seen:
                # Increment count for this name
                files_seen[clean_name] += 1
                new_filename = f"{clean_name}_{files_seen[clean_name]}{ext}"
            else:
                # First time for this clean name
                files_seen[clean_name] = 1
                new_filename = f"{clean_name}{ext}"

            new_path = os.path.join(output_dir, new_filename)

            # Move the file to the output directory with the new name
            shutil.move(original_path, new_path)
            print(f"Renamed {filename} -> {new_filename}")

if __name__ == "__main__":
    main()