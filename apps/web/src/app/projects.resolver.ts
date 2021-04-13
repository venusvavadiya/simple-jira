import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import {
  CreateProjectCommand,
  CreateProjectCommandHandler,
  RenameProjectCommand,
  RenameProjectCommandHandler,
} from '@simple-jira/domain-project';
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
  async addProject(@Args('id') id: string) {
    await this.createProjectCommandHandler.handle(new CreateProjectCommand(id));
    return id;
  }

  @Mutation((returns) => String)
  async renameProject(@Args('id') id: string) {
    await this.renameProjectCommandHandler.handle(new RenameProjectCommand(id, 'New Name'));
    return id;
  }
}
