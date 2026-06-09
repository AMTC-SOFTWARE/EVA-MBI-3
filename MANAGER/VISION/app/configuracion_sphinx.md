# Guía de Configuración y Uso de Sphinx para Documentación de Proyectos Python

## Introducción

Sphinx es una herramienta que permite generar documentación técnica profesional a partir del código fuente Python y sus docstrings.

Esta guía describe la configuración básica utilizada para documentar proyectos como EVA-MBI-3.

---

# Instalación

## Instalar Sphinx

```bash
pip install sphinx
```

## Instalar el tema Read The Docs

```bash
pip install sphinx-rtd-theme
```

---

# Crear la estructura de documentación

Ubicarse en la raíz del proyecto.

Ejemplo:

```text
C:\xampp\htdocs\EVA-MBI-3\MANAGER\VISION\app
```

Ejecutar:

```bash
sphinx-quickstart docs
```

Esto generará una carpeta llamada:

```text
docs/
```

con toda la estructura inicial de Sphinx.

---

# Configuración de conf.py

Dentro de:

```text
docs/conf.py
```

agregar la siguiente configuración:

```python
# Configuration file for the Sphinx documentation builder.

import os
import sys

# Permite que Sphinx encuentre los módulos del proyecto
sys.path.insert(0, os.path.abspath('..'))

# -- General configuration ---------------------------------------------------

extensions = [
    'sphinx.ext.autodoc',      # Docstrings automáticos
    'sphinx.ext.napoleon',     # Soporte para Google Style Docstrings
    'sphinx.ext.viewcode',     # Permite visualizar el código fuente
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

language = 'es'
nitpicky = True

# Mostrar tipos en la descripción
autodoc_typehints = "description"

# Ordenar miembros según aparecen en el código
autodoc_member_order = 'bysource'

# Incluir documentación de __init__
autoclass_content = 'both'

# -- Options for HTML output -------------------------------------------------

html_theme = 'sphinx_rtd_theme'

html_static_path = ['_static']
```

---

# Configuración de index.rst

Dentro de:

```text
docs/index.rst
```

configurar el índice principal de acuerdo con la estructura del proyecto.

Se puede utilizar el archivo generado por Sphinx como base y agregar posteriormente los módulos deseados.

Ejemplo:

```rst
EVA-MBI-3 Documentation
=======================

.. toctree::
   :maxdepth: 2
   :caption: Contenido:

   #Por cada archivo .rst agregarlo aqui
   app
   gui
```

---

# Crear archivos .rst

Por cada módulo que se desee documentar se debe crear un archivo `.rst`.

Ejemplo:

```text
docs/
├── app.rst
├── gui.rst
└── index.rst
```

Ejemplo de `app.rst`:

```rst
Aplicación Principal
====================

.. automodule:: app
   :members:
   :undoc-members:
   :show-inheritance:
```

Ejemplo de `controller.rst`:

```rst
Controller
==========

.. automodule:: manager.controller
   :members:
   :undoc-members:
   :show-inheritance:
```

---

# Generar la documentación

Después de agregar o modificar docstrings:

Entrar a la carpeta:

```text
docs
```

y ejecutar:

Windows:

```bash
.\make.bat html
```

Linux:

```bash
make html
```

---

# Visualizar la documentación

Una vez finalizada la generación, abrir:

```text
docs/_build/html/index.html
```

Este archivo es el punto de entrada principal de la documentación generada.

---

# Buenas prácticas para Docstrings

Sphinx interpreta mejor los docstrings cuando siguen ciertas reglas.

---

## Docstring de módulo

Debe colocarse al inicio del archivo, antes de cualquier import.

Correcto:

```python
"""
Punto de entrada principal de la aplicación EVA-MBI-3.

Este módulo es responsable de:

- Crear la instancia de QApplication.
- Inicializar la interfaz gráfica principal.
- Crear el controlador principal.
"""

from gui import MainWindow
from manager import Controller
```

Incorrecto:

```python
from gui import MainWindow

"""
Texto de documentación
"""
```

---

## Docstring de clase

Debe colocarse inmediatamente después de la definición de la clase.

```python
class Login(QState):
    """
    Estado encargado de mostrar la interfaz de autenticación.

    Responsabilidades:
        - Mostrar ventana de login.
        - Capturar credenciales.
        - Preparar validación de usuario.
    """
```

---

## Docstring de métodos

Debe colocarse inmediatamente después de la definición del método.

```python
def onEntry(self, event):
    """
    Ejecuta la lógica principal al entrar al estado.

    Args:
        event:
            Evento que activó la transición.
    """
```

---

## Documentar constructores (**init**)

```python
def __init__(self, model=None, parent=None):
    """
    Inicializa el estado Login.

    Args:
        model:
            Modelo principal compartido.

        parent:
            Estado padre dentro de la máquina de estados.
    """
```

---

## Uso de listas

Sphinx interpreta correctamente listas con guiones.

```python
"""
Responsabilidades:

- Mostrar login.
- Capturar credenciales.
- Validar usuario.
"""
```

---

## Uso de bloques de código

Para mostrar comandos o ejemplos utilizar doble dos puntos (`::`).

Ejemplo:

```python
"""
PyInstaller::

    pyinstaller --noconsole --icon=icon.ico app.py

    pyinstaller --onedir --icon=icon.ico app.py
"""
```

Esto hará que Sphinx renderice el contenido como bloque de código.

---

## Rutas de Windows

Utilizar doble diagonal invertida.

Correcto:

```python
"C:\\xampp\\xampp-control.exe"
```

o

```python
r"C:\xampp\xampp-control.exe"
```

---

## Qué documentar primero

Se recomienda el siguiente orden:

1. app.py
2. Controller principal
3. Estados de la máquina de estados
4. Módulos MQTT
5. APIs
6. Modelos
7. Utilidades

---

# Recomendación para proyectos grandes

Sphinx es excelente para documentar:

* Clases
* Métodos
* Funciones
* APIs
* Estructura del código

Para documentar arquitectura, flujos de operación o máquinas de estados se recomienda complementar con diagramas Mermaid o Draw.io.

Ejemplos:

* Arquitectura MVC
* Comunicación MQTT
* Flujo de producción
* State Machines

---

# Resumen

Flujo típico de trabajo:

1. Crear o modificar docstrings.
2. Guardar cambios.
3. Ejecutar:

```bash
.\make.bat html
```

4. Abrir:

```text
docs/_build/html/index.html
```

5. Verificar la documentación generada.
