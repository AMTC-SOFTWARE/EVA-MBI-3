EVA-MBI-3 Documentación
=======================

Sistema de visión y alturas desarrollado para la inspeccion
de cajas ensambladas con fusibles y tuercas durante el
proceso de producción.

Características principales
---------------------------

* Aplicación desktop basada en PyQt5.
* Máquina de estados mediante QStateMachine.
* Comunicación MQTT.
* Integración con APIs REST.

Tecnologías utilizadas
----------------------

* Python 3.x
* PyQt5
* MQTT (Paho MQTT)
* Requests
* Flask
* OpenCV
* Pandas
* MySQL
* QStateMachine

Arquitectura general
--------------------

El sistema se encuentra dividido en diferentes componentes:

* GUI: Interfaz gráfica de usuario.
* Controller: Lógica principal basada en máquina de estados.
* MQTT: Comunicación entre procesos y estaciones.
* APIs REST: Integración con servicios externos.
* Database: Persistencia de datos y trazabilidad.

.. toctree::
   :maxdepth: 2
   :caption: Contenido:

   app
   gui
   gui_model
   gui_comm
   controller
   controller_model
   controller_height
   controller_inspections
   controller_vision

Índices y tablas
================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`