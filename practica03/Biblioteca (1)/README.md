# Práctica 3 – La capa de dominio con genéricos y patrones

## Descripción

En esta práctica se desarrolló la capa de dominio de un sistema de préstamos de biblioteca utilizando TypeScript. Se trabajó con genéricos y con los patrones Repository, DTO y Service para separar las responsabilidades del sistema.

También se implementó una regla de negocio que evita prestar un ejemplar que ya se encuentra prestado.

## Pruebas realizadas

Se realizaron dos pruebas del servicio:

- Camino feliz: se comprobó que un préstamo válido pueda crearse correctamente.
- Ejemplar duplicado: se comprobó que el sistema genere un error cuando se intenta prestar un ejemplar que ya está prestado.

## Preguntas de reflexión

### 1. ¿Hizo falta una base de datos real para probar la regla de negocio? ¿Qué dice eso sobre para qué sirve el patrón Repository?

No hizo falta una base de datos real. Se pudo utilizar un repositorio en memoria para probar la regla. Esto demuestra que Repository permite separar la lógica del sistema de la forma en que se almacenan los datos.

### 2. El Service recibe el repositorio como Repository<Prestamo>, no InMemoryPrestamoRepository. ¿Qué se rompía si usaban la clase concreta?

El Service quedaría directamente dependiente del repositorio en memoria. Si después se quisiera utilizar una base de datos real, habría que modificar también el Service. Al depender de una interfaz, se puede cambiar la implementación sin afectar la lógica de negocio.

### 3. Si cambiaran el Map en memoria por una base de datos real, ¿cuántos archivos tocarían? ¿Por qué tan pocos?

Principalmente se tendría que crear o modificar la implementación del repositorio y la configuración necesaria para conectarse a la base de datos. Los demás archivos podrían mantenerse porque trabajan con la interfaz del repositorio y no dependen directamente del Map.

## Verificación

El proyecto fue verificado con:

`npm run typecheck`

`npm run dev`

`npm test`