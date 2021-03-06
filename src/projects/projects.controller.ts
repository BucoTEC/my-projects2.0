import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('img'))
  createProject(
    @UploadedFile() img: Express.Multer.File,
    @Body() body: CreateProjectDto,
    @Req() req: ReqWithUser,
  ) {
    return this.projectsService.createProject(body, req, img);
  }
  @Get(':id')
  oneProject(@Param('id') id: string) {
    return this.projectsService.oneProject(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img'))
  updateProject(
    @UploadedFile() img: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
    @Req() req: ReqWithUser,
  ) {
    return this.projectsService.updateProject(id, body, req, img);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string, @Req() req: ReqWithUser) {
    return this.projectsService.deleteProject(id, req);
  }
}
