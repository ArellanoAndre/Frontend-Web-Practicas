import { Injectable } from '@nestjs/common';

@Injectable()
export class ClasesService {
  private clases = [
    { id: 1, nombre: 'Spinning' },
    { id: 2, nombre: 'CrossFit' },
  ];

  obtenerClases() {
    return this.clases;
  }

  agregarClase(nuevaClase: { id: number; nombre: string }) {
    this.clases.push(nuevaClase);
    return nuevaClase;
  }
}