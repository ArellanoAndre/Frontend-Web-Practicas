import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InscripcionRepository } from '../dominio/inscripcion.repository';
import {
  Horario,
  Inscripcion,
  Miembro,
  NuevaInscripcion,
} from '../dominio/entidades';

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.findUnique({
      where: { id },
    });
  }

  async buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({
      where: { horarioId },
    });
  }

  async buscarHorario(horarioId: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({
      where: { id: horarioId },
    });
  }

  async buscarMiembro(miembroId: number): Promise<Miembro | null> {
    return this.prisma.miembro.findUnique({
      where: { id: miembroId },
    });
  }

  async guardar(datos: NuevaInscripcion): Promise<Inscripcion> {
    return this.prisma.inscripcion.create({
      data: {
        horarioId: datos.horarioId,
        miembroId: datos.miembroId,
        estado: 'confirmada',
        creadaEn: new Date(),
      },
    });
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    const existente = await this.prisma.inscripcion.findUnique({
      where: { id },
    });

    if (!existente) {
      return null;
    }

    return this.prisma.inscripcion.update({
      where: { id },
      data: {
        estado: 'cancelada',
      },
    });
  }
}