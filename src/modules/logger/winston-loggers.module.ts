import { Module } from '@nestjs/common';
import { WinstonLoggersService } from './winston-loggers.service';

@Module({
  providers: [WinstonLoggersService],
  controllers: [],

})
export class WinstonLoggerModule {}
