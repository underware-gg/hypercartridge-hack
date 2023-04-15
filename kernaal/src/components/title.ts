import { Render64Fn } from "../Text64Node";

export const renderTitle: Render64Fn = (time, cursorPos) => {
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
            selectable: true,
        },
        {
            pos: [10, 20],
            width: 100,
            text: 'Run',
            selectable: true,
        },
    ];
};
