# Práctica 4 – De la capa de dominio a una API HTTP

## Descripción

En esta práctica se continuó trabajando con el sistema de préstamos de biblioteca desarrollado anteriormente en TypeScript. El objetivo fue conectar la capa de dominio con una API HTTP utilizando Express, sin modificar la lógica de negocio existente.

Se implementaron rutas para consultar y registrar préstamos, además de validaciones para controlar los datos recibidos y un middleware para traducir los errores del sistema a códigos de estado HTTP.

## Funcionalidades

- Consulta de préstamos mediante `GET /api/prestamos`.
- Registro de préstamos mediante `POST /api/prestamos`.
- Uso de DTO para evitar exponer información interna de la entidad.
- Validación de los datos recibidos.
- Respuesta `201 Created` al registrar correctamente un préstamo.
- Respuesta `409 Conflict` cuando un ejemplar ya se encuentra prestado.
- Respuesta `400 Bad Request` cuando los datos enviados no son válidos.
- Uso de la cabecera `Location` al crear un nuevo préstamo.
- Manejo centralizado de errores mediante middleware de Express.

## Pruebas realizadas

Se comprobaron los tres casos principales solicitados:

1. **201 Created:** se registró correctamente un nuevo préstamo.
2. **409 Conflict:** se intentó prestar nuevamente un ejemplar que ya estaba prestado.
3. **400 Bad Request:** se intentó registrar un préstamo dejando vacía la lista de ejemplares.

También se utilizó `npm run typecheck` para comprobar que el proyecto no presentara errores de TypeScript.

## Preguntas de reflexión

### 1. Express envía los rechazos de los handlers async al middleware de errores sin necesidad de try/catch. ¿Qué tendrían que agregar en cada ruta si no lo hiciera?

Sería necesario utilizar un bloque `try/catch` en cada ruta. Dentro del `catch` se tendría que enviar el error al middleware mediante `next(error)`. Esto provocaría que las rutas tuvieran más código repetido y fueran un poco más difíciles de mantener.

### 2. ¿Por qué el Service no lanza directamente un error 409 en lugar de EjemplarPrestadoError?

Porque el Service pertenece a la lógica de negocio y no debería depender de HTTP. `EjemplarPrestadoError` representa un problema propio del dominio, mientras que la capa HTTP es la responsable de convertir ese error en una respuesta `409 Conflict`. De esta manera, el Service podría utilizarse también desde otro tipo de aplicación sin depender de Express.

### 3. Si mañana una aplicación móvil consumiera esta API, ¿qué archivos de esta práctica tendrían que tocar?

Si la aplicación móvil utiliza el mismo contrato y las mismas rutas de la API, no sería necesario modificar la capa de dominio, infraestructura ni servicios. La aplicación móvil simplemente consumiría los endpoints existentes. Si fuera necesario cambiar la forma en que se comunica la API, los cambios se realizarían principalmente en la capa HTTP o en los contratos, manteniendo separada la lógica de negocio.

## Ejecución

Instalar las dependencias:

`npm install`

Comprobar TypeScript:

`npm run typecheck`

Iniciar el servidor:

`npm run servidor`

El servidor se ejecuta en:

`http://localhost:3000`

## Tecnologías utilizadas

- TypeScript
- Node.js
- Express
- REST API
- DTO
- Repository
- Service