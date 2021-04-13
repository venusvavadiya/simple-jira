import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import {
  CreateProjectCommand,
  CreateProjectCommandHandler,
  RenameProjectCommand,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
import { v4 as uuidv4 } from 'uuid';
import { Project } from './read-models/project.model';

@Resolver((of) => Project)
export class ProjectsResolver {
  constructor(
    private readonly createProjectCommandHandler: CreateProjectCommandHandler,
    private readonly renameProjectCommandHandler: RenameProjectCommandHandler,
  ) {}

  @Query((returns) => String)
  hello(): string {
    return 'hello graphql';
  }

  @Mutation((returns) => String)
  async createProject() {
    const id = uuidv4();
    await this.createProjectCommandHandler.handle(new CreateProjectCommand(id));
    return id;
  }

  @Mutation((returns) => String)
  async renameProject(@Args('id') id: string, @Args('name') name: string) {
    await this.renameProjectCommandHandler.handle(new RenameProjectCommand(id, name));
    return id;
  }
}
