import { EventData } from './event-data';
import { EventMetadata } from './event-metadata';

export interface Event<T extends EventData> {
  readonly type: string
  readonly data: T
  readonly metadata: EventMetadata
}

export function newEvent<T extends EventData>(
  type: string,
  data: T,
): Event<T> {
  const now = new Date();
  const metadata = { timestamp: now };
  return { type, data, metadata };
}
