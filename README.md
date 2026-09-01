Resultados de practica. (tambien incluidos en el pdf)
1. De las dos líneas que usan const, ¿por qué solo una falla?
Porque const permite modificar las propiedades de un objeto, pero no permite reasignar la variable completa. Por eso podemos cambiar libro.disponible, pero no reemplazar libro por otro objeto.

2. Al asignarle un texto a la variable con let, nadie escribió que fuera un número. ¿De dónde salió ese tipo?

TypeScript infirió el tipo automáticamente a partir del primer valor asignado. Como diasRetraso inició con el valor 3, TypeScript determinó que era de tipo number, por eso después no permite asignarle el texto "cinco".
6.1
Esperaba: "activo" | "devuelto" | "vencido"
Recibió: "ACTIVO"
Línea: la línea estado: ACTIVO

6.2
Esperaba: number
Recibió: string
Línea: donde agregué multa “350”

6.3
Esperaba: una propiedad válida de Prestamo
Recibió: fechaEntrega, que no existe
Línea: 34
