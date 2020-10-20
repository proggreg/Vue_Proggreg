export {roundRect,getRandomGrid}

function roundRect(context, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === "undefined") {
        stroke = true;
      }
      if (typeof radius === "undefined") {
        radius = 5;
      }
      if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      context.beginPath();
      context.moveTo(x + radius.tl, y);
      context.lineTo(x + width - radius.tr, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      context.lineTo(x + width, y + height - radius.br);
      context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius.br,
        y + height
      );
      context.lineTo(x + radius.bl, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      context.lineTo(x, y + radius.tl);
      context.quadraticCurveTo(x, y, x + radius.tl, y);
      context.closePath();
      if (fill) {
        context.fill();
      }
      if (stroke) {
        context.stroke();
      }
    }

function getRandomGrid(max, scale) {
    return (
    Math.floor(Math.random() * Math.floor(max / scale)) * scale
    );
}