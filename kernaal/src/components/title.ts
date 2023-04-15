import { Render64Fn } from "../Text64Node";

export const renderTitle: Render64Fn = (time, cursorPos) => {
    return [
        {
            pos: [10, 10],
            width: 100,
            text: 'Title',
        }
    ]
};
