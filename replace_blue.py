import os
import glob

replacements = {
    '#e53935': '#2563eb',
    '#ff5252': '#60a5fa',
    '229, 57, 53': '37, 99, 235',
    '229,57,53': '37,99,235',
    '--brand-red': '--brand-blue',
    '--gradient-red': '--gradient-blue'
}

for filepath in glob.glob('C:/Users/FAIZAN/Desktop/DRC2/src/**/*.jsx', recursive=True) + glob.glob('C:/Users/FAIZAN/Desktop/DRC2/src/**/*.css', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
