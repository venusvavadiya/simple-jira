import { CommandHandler } from '@simple-jira/domain-core';
import { ProjectAggregateRepository } from '../../aggregate-repository/project.aggregate-repository';
import { RenameProjectCommand } from './command';

export class RenameProjectCommandHandler implements CommandHandler<RenameProjectCommand> {
  constructor(private readonly projectAggregateRepository: ProjectAggregateRepository) {}

  async handle(command: RenameProjectCommand): Promise<void> {
    const projectAggregate = await this.projectAggregateRepository.getById(command.projectId);
    projectAggregate.rename(command.projectName);
    await this.projectAggregateRepository.save(projectAggregate);
  }
}
