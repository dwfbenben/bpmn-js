var diagramModule = require('../di').defaultModule;

// required components
require('../core/Events');
require('./Styles');


function flattenPoints(points) {
  var result = [];

  for (var i = 0, p; !!(p = points[i]); i++) {
    result.push(p.x);
    result.push(p.y);
  }

  return result;
}


/**
 * @class Renderer
 *
 * The default renderer used for shapes and connections.
 * 
 * @param {Events} events
 * @param {Styles} styles
 */
function Renderer(events, styles) {
  this.CONNECTION_STYLE = styles.style([ 'no-fill' ]);
  this.SHAPE_STYLE = styles.style({ fill: 'fuchsia' });
}

Renderer.prototype.drawShape = function drawShape(paper, data) {
  return paper.rect(0, 0, data.width, data.height, 10, 10).attr(this.SHAPE_STYLE);
};

Renderer.prototype.drawConnection = function drawConnection(paper, data) {
  var points = flattenPoints(data.waypoints);
  return paper.polyline(points).attr(this.CONNECTION_STYLE);
};


diagramModule.type('renderer', [ 'events', 'styles', Renderer ]);


module.exports = Renderer;
module.exports.flattenPoints = flattenPoints;