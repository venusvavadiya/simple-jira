import { Command } from '@simple-jira/domain-core';

export class RenameProjectCommand implements Command {
  constructor(
    readonly projectId: string,
    readonly projectName: string,
  ) {}
}
