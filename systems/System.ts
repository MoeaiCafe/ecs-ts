export interface System {
  initialize?(): void;
  execute?(): void;
  cleanup?(): void;
  tearDown?(): void;
}
