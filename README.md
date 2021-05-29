# BK Hospital API
## Proyecto Final - **Node.JS** :robot:

CORRER ESTO EN SU DB

CREATE TABLE users (id SERIAL, name VARCHAR(100), username VARCHAR(100), password VARCHAR(150));

PARA PODER CORRER ESTO, MODIFICAR EL ARCHIVO .env con los datos de sus servidores

PARA IMPLEMENTAR LA PERSISTENCIA DE DATOS SE USARON LAS SIGUIENTES DEPENDENCIAS:
Postgres: https://node-postgres.com/
Mongo: https://www.npmjs.com/package/mongodb

SE USARON INTERFACES PARA PODER DEFINIR EL COMPORTAMIENTO DE LOS REPOSITORIOS CON IUserRepository

PARA ACCEDER A LAS IMPLEMENTACIONES CHECAR LAS CLASES UserMongoRepository y UserRepository

Se realizaron 2 controladores para hacer el ejemplo con Postgres y Mongo -> UsersController y UsersMongoController

En UserApplication se define la lógica intermedia entre el repositorio y el controller, si se necesitará hacer otra tarea
además de persistir datos, iría en la capa de aplicación.

Para realizar la conexión con la DB se utilizaron Singlethon, aplicando static, private, etc.

COLECCIÓN DE POSTMAN:
https://www.getpostman.com/collections/1fc95d82d2436ba32b96

Importas la colección, con el botón de "IMPORT", segido de "Link", e ingresar URL en el campo y presionar Continuar
