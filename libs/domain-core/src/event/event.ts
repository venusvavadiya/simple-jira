import { EventMetadata } from './event-metadata';

export interface Event<T> {
  readonly type: string
  readonly data: T
  readonly metadata: EventMetadata
}
