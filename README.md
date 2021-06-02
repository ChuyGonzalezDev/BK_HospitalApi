# BK - API Hospital
## Proyecto Final - **Back-End** :robot:

_API Rest que contiene el CRUD para un HOSPITAL._

- Implementación de JWT para la seguridad en las peticiones de los métodos.
- Se utilizó POO para el diseño de esta solución.
- Se utilizaron Interfaces para poder definir el esquema y comportamiento de los Controladores.
- Se realizaron 4 controladores para MongoDB -> AuthController, UsersController, HospitalsController y DoctorsController.
- En Validators se define la lógica intermedia para validar negocio del Controller.
- El acceso a datos se encuentra implementado con Mongoose para MongoDB. Para realizar la conexión con la DB se utilizaron Singleton pattern, aplicando static, private, etc.
- Se implemento un HTML para validar la API desde <http://localhost>.

## Construido con 🛠️

* [Node.JS](https://nodejs.org/en/) - El framework Node.JS.
* [Mongoose](https://mongoosejs.com/) - ‎Modelado ‎‎de objetos MongoDB‎ elegante para ‎‎Node.JS‎
* [TypeScript](https://www.typescriptlang.org/) - Tipeado de JavaScrit con ‎TypeScript.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto para el funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

1. Clone the repo
   ```sh
   git clone https://github.com/ChuyGonzalez/BK_HospitalApi.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Pre-requisitos 📋
### Base de Datos 
Ejecutar los siguientes pasos y comandos en consola de MongoDB:

1. Crear la Base de Datos con [MongoDB - Create Cluster](https://docs.atlas.mongodb.com/tutorial/create-mongodb-user-for-cluster).
2. Comando para mostrar las Bases de Datos:
    ```bash
    db
    ```
3. Comando para seleccionar la Bases de Datos:
    ```bash
    use dbHospital;
    ```
4. Comando para crear la colección de Usuarios:
    ```bash
    db.createCollection("users");
    ```
5. Comando para crear la colección de Hospitales:
   ```bash
    db.createCollection("hospitals");
    ```
6. Comando para crear la colección de Doctores:
   ```bash
    db.createCollection("doctors");
    ```
### Environment ⚙️
_Modificar el archivo .env con tus datos a ocupar de Port, Conexión a BD y Secret Key._

## Documentación de API - POSTMAN:
<https://www.getpostman.com/collections/0f05ba9c7af36440faa7>

