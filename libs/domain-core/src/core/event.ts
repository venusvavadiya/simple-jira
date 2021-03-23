export interface EventMetadata {
  timestamp: Date
}

export interface Event<T> {
  type: string
  data: T
  metadata: EventMetadata
}

export function newEvent<T>(type: string, data: T): Event<T> {
  const now = new Date();
  const metadata = { timestamp: now };
  return { type, data, metadata };
}
