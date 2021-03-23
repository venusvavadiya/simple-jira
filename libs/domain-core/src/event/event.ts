import { EventMetadata } from './event-metadata';

export interface Event<T> {
  readonly type: string
  readonly data: T
  readonly metadata: EventMetadata
}

export function newEvent<T>(type: string, data: T): Event<T> {
  const now = new Date();
  const metadata = { timestamp: now };
  return { type, data, metadata };
}
