import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TarefasModule } from './tarefas/tarefas.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, TarefasModule],
})
export class AppModule {}
