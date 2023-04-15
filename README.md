# Pocket HBase 🚀

¡Bienvenido a Pocket HBase! Este es un proyecto de JavaScript que simula la funcionalidad de HBase, un sistema de base de datos distribuido y escalable. 

## ¿Qué es HBase? 🤔

HBase es una base de datos NoSQL (no relacional) que se ejecuta en la plataforma Hadoop. Está diseñada para manejar grandes cantidades de datos estructurados y no estructurados y ofrece una alta disponibilidad y escalabilidad. HBase utiliza el modelo de datos clave-valor, en el que cada fila tiene un identificador único (clave) y múltiples columnas de valores.

## ¿Qué puede hacer HBase? 🚀

HBase tiene varias características que lo hacen ideal para aplicaciones que manejan grandes cantidades de datos. Estas son algunas de las operaciones que se pueden realizar con HBase:

- Almacenar y recuperar datos
- Escalabilidad
- Alto rendimiento
- Bajo costo
- Fácil integración con Hadoop

## ¿Cómo funciona HBase? 🔧

HBase es una base de datos distribuida, lo que significa que los datos se almacenan en varios nodos en un clúster. Cada nodo en el clúster tiene una copia de los datos, lo que hace que HBase sea altamente disponible y tolerante a fallos.

Los datos en HBase se organizan en tablas, que a su vez se dividen en regiones. Cada región se divide en filas, que tienen un identificador único (clave). Cada fila puede contener múltiples columnas de valores, que se organizan en column families (familias de columnas).

Los datos en HBase se almacenan en HFiles, que son archivos de datos ordenados por clave. Cuando se escribe una nueva fila en HBase, se escribe primero en el registro de WAL (write-ahead log) y luego en una memtable en memoria. Cuando la memtable se llena, se escribe en un HFile en disco.

## ¿Cómo funciona Pocket HBase? 🔧

Pocket HBase es una simulación de HBase que se ejecuta en JavaScript. Ofrece una interfaz de usuario para crear tablas, agregar filas y column families, y realizar operaciones de lectura y escritura de datos.

Pocket HBase utiliza archivos JSON para almacenar los datos, en lugar de HFiles en disco como HBase. Sin embargo, la funcionalidad de Pocket HBase se asemeja a la de HBase y puede ser útil para aprender los conceptos básicos de HBase o para realizar pruebas y experimentos.
