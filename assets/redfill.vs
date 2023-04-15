// Fills the screen with red, oh no!
export default function(_, t) {
    const tick = t % 3600
    let ops = []
    for (let i = 0; i < tick; ++i) {
        const x = i  % 80 - 1
        const y = Math.floor(i / 80)

        ops.push({
            pos: [x, y], width: 100, text: ' ', bgColor: 'red',
        })
    }
    return ops
}