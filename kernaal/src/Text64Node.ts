type Text64Node = Text64Node[] | {
  pos: [number, number];
  child: Text64Node;
} | {
  pos: [number, number];
  width: number; // TODO: Optional
  text: string;
  color?: string;
  bgColor?: string;
} | {
  box: {
    pos: [number, number];
    size: [number, number];
    color?: string;
  }
} | {
  onKeyDown: [string, Trigger]
};

export type Trigger = {
  op: unknown,
} | {
  loadCartridge: Record<string, string>,
};

export default Text64Node;

type Segment = {
  text: string;
  color?: string;
  bgColor?: string;
};

type Line = Segment[];

export function linesFromText64(
  size: [number, number],
  state: Text64Node,
): Line[] {
  const canvas: Segment[][] = new Array(size[1]).fill(0)
    .map(() =>
      new Array(size[0]).fill(0)
        .map(() => ({ text: ' ', color: '' })),
    );

  draw([0, 0], state, canvas);

  const simpleCanvas: Line[] = [];

  for (const row of canvas) {
    const line: Line = [];

    let segment: Segment = {
      text: '',
    };

    for (const s of row) {
      if (segment.text === '') {
        segment = {
          text: s.text,
          color: s.color,
        };

        continue;
      }

      if (s.color !== segment.color || s.bgColor !== segment.bgColor) {
        line.push(segment);
        segment = {
          text: s.text,
          color: s.color,
          bgColor: s.bgColor,
        };

        continue;
      }

      segment.text += s.text;
    }

    line.push(segment);
    simpleCanvas.push(line);
  }

  return simpleCanvas;
}

function draw(
  [x, y]: [number, number],
  node: Text64Node,
  canvas: Segment[][],
) {
  if (Array.isArray(node)) {
    for (const e of node) {
      draw([x, y], e, canvas);
    }
  } else if ('child' in node) {
    const [dx, dy] = node.pos;
    draw([x + dx, y + dy], node.child, canvas);
  } else if ('onKeyDown' in node) {
    // Do nothing
  } else if ('box' in node) {
    if (node.box.color === undefined) {
      return;
    }

    const [dx, dy] = node.box.pos;
    const [width, height] = node.box.size;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const currY = y + dy + i;
        const currX = x + dx + j;

        if (
          currY < 0 ||
          currY >= canvas.length ||
          currX < 0 ||
          currX >= canvas[0].length
        ) {
          continue;
        }

        canvas[currY][currX].bgColor = node.box.color;
      }
    }
  } else {
    const height = canvas.length;
    const width = canvas[0].length;
    let dx = 0;
    let dy = 0;

    for (const c of node.text) {
      const currY = y + node.pos[1] + dy;

      if (currY >= height) {
        break;
      }

      if (currY < 0) {
        continue;
      }

      const currX = x + node.pos[0] + dx;

      if (currX >= 0 && currX < width) {
        canvas[currY][currX].text = c;

        if (node.color !== undefined) {
          canvas[currY][currX].color = node.color;
        }

        if (node.bgColor !== undefined) {
          canvas[currY][currX].bgColor = node.bgColor;
        }
      }

      dx++;
      if (dx === node.width) {
        dx = 0;
        dy++;
      }
    }
  }
}

export function renderText64(
  size: [number, number],
  state: Text64Node,
) {
  const lines = linesFromText64(size, state);

  const screen = document.createElement('div');
  screen.classList.add('screen');

  for (const line of lines) {
    for (const segment of line) {
      const span = document.createElement('span');
      span.textContent = segment.text;

      if (segment.color) {
        span.style.color = segment.color;
      }

      if (segment.bgColor) {
        span.style.backgroundColor = segment.bgColor;
      }

      screen.appendChild(span);
    }

    const lineBreak = document.createTextNode('\n');
    screen.appendChild(lineBreak);
  }

  return screen;
}

export type Render64Fn = (time: number, cursorPos: [number, number]) => Text64Node;

export function getTriggers(node: Text64Node): Record<string, Trigger[]> {
  const triggers: Record<string, Trigger[]> = {};

  for (const [key, trigger] of getTriggerList(node)) {
    if (key in triggers) {
      triggers[key].push(trigger);
    } else {
      triggers[key] = [trigger];
    }
  }

  return triggers;
}

function getTriggerList(node: Text64Node): [string, Trigger][] {
  if (Array.isArray(node)) {
    return node.flatMap(getTriggerList);
  } else if ('child' in node) {
    return getTriggerList(node.child);
  } else if ('onKeyDown' in node) {
    return [node.onKeyDown];
  } else {
    return [];
  }
}
