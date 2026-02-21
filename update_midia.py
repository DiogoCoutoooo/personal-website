import json

def update_midia():
    filepath = r'c:\Users\diogo\Desktop\personal-website\src\data\midia.json'
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        item_id = item.get('id')
        if not item_id:
            continue
        
        # Update top-level filename
        if 'filename' in item:
            old_filename = item['filename']
            # Extract extension from old filename or use 'extension' field
            ext = item.get('extension', 'mp4')
            if '.' in old_filename.split('/')[-1]:
                ext = old_filename.split('.')[-1]
            
            item['filename'] = f"https://media.antonioabrantes.com/{item_id}.{ext}"
        
        # Update album tracks
        if 'tracks' in item:
            for i, track in enumerate(item['tracks'], 1):
                if 'filename' in track:
                    old_filename = track['filename']
                    ext = 'mp3' # Default for tracks seems to be mp3/mp4 based on context
                    if '.' in old_filename:
                        ext = old_filename.split('.')[-1]
                    
                    track['filename'] = f"https://media.antonioabrantes.com/{item_id} - {i}.{ext}"

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    update_midia()
