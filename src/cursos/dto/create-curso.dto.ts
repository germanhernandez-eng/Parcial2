import { IsString, IsNotEmpty, IsNumber, IsArray, Min } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  codigoCurso: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @Min(1)
  semestre: number;

  @IsArray()
  @IsString({ each: true })
  prerrequisitos: string[];

  @IsNumber()
  @Min(1)
  creditos: number;
}