export interface CommandHandler<T> {
  handle(command: T): Promise<void>
}
