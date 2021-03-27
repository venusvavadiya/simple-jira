import { EventMetadata } from './event-metadata';

export interface Event<T> {
  type: string
  data: T
  metadata: EventMetadata
}
