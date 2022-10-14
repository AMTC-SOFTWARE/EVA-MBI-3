# -*- coding: utf-8 -*-
"""
@author: MSc. Marco Rutiaga Quezada
"""

from manager.controller import Controller

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    manager = Controller()
    sys.exit(app.exec_())
    
