export class Curso {
  id: number;
  codigoCurso: string; // Ej: "RL-101"
  nombre: string;
  descripcion: string;
  semestre: number;
  prerrequisitos: string[]; // Lista de códigos de cursos requeridos
  creditos: number;
}