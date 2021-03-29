import { EventListener, Event } from '@simple-jira/domain-core';

export class ProjectAggregateMongoDBEventListener implements EventListener {
  eventTypePrefixes = ['ProjectAggregate']

  // eslint-disable-next-line class-methods-use-this
  async on(event: Event) {
    console.log(event);
  }
}
