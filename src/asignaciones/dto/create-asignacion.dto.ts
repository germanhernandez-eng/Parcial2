import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateAsignacionDto {
  @IsNumber()
  @IsNotEmpty()
  estudianteId: number;

  @IsNumber()
  @IsNotEmpty()
  cursoId: number;

  @IsString()
  @IsNotEmpty()
  cicloLectivo: string;
}