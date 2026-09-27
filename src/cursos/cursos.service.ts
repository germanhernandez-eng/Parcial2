import { Injectable, NotFoundException } from '@nestjs/common';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  private cursos: Curso[] = [
    {
      id: 1,
      codigoCurso: 'RL-101',
      nombre: 'Programación I',
      descripcion: 'Introducción a la programación estructurada y algoritmos.',
      semestre: 1,
      prerrequisitos: ['Ninguno'],
      creditos: 5,
    },
  ];

  private idCounter = 2;

  // POST - Agregar un curso
  create(createCursoDto: CreateCursoDto): Curso {
    const nuevoCurso: Curso = {
      id: this.idCounter++,
      ...createCursoDto,
    };
    this.cursos.push(nuevoCurso);
    return nuevoCurso;
  }

  // GET - Obtener todos los cursos
  findAll(): Curso[] {
    return this.cursos;
  }

  // GET BY ID - Buscar curso por ID
  findOne(id: number): Curso {
    const curso = this.cursos.find((c) => c.id === id);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return curso;
  }

  // PUT - Reemplazo completo
  update(id: number, createCursoDto: CreateCursoDto): Curso {
    const index = this.cursos.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    const cursoActualizado: Curso = {
      id,
      ...createCursoDto,
    };

    this.cursos[index] = cursoActualizado;
    return cursoActualizado;
  }

  // PATCH - Actualización parcial
  partialUpdate(id: number, updateCursoDto: UpdateCursoDto): Curso {
    const curso = this.findOne(id);
    Object.assign(curso, updateCursoDto);
    return curso;
  }

  // DELETE - Eliminar un curso
  remove(id: number): { message: string } {
    const index = this.cursos.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    this.cursos.splice(index, 1);
    return { message: `Curso con ID ${id} eliminado correctamente` };
  }
}