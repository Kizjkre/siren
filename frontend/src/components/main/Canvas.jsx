import { onMount } from 'solid-js';
import * as PIXI from 'pixi.js';

const Canvas = () => {
  let canvas;

  onMount(() => {
    const { width, height } = canvas.getBoundingClientRect();
    const app = new PIXI.Application({ width, height, backgroundAlpha: 0 });
    canvas.append(app.view);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x666666);
    graphics.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
    graphics.drawRect(0, 0, 208, 208);
    graphics.position.set(320 - 104, 180 - 104);
    app.stage.addChild(graphics);

    new ResizeObserver(() => {
      const { width, height } = canvas.getBoundingClientRect();
      app.renderer.resize(width, height);
    }).observe(canvas);
  });

  return (
    <div class="w-full h-full" ref={ canvas } />
  );
};

export default Canvas;
