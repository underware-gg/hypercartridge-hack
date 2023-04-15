import  Text64Node from "../Text64Node";

const NUM_ELEMENTS = 6; 

const SPACING = 3; 

export const renderFileList = (cartName: string, files: { id: string, name: string }[], offset: number): Text64Node => {
    const shouldRenderUp = offset > 0;
    const shouldRenderDown = offset + NUM_ELEMENTS < files.length;
    const renderedFiles = files.slice(offset, offset + NUM_ELEMENTS);

    const nodes: Text64Node = [
        {
            pos: [10, 10],
            width: 100,
            text: `[${cartName}]`,
        },
        renderedFiles.map(({ name }, index) => ({
            pos: [10, 16 + index * SPACING],
            width: 100,
            text: name,
        }))
    ];

    if (shouldRenderUp) {
        nodes.unshift({
            pos: [10, 13],
            width: 100,
            text: '▲',
        })
    }

    if (shouldRenderDown) {
        nodes.push({
            pos: [10, 16 + NUM_ELEMENTS * SPACING],
            width: 100,
            text: '▼',
        })
    }
    
    return nodes;
};
