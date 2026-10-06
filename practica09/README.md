# Práctica 9 – Blindar la API

## Descripción

En esta práctica se continúa con la API del gimnasio desarrollada en las prácticas anteriores. Se integra Prisma con la aplicación NestJS para utilizar MySQL como medio de persistencia, sustituyendo los repositorios que almacenaban información en memoria.

También se implementarán validaciones de entrada, manejo centralizado de errores y configuración de CORS.

---

## 1. Conexión de Prisma con la aplicación

Se creó un `PrismaService` para permitir que los repositorios de la aplicación puedan acceder a la base de datos MySQL mediante Prisma.

También se creó un `PrismaModule` global y se agregó a los imports de `AppModule`.

Para Clases se implementó `ClasePrismaRepository`, sustituyendo el almacenamiento que anteriormente se realizaba mediante un arreglo en memoria.

### ¿Qué línea del Service o Controller tuvo que cambiar para que Clases hablara con MySQL?

En el proyecto recibido, `ClasesService` todavía utilizaba directamente un arreglo en memoria, por lo que fue necesario adaptarlo para trabajar mediante la interfaz `ClaseRepository`.

Una vez realizada esa adaptación, el Controller no necesita conocer Prisma ni MySQL. La selección de la implementación se realiza mediante inyección de dependencias en `ClasesModule`:

```ts
{
  provide: CLASE_REPOSITORY,
  useClass: ClasePrismaRepository,
}