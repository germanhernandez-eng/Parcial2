import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Asignacion } from './entities/asignacion.entity';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { EstudiantesService } from '../estudiantes/estudiantes.service';
import { CursosService } from '../cursos/cursos.service';

@Injectable()
export class AsignacionesService {
  private asignaciones: Asignacion[] = [];
  private idCounter = 1;

  constructor(
    private readonly estudiantesService: EstudiantesService,
    private readonly cursosService: CursosService,
  ) {}

  // POST - Asignar un curso a un estudiante
  create(createAsignacionDto: CreateAsignacionDto): Asignacion {
    // 1. Validar si el estudiante existe
    this.estudiantesService.findOne(createAsignacionDto.estudianteId);

    // 2. Validar si el curso existe
    this.cursosService.findOne(createAsignacionDto.cursoId);

    // 3. Validar si la asignación ya existe para el mismo ciclo
    const existe = this.asignaciones.find(
      (a) =>
        a.estudianteId === createAsignacionDto.estudianteId &&
        a.cursoId === createAsignacionDto.cursoId &&
        a.cicloLectivo === createAsignacionDto.cicloLectivo,
    );

    if (existe) {
      throw new BadRequestException('El estudiante ya está asignado a este curso en el ciclo actual');
    }

    const nuevaAsignacion: Asignacion = {
      id: this.idCounter++,
      ...createAsignacionDto,
      fechaAsignacion: new Date(),
    };

    this.asignaciones.push(nuevaAsignacion);
    return nuevaAsignacion;
  }

  // GET ALL - Obtener todas las asignaciones resolviendo información completa
  findAll() {
    return this.asignaciones.map((asig) => ({
      id: asig.id,
      cicloLectivo: asig.cicloLectivo,
      fechaAsignacion: asig.fechaAsignacion,
      estudiante: this.estudiantesService.findOne(asig.estudianteId),
      curso: this.cursosService.findOne(asig.cursoId),
    }));
  }

  // GET BY ESTUDIANTE - Obtener cursos de un estudiante en específico
  findByEstudiante(estudianteId: number) {
    this.estudiantesService.findOne(estudianteId);

    const asignacionesEstudiante = this.asignaciones.filter(
      (a) => a.estudianteId === estudianteId,
    );

    return asignacionesEstudiante.map((asig) => ({
      idAsignacion: asig.id,
      cicloLectivo: asig.cicloLectivo,
      fechaAsignacion: asig.fechaAsignacion,
      curso: this.cursosService.findOne(asig.cursoId),
    }));
  }

  // DELETE - Desasignar
  remove(id: number) {
    const index = this.asignaciones.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }
    this.asignaciones.splice(index, 1);
    return { message: `Asignación con ID ${id} eliminada exitosamente` };
  }
}