// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventData {}

export class Event<T extends EventData> {
  constructor(
    readonly type: string,
    readonly data: T,
    readonly timestamp = new Date(),
  ) {}
}
