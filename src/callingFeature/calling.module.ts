import { Module } from '@nestjs/common';
import { CallingService } from './calling.service';
import { CallingController } from './calling.controller';

@Module({
  providers: [CallingService],
  controllers: [CallingController],
})
export class CallingModule {}
