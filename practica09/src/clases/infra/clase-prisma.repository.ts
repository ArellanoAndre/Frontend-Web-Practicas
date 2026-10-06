import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Clase,
  ClaseRepository,
} from '../dominio/clase.repository';

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Clase[]> {
    return this.prisma.clase.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async crear(nombre: string): Promise<Clase> {
    return this.prisma.clase.create({
      data: {
        nombre,
      },
    });
  }
}