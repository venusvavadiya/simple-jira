import { CommandHandler } from '@simple-jira/domain-core';
import { RenameProjectCommand } from './command';

export class RenameProjectCommandHandler implements CommandHandler<RenameProjectCommand> {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, class-methods-use-this
  async handle(command: RenameProjectCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
