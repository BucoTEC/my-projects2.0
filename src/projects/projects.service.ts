import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project.scheam';

@Injectable()
export class ProjectsService {
  // TODO add ownership checker
  // TODO add multiple filtering options, optionali add cheach
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  createProject() {
    return 'create project';
  }

  async allProjects() {
    const allProjects = await this.projectModel.find();
    return { msg: 'all projects', allProjects: allProjects };
  }

  async oneProject(id: string) {
    const singleProject = await this.projectModel.findById(id);

    if (!singleProject)
      throw new HttpException('No project with this id', HttpStatus.NOT_FOUND);
    return 'single project ' + id;
  }

  updateProject(id: string) {
    return 'update project ' + id;
  }

  deleteProject(id: string) {
    return 'delete project ' + id;
  }
}
