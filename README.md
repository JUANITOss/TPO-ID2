# TPO-ID2

## Intro

Proyecto hecho con mucho amor para la materia de Ingenieria de Datos II de la UADE

**Disclaimer! El proyecto solo se puede visualizar desde localhost.**

## Cosas faltantes...

* Nos falta manejar Order correctamente.
* Nos falta conectar la Order a una Bill.

## Para ejecutar el codigo...

* Se seben iniciar los hosts locales de las Dbs de Redis y MongoDB

```bash
    sudo systemctl start mongod
    sudo systemctl start redis-service
```

* Ir a la carpeta de root y ejecutar el server.js

```bash
    cd TPO-ID2/
    node server.js
```

* Desde la root, ir a frontend y ejecutar react

```bash
    cd frontend/
    npm start
```
* Si se reciben errores, se debe instalar localmente los componentes de node necesarios.

* Listo! Gracias por ver nuestro repositorio :D.