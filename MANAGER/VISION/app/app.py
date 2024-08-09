"""
@authors: MS. Marco Rutiaga Quezada
          MS. Aarón Castillo Tobías
          MS. César Velázqiez Zaldo
          Ing. Rogelio García

###############################################################################
commands to exe generation:
        pyinstaller --noconsole --icon=icon.ico --add-data data;data --noconfirm app.py
        pyinstaller --icon=icon.ico --add-data data;data --noconfirm app.py
        
        special case pyinstaller not recognized
        Python -m PyInstaller --icon=icon.ico --add-data data;data app.py

commands for User Experience:
        Reg add HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System /v DisableTaskMgr /t REG_DWORD /d 1 /f
        taskkill /f /im explorer.exe
        start explorer.exe
###############################################################################
"""

from gui import MainWindow
from manager import Controller
import os
if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    from time import sleep
    import sys

    app     = QApplication(sys.argv)
    gui     = MainWindow(name = "EVA-MBI-3", topic = "gui")
    manager = Controller(gui,gui.model)
    gui.ready.connect(gui.showMaximized)
    gui.ready.connect(manager.start)
    #os.startfile('C:\\xampp\\xampp-control.exe')
    sys.exit(app.exec_())
