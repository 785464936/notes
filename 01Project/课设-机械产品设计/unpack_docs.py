import zipfile
import os

# Create output directories
os.makedirs('unpacked_template', exist_ok=True)
os.makedirs('unpacked_current', exist_ok=True)

# Unpack template
with zipfile.ZipFile('产品设计综合实践说明书格式模板.docx', 'r') as zip_ref:
    zip_ref.extractall('unpacked_template')

# Unpack current document
with zipfile.ZipFile('课程设计说明书.docx', 'r') as zip_ref:
    zip_ref.extractall('unpacked_current')

print('Unpacking complete')