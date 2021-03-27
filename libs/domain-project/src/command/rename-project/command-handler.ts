import { CommandHandler } from '@simple-jira/domain-core';
import { ProjectAggregateRepository } from '../../aggregate-repository/project.aggregate-repository';
import { RenameProjectCommand } from './command';

export class RenameProjectCommandHandler implements CommandHandler<RenameProjectCommand> {
  constructor(private readonly projectAggregateRepository: ProjectAggregateRepository) {}

  async handle(command: RenameProjectCommand): Promise<void> {
    const { projectId, projectName } = command;
    const projectAggregate = await this.projectAggregateRepository.getById(projectId);
    projectAggregate.rename(projectName);
    await this.projectAggregateRepository.save(projectAggregate);
  }
}
