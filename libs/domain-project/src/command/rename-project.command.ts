import { Command } from '@points-log/domain-core';

export class RenameProjectCommand implements Command {
  constructor(
    readonly projectId: string,
    readonly projectName: string,
  ) {}
}
