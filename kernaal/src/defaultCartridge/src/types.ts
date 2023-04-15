export type State = string;
export type Operation = never;

export type Text64Node = Text64Node[] | {
  pos: [number, number];
  child: Text64Node;
} | {
  pos: [number, number];
  width: number; // TODO: Optional
  text: string;
  color?: string;
} | {
  onKeyDown: [string, Trigger]
};

export type Trigger = {
  op: Operation,
};

export type StandardEvent = {
  keyDown: string;
};
