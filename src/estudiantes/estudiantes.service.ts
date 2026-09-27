import { Injectable, NotFoundException } from '@nestjs/common';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  // Arreglo en memoria para almacenar los datos
  private estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Mendoza',
      fechaNacimiento: '2001-05-14',
      sexo: 'M',
      carnet: '1290-20-14253',
      correoUMG: 'cmendozak@miumg.edu.gt',
    },
  ];

  private idCounter = 2;

  // POST - Registrar un estudiante
  create(createEstudianteDto: CreateEstudianteDto): Estudiante {
    const nuevoEstudiante: Estudiante = {
      id: this.idCounter++,
      ...createEstudianteDto,
    };
    // Método de arreglo: push
    this.estudiantes.push(nuevoEstudiante);
    return nuevoEstudiante;
  }

  // GET ALL - Obtener todos los estudiantes
  findAll(): Estudiante[] {
    return this.estudiantes;
  }

  // GET BY ID - Obtener un estudiante por ID
  findOne(id: number): Estudiante {
    // Método de arreglo: find
    const estudiante = this.estudiantes.find((est) => est.id === id);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  // PUT - Actualización completa
  update(id: number, createEstudianteDto: CreateEstudianteDto): Estudiante {
    // Método de arreglo: findIndex
    const index = this.estudiantes.findIndex((est) => est.id === id);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }

    const estudianteActualizado: Estudiante = {
      id,
      ...createEstudianteDto,
    };

    this.estudiantes[index] = estudianteActualizado;
    return estudianteActualizado;
  }

  // PATCH - Actualización parcial
  partialUpdate(id: number, updateEstudianteDto: UpdateEstudianteDto): Estudiante {
    const estudiante = this.findOne(id);
    Object.assign(estudiante, updateEstudianteDto);
    return estudiante;
  }

  // DELETE - Eliminar estudiante
  remove(id: number): { message: string } {
    const index = this.estudiantes.findIndex((est) => est.id === id);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    // Método de arreglo: splice
    this.estudiantes.splice(index, 1);
    return { message: `Estudiante con ID ${id} eliminado correctamente` };
  }
}