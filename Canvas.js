class Canvas {
  constructor(props) {
    let { canvas, size, canvasElements } = props;
    const context = canvas.getContext("2d");

    !size && (size = [canvas.width, canvas.height]);
    !canvasElements && (canvasElements = []);

    Object.assign(this, {
      canvas,
      context,
      ctx: context,

      steps: [],
      canvasElements,
      size,
    });
  }

  initAxis() {
    const { ctx, canvas } = this;
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.save();
  }

  initEventListener() {
    this.canvas.addEventListener();
  }
}
