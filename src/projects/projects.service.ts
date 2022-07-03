import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  // TODO add CRUD functtionaliti on project model
  // TODO add ownership checker
  // TODO add multiple filtering options, optionali add cheach

  createProject() {
    return 'create project';
  }

  allProjects() {
    return 'all projects';
  }

  oneProject(id: string) {
    return 'single project ' + id;
  }

  updateProject(id: string) {
    return 'update project ' + id;
  }

  deleteProject(id: string) {
    return 'delete project ' + id;
  }
}
