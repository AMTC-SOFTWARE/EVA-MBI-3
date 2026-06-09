# Configuration file for the Sphinx documentation builder.

import os
import sys

# Permite que Sphinx encuentre los módulos del proyecto
sys.path.insert(0, os.path.abspath('..'))

# -- Project information -----------------------------------------------------

project = 'EVA-MBI-3'
copyright = '2026, AMTC'
author = 'AMTC'
release = '1.0'

# -- General configuration ---------------------------------------------------

extensions = [
    'sphinx.ext.autodoc',      # Docstrings automáticos
    'sphinx.ext.napoleon',     # Google style docstrings
    'sphinx.ext.viewcode',     # Ver código fuente
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'es'
nitpicky = True

# Mostrar tipos en la descripción
autodoc_typehints = "description"

# Ordenar miembros según aparecen en el código
autodoc_member_order = 'bysource'

# Incluir __init__ en la documentación
autoclass_content = 'both'

# -- Options for HTML output -------------------------------------------------

html_theme = 'sphinx_rtd_theme'

html_static_path = ['_static']