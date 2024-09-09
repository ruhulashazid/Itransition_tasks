import zipfile
import os
import hashlib

# Path to the uploaded zip file
zip_file_path = '/mnt/data/task2.zip'
extracted_folder_path = '/mnt/data/task2_extracted/'

# Extract the zip file
with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
    zip_ref.extractall(extracted_folder_path)

# Function to calculate SHA3-256 hash of a file
def calculate_sha3_256(file_path):
    sha3_256_hash = hashlib.sha3_256()
    with open(file_path, "rb") as f:
        # Read the file in chunks to handle large files
        for byte_block in iter(lambda: f.read(4096), b""):
            sha3_256_hash.update(byte_block)
    return sha3_256_hash.hexdigest()

# List to store hashes
hashes = []

# Calculate SHA3-256 for each file in the extracted folder
for root, dirs, files in os.walk(extracted_folder_path):
    for file in files:
        file_path = os.path.join(root, file)
        file_hash = calculate_sha3_256(file_path)
        hashes.append(file_hash)

# Sort hashes as strings
hashes.sort()

# Concatenate sorted hashes without any separator
concatenated_hashes = ''.join(hashes)

# Concatenate with the email in lowercase
email = "mehdi@example.com"
final_string = concatenated_hashes + email.lower()

# Calculate SHA3-256 of the final string
final_hash = hashlib.sha3_256(final_string.encode()).hexdigest()

final_hash
