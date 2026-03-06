import os

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    content = content.replace('dark:bg-slate-950', 'dark:bg-black')
    
    if original != content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('/home/sujon/projects/HelixRT/apps/frontend'):
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            replace_in_file(os.path.join(root, file))
