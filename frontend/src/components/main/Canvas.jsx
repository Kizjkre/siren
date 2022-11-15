import { onMount } from 'solid-js';
import * as PIXI from 'pixi.js';

const Canvas = () => {
  let canvas;

  onMount(() => {
    const { width, height } = canvas.getBoundingClientRect();
    const app = new PIXI.Application({ width, height });
    canvas.append(app.view);
  });

  return (
    <div class="w-full h-full" ref={ canvas } />
  );
};

export default Canvas;
