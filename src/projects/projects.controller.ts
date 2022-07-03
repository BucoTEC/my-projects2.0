import {
  Body,
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
import { ReqWithUser } from 'src/types/reqWithUser';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/uptadeProject.dto';
import { ProjectsService } from './projects.service';
@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}
  @Get()
  allProjects(@Req() req: ReqWithUser) {
    return this.projectsService.allProjects(req);
  }

  @Post()
  createProject(@Body() body: CreateProjectDto, @Req() req: ReqWithUser) {
    return this.projectsService.createProject(body, req);
  }
  @Get(':id')
  oneProject(@Param('id') id: string) {
    return this.projectsService.oneProject(id);
  }

  @Patch(':id')
  updateProject(
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
    @Req() req: ReqWithUser,
  ) {
    return this.projectsService.updateProject(id, body, req);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
