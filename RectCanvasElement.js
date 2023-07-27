import CanvasElement from "./CanvasElement.js";
class RectCanvasElement extends CanvasElement {
  constructor(props) {
    const { x, y, width, height, canvas } = props;
    super(x, y);

    const props = {
      width,
      height,
      canvas,
      ctx: canvas.getContext("2d"),
      // 是否激活状态
      isActive: false,
      // 是否旋转状态
      isRotate: false,
    };

    Object.assign(this, props);
  }

  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.rect(...this.genBasicProps());
    ctx.fill();
    ctx.restore();
  }

  setActive(isActive) {
    this.isActive = !!isActive;
    if (this.isActive) {
      this.renderActiveLayer();
    }
  }
  setRotate(isRotate) {
    this.isRotate = !!isRotate;
    if (this.isRotate) {
      // rotating
    }
  }

  isPointInElement(x, y) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = "transparent";
    ctx.rect(...this.genBasicProps());
    const result = ctx.isPointInStoke(x, y);
    ctx.restore();
    return result;
  }
  isPointInRotatePoint(x1, y1) {
    if (!this.isActive || !this.rotatePoint) return;
    const ctx = this.ctx;
    const { x, y, r } = this.rotatePoint;

    ctx.save();
    ctx.strokeStyle = "transparent";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    const result = ctx.isPointInStoke(x1, y1);
    return result;
  }
  renderActiveLayer() {
    const ctx = this.ctx;
    ctx.save();
    ctx.setLineDash([10, 10]);

    ctx.strokeRect(...this.genBasicProps());

    this.genRotatePoint((props) => {
      this.rotatePoint = props;
    });

    ctx.restore();
  }

  genBasicProps() {
    return [this.x, this.y, this.width, this.height];
  }
  genRotatePoint(cb = () => {}) {
    const ctx = this.ctx;
    const offset = 10;
    const r = 10;
    let side = "";
    const [x, y, width, height] = this.genBasicProps();
    let x1, y1;
    // left
    if (x > 2 * r + offset) {
      side = "left";
      x1 = x - (r + offset);
      y1 = y - height / 2;
    }
    // right
    else if (x + width + 2 * r + offset > ctx.canvas.width) {
      side = "right";
      x1 = x + width + r + offset;
      y1 = y - height / 2;
    }
    // top
    else if (y > 2 * r + offset) {
      side = "top";
      x1 = x + width / 2;
      y1 = y + r + offset;
    }
    // bottom
    else if (y + height + 2 * r + offset < ctx.canvas.height) {
      side = "bottom";
      x1 = x + width / 2;
      y1 = y - height - offset - r;
    }

    ctx.save();
    ctx.arc(x1, y1, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    cb({ x: x1, y: y1, r });
  }
}

export default RectCanvasElement;
