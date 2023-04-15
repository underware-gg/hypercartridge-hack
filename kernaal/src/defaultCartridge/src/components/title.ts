import { type Text64Node } from "../Text64Node";

export function renderTitle(time: number, cursorPos: [number, number]): Text64Node {
    return [
        {
            pos: [10, 10],
            width: 100,
            text: 'HyperCartridge',
        },
        {
            pos: [10, 15],
            width: 100,
            text: 'Edit',
            // selectable: true,
        },
        {
            pos: [10, 20],
            width: 100,
            text: 'Run',
            // selectable: true,
        },
    ];
};
