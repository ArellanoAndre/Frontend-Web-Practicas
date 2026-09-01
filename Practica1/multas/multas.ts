type EstadoPrestamo = "activo" | "devuelto" | "vencido";

interface Prestamo {
    multa: number;
    ejemplar: number;
    estado: EstadoPrestamo;
    socio?: string;
}

function calcularMulta(prestamo: Prestamo): number {
    const cargoFijo = 50;
    return prestamo.multa + cargoFijo;
}

function generarRecibo(prestamo: Prestamo): string {
    const nombreSocio = prestamo.socio ?? "Socio no registrado";

    return `
RECIBO DE PRÉSTAMO
Socio: ${nombreSocio}
Ejemplar: ${prestamo.ejemplar}
Estado: ${prestamo.estado}
Multa total: $${calcularMulta(prestamo)}
`;
}

const prestamo: Prestamo = {
    multa: 350,
    ejemplar: 14,
    estado: "activo",
    socio: "Isaac"
};

console.log(prestamo.fechaEntrega);
console.log(generarRecibo(prestamo));
