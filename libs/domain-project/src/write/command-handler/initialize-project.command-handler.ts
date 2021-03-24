import { CommandHandler } from '@simple-jira/domain-core';
import { ProjectAggregateRepository } from '../aggregate-repository/project.aggregate-repository';
import { ProjectAggregate } from '../aggregate/project.aggregate';

interface InitializeProjectCommand {
  projectId: string
}

export class InitializeProjectCommandHandler implements CommandHandler<InitializeProjectCommand> {
  constructor(private readonly projectAggregateRepository: ProjectAggregateRepository) {}

  async handle(command: InitializeProjectCommand): Promise<void> {
    const id = command.projectId;
    const projectAggregate = new ProjectAggregate();
    projectAggregate.initialize(id);
    await this.projectAggregateRepository.save(projectAggregate);
  }
}
