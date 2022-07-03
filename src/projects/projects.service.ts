import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project.scheam';
import { ReqWithUser } from 'src/types/reqWithUser';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/uptadeProject.dto';

@Injectable()
export class ProjectsService {
  // TODO add ownership checker
  // TODO add multiple filtering options, optionali add cheach
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(body: CreateProjectDto, req: ReqWithUser) {
    const newProject = new this.projectModel({ ...body, owner: req.user });
    await newProject.save();
    return { mgs: 'create project', data: newProject };
  }

  async allProjects(req: ReqWithUser) {
    const { query, user } = req;

    if (query.currentUser) {
      const curretnUser = await this.projectModel.find({ _id: user });
      return { msg: 'curretn user', curretnUserProjects: curretnUser };
    }

    const allProjects = await this.projectModel.find();
    return { msg: 'all projects', allProjects: allProjects };
  }

  async oneProject(id: string) {
    const singleProject = await this.projectModel.findById(id);

    if (!singleProject)
      throw new HttpException('No project with this id', HttpStatus.NOT_FOUND);
    return 'single project ' + id;
  }

  async updateProject(id: string, body: UpdateProjectDto, req: ReqWithUser) {
    const project = await this.projectModel.findById(id);

    return project.owner;
  }

  deleteProject(id: string) {
    return 'delete project ' + id;
  }
}
