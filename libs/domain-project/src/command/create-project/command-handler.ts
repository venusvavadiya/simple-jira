import { CommandHandler } from '@simple-jira/domain-core';
import { ProjectAggregateRepository } from '../../aggregate-repository/project.aggregate-repository';
import { CreateProjectCommand } from './command';

export class CreateProjectCommandHandler implements CommandHandler<CreateProjectCommand> {
  constructor(private readonly projectAggregateRepository: ProjectAggregateRepository) {}

  async handle(command: CreateProjectCommand): Promise<void> {
    const projectAggregate = this.projectAggregateRepository.getNewInstance();
    projectAggregate.create(command.projectId);
    await this.projectAggregateRepository.save(projectAggregate);
  }
}
