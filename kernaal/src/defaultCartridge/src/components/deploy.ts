import { type Text64Node } from "../Text64Node";
import { renderFooterNav } from "./footerNav";

export function renderDeploy(): Text64Node { 
    return [
        {
            pos: [10, 10],
            width: 100,
            text: 'Deploy',
        },
        renderFooterNav(['[U]p', '[D]own', 'Enter']),
    ];

}
