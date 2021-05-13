import { Controller, Get } from '@nestjs/common';
import {
  CreateProjectCommandHandler,
  CreateProjectCommand,
  RenameProjectCommandHandler,
  RenameProjectCommand,
} from '@simple-jira/domain-project';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(
    private readonly createProjectCommandHandler: CreateProjectCommandHandler,
    private readonly renameProjectCommandHandler: RenameProjectCommandHandler,
  ) {}

  @Get()
  async getData() {
    const id = uuidv4();

    const createProjectCommand = new CreateProjectCommand(id);
    await this.createProjectCommandHandler.handle(createProjectCommand);

    const renameProjectCommand = new RenameProjectCommand(id, 'New Name');
    await this.renameProjectCommandHandler.handle(renameProjectCommand);

    return { id };
  }
}
