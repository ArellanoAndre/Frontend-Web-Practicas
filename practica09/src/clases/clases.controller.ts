import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClasesService } from './clases.service';
import type { Clase } from './dominio/clase.repository';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  listar(): Promise<Clase[]> {
    return this.clasesService.listar();
  }

  @Post()
  crear(@Body() cuerpo: { nombre: string }): Promise<Clase> {
    return this.clasesService.crear(cuerpo.nombre);
  }
}