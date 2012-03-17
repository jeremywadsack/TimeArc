
function TimeArc(canvasElement) {
  var ctx = canvasElement.getContext('2d');
  var width = canvasElement.width;
  var height = canvasElement.height;
  var centerX = width/2 + 0.5;
  var centerY = height/2 + 0.5;
  var maxRadius = Math.min(width / 2, height / 2);
  var black = "#000";
  var grey = "#eee";
  var darkGrey = "#ccc";
  var r1 = maxRadius / 3;
  var r2 = maxRadius * .41;
  var r3 = maxRadius * .48;
  var r4 = maxRadius - 2;


  this.render = function() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, r1, 0, Math.PI*2, false);
    ctx.arc(centerX, centerY, r2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.strokeStyle = black;
    ctx.stroke();
    ctx.fillStyle = black;
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "10pt sans-serif";

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (var i = 0; i < 12; i++) {
      var start = (1.5 * Math.PI + i * Math.PI / 6) %  (2 * Math.PI);
      textAlongArc(months[i], r1 * 1.05, start, start + Math.PI / 6);
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, r2, 0, Math.PI*2, false);
    ctx.arc(centerX, centerY, r3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.strokeStyle = black;
    ctx.stroke();
    ctx.fillStyle = grey;
    ctx.fill();

    circle(r4, darkGrey);
    circle(maxRadius, grey);

    for (r = 0; r < Math.PI * 2; r += Math.PI / 6) {
      lineFromPolar(r1, r, r2, r, grey);
    }

    for (r = 0, c = 0; r < Math.PI * 2; r += Math.PI / 24, c = ++c % 4) {
      lineFromPolar(r2, r, r3, r, c ? darkGrey : black);
      lineFromPolar(r3, r, r4, r, grey);
    }

  }

  function lineFromPolar(r1, a1, r2, a2, color) {
    ctx.beginPath();
    ctx.moveTo(centerX + r1 * Math.cos(a1), centerY + r1 * Math.sin(a1));
    ctx.lineTo(centerX + r2 * Math.cos(a2), centerY + r2 * Math.sin(a2));
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function circle(radius, color) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function textAlongArc(text, radius, angle1, angle2) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle1 + Math.PI / 2);
    // TODO: Text on the bottom half should be inverted to be upright
    var rot = (angle2 - angle1) / (text.length + 1);
    for (var i = 0; i < text.length; i++ ) {
      ctx.rotate(rot);
      ctx.fillText(text[i], radius * Math.cos(1.5 * Math.PI - rot/2), radius * Math.sin(1.5 * Math.PI - rot/2));
    }
    ctx.restore();
  }
}
