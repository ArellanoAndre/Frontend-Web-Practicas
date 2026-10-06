import { Inject, Injectable } from '@nestjs/common';
import type {
  Clase,
  ClaseRepository,
} from './dominio/clase.repository';
import { CLASE_REPOSITORY } from './clases.tokens';

@Injectable()
export class ClasesService {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly repo: ClaseRepository,
  ) {}

  listar(): Promise<Clase[]> {
    return this.repo.listar();
  }

  crear(nombre: string): Promise<Clase> {
    return this.repo.crear(nombre);
  }
}