import { Command } from '@points-log/domain-core';

export class CreateProjectCommand implements Command {
  constructor(readonly projectId: string) {}
}
