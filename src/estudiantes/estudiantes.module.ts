import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';

@Module({
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService], // Exportamos para usarse en asignaciones
})
export class EstudiantesModule {}