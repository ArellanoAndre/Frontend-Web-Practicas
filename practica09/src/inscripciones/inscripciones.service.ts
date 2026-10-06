import { Inject, Injectable } from '@nestjs/common';
import type { InscripcionRepository } from './dominio/inscripcion.repository';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens';
import { Inscripcion } from './dominio/entidades';
import {
  CupoLlenoError,
  InscripcionDuplicadaError,
  HorarioNoEncontradoError,
  MiembroNoEncontradoError,
} from './dominio/errores';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';

@Injectable()
export class InscripcionesService {
    constructor(
        @Inject(INSCRIPCION_REPOSITORY)
        private readonly repo: InscripcionRepository) {}

        listar(): Promise<Inscripcion[]> {
            return this.repo.listar();
        }

        buscar(id: number): Promise<Inscripcion | null> {
            return this.repo.buscarPorId(id);
        }

        async crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
            const horario = await this.repo.buscarHorario(dto.horarioId);
            if (!horario) {
                throw new HorarioNoEncontradoError(dto.horarioId);
            }

            const miembro = await this.repo.buscarMiembro(dto.miembroId);
            if (!miembro) {
                throw new MiembroNoEncontradoError(dto.miembroId);
            }

            const delHorario = await this.repo.buscarPorHorario(dto.horarioId);

            const yaInscrito = delHorario.some(
                (i) => i.miembroId === dto.miembroId && i.estado === 'cancelada',
            );

            if (yaInscrito) {
                throw new InscripcionDuplicadaError(dto.horarioId, dto.miembroId);
            }

            const confirmadas = delHorario.filter((i) => i.estado === 'confirmada').length;

            if (confirmadas >= horario.cupoMaximo) {
                throw new CupoLlenoError(dto.horarioId, horario.cupoMaximo);
            }
            return this.repo.guardar({ horarioId: dto.horarioId, miembroId: dto.miembroId });
        }

        cancelar(id: number): Promise<Inscripcion | null> {
            return this.repo.cancelar(id);
        }
}
