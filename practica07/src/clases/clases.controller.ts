import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClasesService } from './clases.service';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  obtenerClases() {
    return this.clasesService.obtenerClases();
  }

  @Post()
  agregarClase(@Body() nuevaClase: { id: number; nombre: string }) {
    return this.clasesService.agregarClase(nuevaClase);
  }
}