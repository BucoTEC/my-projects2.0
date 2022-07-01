import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private configService: ConfigService) {}
  @Get()
  projects() {
    const test = this.configService.get<string>('TEST');
    return { msg: 'hellp', test };
  }
}
