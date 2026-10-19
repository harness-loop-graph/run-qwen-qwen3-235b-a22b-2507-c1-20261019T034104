import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ProfessionalModule } from './professional/professional.module';
import { EncounterModule } from './encounter/encounter.module';
import { AttachmentModule } from './attachment/attachment.module';
import { AuditModule } from './audit/audit.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // Never use in production
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    ProfessionalModule,
    EncounterModule,
    AttachmentModule,
    AuditModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}