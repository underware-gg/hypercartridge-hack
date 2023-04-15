type Text64Node = Text64Node[] | {
  pos: [number, number];
  child: Text64Node;
} | {
  pos: [number, number];
  width: number; // TODO: Optional
  text: string;
  color?: string;
};

export default function main(): Text64Node {
  return [
    {
      pos: [10, 10],
      width: 100,
      text: 'HyperCartridge',
    },
  ];
}
