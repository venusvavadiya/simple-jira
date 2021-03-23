import { Event } from '../event/event';
import { AggregateState } from './aggregate-state';

export interface Aggregator<T extends AggregateState> {
  init(): T
  [applyEvent: string]: (state: T, e: Event<unknown>) => T
}
