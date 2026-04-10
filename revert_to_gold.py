import os
import glob

replacements = {
    '#2563eb': '#d4ac0d',
    '#60a5fa': '#f1c40f',
    '37, 99, 235': '212, 172, 13',
    '37,99,235': '212,172,13',
    '--brand-blue': '--brand-gold',
    '--gradient-blue': '--gradient-gold'
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
