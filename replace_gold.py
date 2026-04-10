import os
import glob

replacements = {
    '#d4ac0d': '#e53935',
    '#f1c40f': '#ff5252',
    '212, 172, 13': '229, 57, 53',
    '212,172,13': '229,57,53',
    '--brand-gold': '--brand-red',
    '--gradient-gold': '--gradient-red'
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
