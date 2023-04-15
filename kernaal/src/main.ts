import './style.css';

const canvas = new Array(45).fill(0).map(() => '░'.repeat(80));

canvas[3] = '░'.repeat(33) + 'HyperCartridge' + '░'.repeat(33);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
document.querySelector<HTMLDivElement>('#app')!.textContent = canvas.join('\n');
