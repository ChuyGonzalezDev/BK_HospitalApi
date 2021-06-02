# API Hospital

![https://github.com/ChuyGonzalez](images/logo.jpeg)

## Proyecto Final - **Back-End** robot

**REST API Rest que contiene el CRUD para un HOSPITAL:** consulta, registro, actualización y borrado de Usuarios, Hospitales y Doctores.

**Puntos importantes de la API:**

- Se incluye implementación de [JSON Web Tokens](https://jwt.io/) para la generación del token de seguridad e enviarlos en los métodos implementados.
- Se utilizó POO para el diseño de esta solución.
- Se realizaron 4 controladores para MongoDB -> [**AuthController**](controllers/AuthController.ts), [**UsersController**](controllers/UsersController.ts), [**HospitalsController**](controllers/HospitalsController.ts) y [**DoctorsController**](controllers/DoctorsController.ts).
- Se utilizaron Interfaces para poder definir el esquema y comportamiento de los Controladores.
- En [**Validators.ts**](helpers/Validators.ts) se definen reglas de negocio y lógica intermedia para validación en los controladores.
- Se crearon **2 Middlewares**; [**ValidateToken.ts**](middlewares/ValidateToken.ts) que contiene la validación del token de seguridad recibido. Y [**ValidateFields.ts**](middlewares/ValidateFields.ts) que contiene la validación de los campos recibidos en los Request, mostrando los errores detectados si fuera el caso.
- El acceso a datos se encuentra implementado con Mongoose para MongoDB. 
- Para realizar la conexión con la DB se utilizaron Singleton pattern, aplicando static, private, etc.
- Se implemento un [**index.html**](public/index.html) para validar la API desde [**LocalHost**](http://localhost/4000).

![Ejemplo Index](images/index.png)

## Construido con 🛠️

- [Node.JS](https://nodejs.org/en/) - El framework Node.JS.
- [Mongoose](https://mongoosejs.com/) - ‎Modelado ‎‎de objetos MongoDB‎ elegante para ‎‎Node.JS‎
- [TypeScript](https://www.typescriptlang.org/) - Tipeado de JavaScrit con ‎TypeScript.

## Comenzando 🚀

**Estas instrucciones te permitirán obtener una copia del proyecto para el funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.**

1. Clone the repo:

   ```sh
   git clone https://github.com/ChuyGonzalez/BK_HospitalApi.git
   ```

2. Install NPM packages:

   ```sh
   npm install
   ```

3. Run Dev:

    *npm*

    ```sh
    npm run start:dev
    ```

    *Yarn*

    ```sh
    yarn start:dev
    ```

4. Run Build:

    *npm*

    ```sh
    npm run start
    ```

    *Yarn*

    ```sh
    yarn start
    ```

5. Run Build:

    *npm*

    ```sh
    npm run build
    ```

    *Yarn*

    ```sh
    yarn build
    ```

6. Run Build && Node dist:

    *npm*

    ```sh
    npm run start
    ```

    *Yarn*

    ```sh
    yarn start
    ```

## Pre-requisitos 📋

### Base de Datos

Ejecutar los siguientes pasos y comandos en consola de MongoDB:

1. Crear la Base de Datos con [**MongoDB - Create Cluster**](https://docs.atlas.mongodb.com/tutorial/create-mongodb-user-for-cluster).
2. Comando para mostrar las Bases de Datos:

    ```bash
    db
    ```

3. Seleccionar la Bases de Datos **dbHospital**:

    ```bash
    use dbHospital;
    ```

4. Crear la colección de **Usuarios**:

    ```bash
    db.createCollection("users");
    ```

5. Crear la colección de **Hospitales**:

   ```bash
    db.createCollection("hospitals");
    ```

6. Crear la colección de **Doctores**:

   ```bash
    db.createCollection("doctors");
    ```

### Environment ⚙️

**Modificar el archivo .env con tus datos a ocupar de Port, Conexión a BD y Secret Key.**

## Despliegue 📦

Para realiza el despligue por favor tome en cuenta los siguientes pasos: [Deploy-Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para ver todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/ChuyGonzalez/BK_HospitalApi/tags).

## Documentación de API

[POSTMAN](https://www.getpostman.com/collections/0f05ba9c7af36440faa7)

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/ChuyGonzalez/BK_HospitalApi/wiki)

## Autores ✒️

- **Jesús González** - *Creación de Proyecto* - [ChuyGonzalez](https://github.com/ChuyGonzalez)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/ChuyGonzalez/BK_HospitalApi/graphs/contributors) quíenes han participado en este proyecto.

---
⌨️ por [ChuyGonzalez](https://github.com/ChuyGonzalez) 😊

