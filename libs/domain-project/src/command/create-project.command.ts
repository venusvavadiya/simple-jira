import { Command } from '@simple-jira/domain-core';

export class CreateProjectCommand implements Command {
  constructor(readonly projectId: string) {}
}
