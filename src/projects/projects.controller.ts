import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Controller('projects')
export class ProjectsController {
  constructor(private configService: ConfigService) {}
  @Get()
  projects() {
    const test = this.configService.get<string>('TEST');
    return { msg: 'hellp', test };
  }
}
