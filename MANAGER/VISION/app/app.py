"""
Punto de entrada principal de la aplicación EVA-MBI-3.

Este módulo es responsable de:

- Crear la instancia de ``QApplication``.
- Inicializar la interfaz gráfica principal ``MainWindow``.
- Crear el controlador principal basado en máquina de estados.
- Conectar las señales iniciales de arranque.

Autores:
    - MS. Marco Rutiaga Quezada
    - MS. Aarón Castillo Tobías
    - MS. César Velázquez Zaldo
    - Ing. Rogelio García

Contribuidores:
    - Ing. Osvaldo Garza
    - Ing. Roberto Lugo

Notas:
    Comandos utilizados para generar el ejecutable y configurar
    la experiencia de usuario.

PyInstaller::

    pyinstaller --noconsole --icon=icon.ico --add-data data;data --noconfirm app.py
    pyinstaller --icon=icon.ico --add-data data;data --noconfirm app.py
    pyinstaller --onedir --icon=icon.ico --contents-directory "." --add-data data;data app.py
    python -m PyInstaller --icon=icon.ico --add-data data;data app.py

Configuración de experiencia de usuario::

    Reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System /v DisableTaskMgr /t REG_DWORD /d 1 /f
    taskkill /f /im explorer.exe
    start explorer.exe
"""

from gui import MainWindow
from manager import Controller
import os
if __name__ == "__main__":
    # Inicializa la aplicación gráfica y el controlador principal.
    from PyQt5.QtWidgets import QApplication
    from time import sleep
    import sys

    sys.stdout.reconfigure(line_buffering=True)

    app     = QApplication(sys.argv)
    gui     = MainWindow(name = "EVA-MBI-3", topic = "gui")
    manager = Controller(gui,gui.model)
    gui.ready.connect(gui.showMaximized)
    gui.ready.connect(manager.start)
    #os.startfile('C:\\xampp\\xampp-control.exe')
    sys.exit(app.exec_())
