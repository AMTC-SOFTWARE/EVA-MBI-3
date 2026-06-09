# -*- coding: utf-8 -*-
"""
Interfaz gráfica del sistema EVA-MBI-3.

Este paquete expone la clase principal ``MainWindow`` y funciona como
punto de entrada para la interfaz gráfica del sistema.

La interfaz se comunica mediante mensajes MQTT en formato JSON.

Tópicos principales:

- ``gui/status``: Publica estados y solicitudes desde la interfaz.
- ``gui/set``: Recibe comandos para actualizar la interfaz.

Mensajes de salida comunes::

    {"WEB": "open"}
    {"request": "login"}
    {"request": "logout"}
    {"request": "config"}
    {"ID": "texto escaneado desde login"}
    {"code": "texto escaneado desde scanner"}

Mensajes de entrada comunes::

    {"lbl_info1": {"text": "Status", "color": "black"}}
    {"lbl_result": {"text": "Torque T1 OK", "color": "green"}}
    {"lbl_steps": {"text": "Next Torque: T2", "color": "red"}}
    {"lbl_user": {"type": "SUPERUSUARIO", "user": "Marco Rutiaga", "color": "black"}}
    {"img_user": "usuario_x.jpg"}
    {"img_center": "logo.jpg"}
    {"show": {"login": true, "scanner": true}}
    {"popOut": "text"}
    {"request": "status"}
    {"allow_close": false}

Notas:
    Este paquete importa ``MainWindow`` desde ``gui.view`` para que pueda
    ser utilizado directamente desde ``gui``.
"""


from gui.view import MainWindow

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    gui = MainWindow()
    gui.show()
    sys.exit(app.exec_())
