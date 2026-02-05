#!/usr/bin/env python3
"""
Generate SystemRequirements.md from SystemRequirements.csv
This script reads the CSV file and embeds the data into the markdown file
for static GitHub Pages deployment.
"""

import csv
import os

def escape_csv_for_js(text):
    """Escape CSV data for safe inclusion in JavaScript template string."""
    # Escape backslashes first
    text = text.replace('\\', '\\\\')
    # Escape backticks
    text = text.replace('`', '\\`')
    # Escape dollar signs to prevent template literal interpolation
    text = text.replace('$', '\\$')
    return text

def read_csv_file(csv_path):
    """Read CSV file and return as escaped CSV string."""
    with open(csv_path, 'r', encoding='utf-8') as f:
        content = f.read()
    return escape_csv_for_js(content)

def generate_requirements_page(csv_path, template_path, output_path):
    """Generate the requirements page by embedding CSV data into template."""
    
    # Read the CSV file
    print(f"Reading CSV file: {csv_path}")
    csv_data = read_csv_file(csv_path)
    
    # Read the template
    print(f"Reading template: {template_path}")
    with open(template_path, 'r', encoding='utf-8') as f:
        template_content = f.read()
    
    # Replace placeholder with actual CSV data
    output_content = template_content.replace('`CSV_DATA_PLACEHOLDER`', f'`{csv_data}`')
    
    # Write output
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print("✓ Requirements page generated successfully!")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, 'SystemRequirements.csv')
    template_path = os.path.join(script_dir, 'SystemRequirements.md.template')
    output_path = os.path.join(script_dir, 'SystemRequirements.md')
    
    # Check if we're working with the template or the actual file
    if os.path.exists(template_path):
        generate_requirements_page(csv_path, template_path, output_path)
    else:
        print(f"Error: Template file not found at {template_path}")
        print("Please create SystemRequirements.md.template first")
