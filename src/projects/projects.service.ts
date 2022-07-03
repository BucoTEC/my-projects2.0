import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Project, ProjectDocument } from 'src/schemas/project.scheam';
import { ReqWithUser } from 'src/types/reqWithUser';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/uptadeProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async createProject(
    body: CreateProjectDto,
    req: ReqWithUser,
    img: Express.Multer.File,
  ) {
    if (img) {
      const uploadRes = await this.cloudinary.uploadImage(img).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      const newProject = new this.projectModel({
        ...body,
        owner: req.user,
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id,
      });
      await newProject.save();
      return { mgs: 'create project', data: newProject };
    }
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
    return { msg: 'singe project', data: singleProject };
  }

  async updateProject(
    id: string,
    body: UpdateProjectDto,
    req: ReqWithUser,
    img: Express.Multer.File,
  ) {
    const project = await this.projectModel.findById(id);

    if (req.user !== String(project.owner)) {
      throw new HttpException('You are not the owner', HttpStatus.FORBIDDEN);
    }

    if (img) {
      await this.cloudinary.deleteImage(project.public_id);
      const uploadRes = await this.cloudinary.uploadImage(img).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });
      await project.updateOne({
        ...body,
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id,
      });
      return 'project updated successfuly';
    }
    await project.updateOne(body);
    return 'project updated successfuly';
  }

  async deleteProject(id: string, req: ReqWithUser) {
    const project = await this.projectModel.findById(id);

    if (req.user !== String(project.owner)) {
      throw new HttpException('You are not the owner', HttpStatus.FORBIDDEN);
    }

    await this.cloudinary.deleteImage(project.public_id);

    await project.delete();
    return 'delete succesfuly deletes';
  }
}
