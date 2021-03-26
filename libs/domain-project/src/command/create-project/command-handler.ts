import { CommandHandler } from '@simple-jira/domain-core';
import { CreateProjectCommand } from './command';

export class CreateProjectCommandHandler implements CommandHandler<CreateProjectCommand> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, class-methods-use-this
  async handle(command: CreateProjectCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
