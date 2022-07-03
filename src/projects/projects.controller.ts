import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProjectsService } from './projects.service';
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}
  @Get()
  allProjects(@Req() req) {
    console.log(req.user);

    return this.projectsService.allProjects();
  }

  @Post()
  createProject() {
    return 'create project';
  }
  @Get(':id')
  oneProject(@Param('id') id: string) {
    return this.projectsService.oneProject(id);
  }

  @Patch(':id')
  updateProject(@Param('id') id: string) {
    return this.projectsService.updateProject(id);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
