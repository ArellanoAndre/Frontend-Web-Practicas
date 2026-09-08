Práctica 02 - Biblioteca en TypeScript

1. ¿Por qué una unión de valores y no una enumeración?

Porque una unión limita directamente los valores permitidos y TypeScript detecta valores inválidos sin generar una estructura extra en JavaScript.

2. ¿Qué se gana con unknown en lugar de any?

unknown obliga a comprobar el tipo antes de usar el dato. any permite usarlo sin validación y puede ocultar errores.

3. ¿Por qué la fecha entra como parámetro?

Para poder probar el programa con cualquier fecha y no depender de la fecha real de la computadora.

4. ¿Qué pasa si se usa el estado en mayúsculas?

TypeScript marca error porque "ACTIVO" no pertenece a los valores permitidos de LoanStatus.

5. ¿Qué pasa con readonly al generar JavaScript?

readonly protege la propiedad durante la revisión de TypeScript, pero no aparece en el archivo JavaScript generado.

6. ¿Qué problema hay al usar directamente JSON.parse()?

Puede contener datos incorrectos. Por eso se recibe como unknown y se valida antes de usarlo.

7. ¿Cómo se valida que un registro sea un libro?

Se comprueba que sea un objeto, que no sea null, que tenga las propiedades necesarias y que cada una tenga el tipo correcto.

8. ¿Qué estrechamientos de tipo se usaron?

Se usaron typeof para primitivos, in para comprobar propiedades y una condición para descartar null.

9. ¿Qué pasa con los registros incorrectos?

Se descartan y el programa reporta cuántos registros no fueron válidos.

10. ¿Cómo se calculan los ejemplares disponibles?

Se restan los préstamos activos a la cantidad total de ejemplares del libro.

11. ¿Qué pasa si el libro no existe?

Se genera un error del dominio y el menú muestra un mensaje indicando que el libro no existe.

12. ¿Qué pasa si no hay ejemplares disponibles?

El préstamo se rechaza y se muestra el mensaje de que no hay ejemplares disponibles.

13. ¿Para qué se usa never?

Para comprobar que todos los casos posibles de una unión hayan sido atendidos.

14. ¿Qué pasó al agregar un estado nuevo?

TypeScript marcó error porque el nuevo estado no estaba contemplado en el switch.

15. ¿Por qué se envuelve la librería de entrada?

Para devolver tipos más seguros y claros, por ejemplo string | undefined.

16. ¿Qué pasa al cancelar una pregunta?

La entrada puede interrumpirse, por eso las funciones deben considerar que puede no haber un valor.

17. ¿Por qué las opciones del menú son constantes?

Para limitar las opciones válidas y evitar valores repetidos o incorrectos.

18. ¿Por qué los errores del dominio se atrapan en el menú?

Porque las reglas deciden qué está permitido y el menú se encarga de mostrar mensajes comprensibles al usuario.

19. ¿Qué demuestra que transpilar no es verificar?

Que el programa puede ejecutarse aunque TypeScript detecte un error de tipos.

20. ¿Qué pasó con la multa al cambiar un número por texto?

El resultado dejó de ser confiable, demostrando que un programa puede correr y aun así tener errores de tipo.

21. ¿Qué pasó al desactivar strict?

TypeScript realizó menos comprobaciones y algunos errores dejaron de aparecer. Después se volvió a activar strict.

22. ¿Cuál es el criterio final de terminado?

Que npm run revisar termine sin errores con strict activado.

Conclusión:
La práctica muestra cómo TypeScript ayuda a detectar errores antes de ejecutar el programa mediante strict, unknown, uniones, readonly y never.