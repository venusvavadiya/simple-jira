import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { Project } from './models/project.model';

// eslint-disable-next-line no-unused-vars
@Resolver((of) => Project)
export class ProjectsResolver {
  // eslint-disable-next-line no-unused-vars
  @Query((returns) => Project)
  // eslint-disable-next-line class-methods-use-this
  project(): any {
    const project = new Project();
    project.id = 'abc';
    project.name = 'some other name';
    return project;
  }

  // eslint-disable-next-line no-unused-vars
  @Mutation((returns) => Boolean)
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  async addProject(@Args('id') id: string) {
    return true;
  }
}
