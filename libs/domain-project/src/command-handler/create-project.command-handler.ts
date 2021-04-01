import { CommandHandler } from '@points-log/domain-core';
import { ProjectAggregateRepository } from '../aggregate-repository/project.aggregate-repository';
import { CreateProjectCommand } from '../command/create-project.command';

export class CreateProjectCommandHandler implements CommandHandler<CreateProjectCommand> {
  constructor(private readonly projectAggregateRepository: ProjectAggregateRepository) {}

  async handle(command: CreateProjectCommand): Promise<void> {
    const { projectId } = command;
    const projectAggregate = this.projectAggregateRepository.getNewInstance();
    projectAggregate.create(projectId);
    await this.projectAggregateRepository.save(projectAggregate);
  }
}
