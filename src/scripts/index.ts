import './common/initializer';

import * as d3 from 'd3';

type Container = d3.Selection<SVGGElement, unknown, HTMLElement, any>;

type Point = { x: number; y: number };

const positions442: Point[] = [
  { x: 34, y: 0 },
  { x: 8, y: 15 },
  { x: 25.333, y: 15 },
  { x: 42.666, y: 15 },
  { x: 60, y: 15 },
  { x: 8, y: 30 },
  { x: 25.333, y: 30 },
  { x: 42.666, y: 30 },
  { x: 60, y: 30 },
  { x: 25.333, y: 45 },
  { x: 42.666, y: 45 },
];

const positions4213: Point[] = [
  { x: 34, y: 0 },
  { x: 8, y: 15 },
  { x: 25.333, y: 15 },
  { x: 42.666, y: 15 },
  { x: 60, y: 15 },
  { x: 34, y: 25 },
  { x: 25.333, y: 35 },
  { x: 42.666, y: 35 },
  { x: 8, y: 40 },
  { x: 34, y: 45 },
  { x: 60, y: 40 },
];

const marginHorizontalPx = 60;
const marginVerticalPx = 30;
const xSize = 68;
const ySize = 105;

function getSize() {
  const pitchRatio = ySize / xSize;
  const windowRatio = window.innerHeight / window.innerWidth;

  if (pitchRatio > windowRatio) {
    return {
      width: window.innerHeight / pitchRatio,
      height: window.innerHeight - marginVerticalPx * 2,
    };
  }

  return {
    width: window.innerWidth - marginHorizontalPx * 2,
    height: window.innerWidth * pitchRatio,
  };
}

function drawBackground(container: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
  // define pattern
  const patternID = 'background-pattern';
  const defs = container.append('defs');
  const pattern = defs
    .append('pattern')
    .attr('id', patternID)
    .attr('width', 20)
    .attr('height', 20)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('patternTransform', 'rotate(45)');

  pattern
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', 20)
    .attr('stroke', '#abeecc')
    .attr('stroke-width', 28);

  // draw background
  container
    .append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', `#c0f2d9`);

  // draw line
  container
    .append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', `url(#${patternID})`);

  // define arrow head
  defs
    .append('marker')
    .attr('id', 'arrow-head')
    .attr('refX', 0)
    .attr('refY', 2)
    .attr('markerWidth', 4)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0,0 V 4 L4,2 Z')
    .attr('fill', '#000');
}

function drawLine(parent: Container, width: number, height: number) {
  const oneMeterBySize = width / xSize;

  // touch lines
  const lineWidth = width / 100;
  const lineContainer = parent.append('g');
  lineContainer
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', width)
    .attr('y1', 0)
    .attr('x2', width)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', 0 - lineWidth / 2)
    .attr('y1', 0)
    .attr('x2', width + lineWidth / 2)
    .attr('y2', 0)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', 0 - lineWidth / 2)
    .attr('y1', height)
    .attr('x2', width + lineWidth / 2)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  // center lines
  lineContainer
    .append('line')
    .attr('x1', 0)
    .attr('y1', height / 2)
    .attr('x2', width)
    .attr('y2', height / 2)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  // center circle
  lineContainer
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', oneMeterBySize * 9.15)
    .attr('fill', 'transparent')
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  // center dot
  lineContainer
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', lineWidth)
    .attr('fill', '#fff');

  // penalty zone
  const penaltyXMeter = (xSize - 40.3) / 2;
  const penaltyYMeter = 16.5;
  const penaltyX = oneMeterBySize * penaltyXMeter;
  const penaltyY = oneMeterBySize * penaltyYMeter;
  lineContainer
    .append('line')
    .attr('x1', penaltyX)
    .attr('y1', 0)
    .attr('x2', penaltyX)
    .attr('y2', penaltyY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', width - penaltyX)
    .attr('y1', 0)
    .attr('x2', width - penaltyX)
    .attr('y2', penaltyY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', penaltyX - lineWidth / 2)
    .attr('y1', penaltyY)
    .attr('x2', width - penaltyX + lineWidth / 2)
    .attr('y2', penaltyY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', penaltyX)
    .attr('y1', height - penaltyY)
    .attr('x2', penaltyX)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', width - penaltyX)
    .attr('y1', height - penaltyY)
    .attr('x2', width - penaltyX)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', penaltyX - lineWidth / 2)
    .attr('y1', height - penaltyY)
    .attr('x2', width - penaltyX + lineWidth / 2)
    .attr('y2', height - penaltyY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  // goal zone
  const goalXL = oneMeterBySize * (xSize / 2 - 7.32 / 2 - 5.5);
  const goalXR = oneMeterBySize * (xSize / 2 + 7.32 / 2 + 5.5);
  const goalY = oneMeterBySize * 5.5;
  lineContainer
    .append('line')
    .attr('x1', goalXL)
    .attr('y1', 0)
    .attr('x2', goalXL)
    .attr('y2', goalY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', goalXR)
    .attr('y1', 0)
    .attr('x2', goalXR)
    .attr('y2', goalY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', goalXL - lineWidth / 2)
    .attr('y1', goalY)
    .attr('x2', goalXR + lineWidth / 2)
    .attr('y2', goalY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', goalXL)
    .attr('y1', height - goalY)
    .attr('x2', goalXL)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', goalXR)
    .attr('y1', height - goalY)
    .attr('x2', goalXR)
    .attr('y2', height)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('line')
    .attr('x1', goalXL - lineWidth / 2)
    .attr('y1', height - goalY)
    .attr('x2', goalXR + lineWidth / 2)
    .attr('y2', height - goalY)
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  const goalDotY = oneMeterBySize * 11;
  lineContainer
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', goalDotY)
    .attr('r', lineWidth)
    .attr('fill', '#fff');

  lineContainer
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height - goalDotY)
    .attr('r', lineWidth)
    .attr('fill', '#fff');

  lineContainer
    .append('path')
    .attr('d', `M${width / 2 - oneMeterBySize * Math.sqrt(9.15 ** 2 - 5.5 ** 2)},${penaltyY} a72,72 0 0,0 116,0`)
    .attr('fill', 'transparent')
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('path')
    .attr(
      'd',
      `M${width / 2 + oneMeterBySize * Math.sqrt(9.15 ** 2 - 5.5 ** 2)},${height - penaltyY} a72,72 0 0,0 -116,0`,
    )
    .attr('fill', 'transparent')
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  // half space
  lineContainer
    .append('rect')
    .attr('x', penaltyX)
    .attr('y', 0)
    .attr('width', goalXL - penaltyX)
    .attr('height', height)
    .attr('fill', `rgba(255, 255, 255, 0.3)`);

  lineContainer
    .append('rect')
    .attr('x', goalXR)
    .attr('y', 0)
    .attr('width', goalXL - penaltyX)
    .attr('height', height)
    .attr('fill', `rgba(255, 255, 255, 0.3)`);

  // middle zone
  lineContainer
    .append('rect')
    .attr('x', 0 + lineWidth / 2)
    .attr('y', height / 3)
    .attr('width', width - lineWidth)
    .attr('height', height / 3)
    .attr('fill', `rgba(0, 0, 0, 0.1)`);

  // goal
  const goalSize = 2.5 * oneMeterBySize;
  lineContainer
    .append('rect')
    .attr('x', width / 2 - (7.32 / 2) * oneMeterBySize)
    .attr('y', -1 * goalSize)
    .attr('width', 7.32 * oneMeterBySize)
    .attr('height', goalSize)
    .attr('fill', 'transparent')
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);

  lineContainer
    .append('rect')
    .attr('x', width / 2 - (7.32 / 2) * oneMeterBySize)
    .attr('y', height)
    .attr('width', 7.32 * oneMeterBySize)
    .attr('height', goalSize)
    .attr('fill', 'transparent')
    .attr('stroke', '#fff')
    .attr('stroke-width', lineWidth);
}

function drawPatterns(parent: Container, width: number, _height: number) {
  const oneMeterBySize = width / xSize;
  const patternsContainer = parent.append('g');
  const lineWidth = width / 100 / 2;

  patternsContainer
    .append('rect')
    .attr('x', 10 * oneMeterBySize)
    .attr('y', 10 * oneMeterBySize)
    .attr('rx', 1 * oneMeterBySize)
    .attr('ry', 1 * oneMeterBySize)
    .attr('width', 20 * oneMeterBySize)
    .attr('height', 30 * oneMeterBySize)
    .attr('fill', '#fff9')
    .attr('stroke', '#000')
    .attr('stroke-width', lineWidth);

  patternsContainer
    .append('rect')
    .attr('x', 40 * oneMeterBySize)
    .attr('y', 50 * oneMeterBySize)
    .attr('rx', 0.5 * oneMeterBySize)
    .attr('ry', 0.5 * oneMeterBySize)
    .attr('width', 30 * oneMeterBySize)
    .attr('height', 10 * oneMeterBySize)
    .attr('fill', '#0003')
    .attr('stroke', '#000')
    .attr('stroke-width', lineWidth)
    .attr('stroke-dasharray', '5');

  patternsContainer
    .append('circle')
    .attr('cx', 5 * oneMeterBySize)
    .attr('cy', 5 * oneMeterBySize)
    .attr('r', oneMeterBySize * 4)
    .attr('fill', '#f006')
    .attr('stroke', '#ccc')
    .attr('stroke-width', lineWidth);

  patternsContainer
    .append('ellipse')
    .attr('cx', 45 * oneMeterBySize)
    .attr('cy', 70 * oneMeterBySize)
    .attr('rx', oneMeterBySize * 4)
    .attr('ry', oneMeterBySize * 9)
    .attr('fill', '#00f6')
    .attr('stroke', '#00f')
    .attr('stroke-width', lineWidth);

  patternsContainer
    .append('line')
    .attr('x1', 60 * oneMeterBySize)
    .attr('y1', 30 * oneMeterBySize)
    .attr('x2', 20 * oneMeterBySize)
    .attr('y2', 55 * oneMeterBySize)
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .attr('stroke-width', lineWidth)
    .attr('marker-end', 'url(#arrow-head)');
}

window.addEventListener('DOMContentLoaded', () => {
  // set the dimensions and margins of the graph
  const { width, height } = getSize();

  // append the svg object to the body of the page
  const svg = d3
    .select('#mount-point')
    .append('svg')
    .attr('class', 'Pitch')
    .attr('width', width + marginHorizontalPx * 2)
    .attr('height', height + marginVerticalPx * 2);

  // draw ground
  drawBackground(svg);

  // add in the line group
  const inTheLine = svg.append('g').attr('transform', `translate(${marginHorizontalPx}, ${marginVerticalPx})`);
  drawLine(inTheLine, width, height);

  // draw patterns
  const patternsParent = svg.append('g').attr('transform', `translate(${marginHorizontalPx}, ${marginVerticalPx})`);
  drawPatterns(patternsParent, width, height);

  // create X axis
  const xAxis = d3
    .scaleLinear()
    .domain([0, xSize])
    .range([0, width]);

  // create Y axis
  const yAxis = d3
    .scaleLinear()
    .domain([0, ySize])
    .range([height, 0]);

  // Add dots
  const rational = width / 40;
  const initialData = positions442;
  const dots = inTheLine
    .append('g')
    .attr('class', 'dots')
    .selectAll('circle')
    .data(initialData)
    .enter()
    .append('circle')
    .attr('cx', d => xAxis(d.x))
    .attr('cy', d => yAxis(d.y))
    .attr('r', rational)
    .attr('fill', '#f00')
    .attr('stroke', '#fff')
    .attr('stroke-width', rational / 4);

  const fontSize = width / 40;
  const texts = inTheLine
    .append('g')
    .attr('class', 'texts')
    .selectAll('text')
    .data(initialData)
    .enter()
    .append('text')
    .attr('x', d => xAxis(d.x))
    .attr('y', d => yAxis(d.y) + fontSize * 0.5)
    .attr('fill', '#fff')
    .attr('stroke', 'none')
    .attr('text-anchor', 'middle')
    .attr('font-size', fontSize)
    .attr('style', `font-family: sans-serif; font-weight: 700`)
    .text((_, i) => i + 1);

  setInterval(() => {
    const data = new Date().getSeconds() % 2 === 0 ? positions4213 : positions442;

    dots
      .data(data)
      .transition()
      .duration(400)
      .ease(d3.easeQuadOut)
      .attr('cx', d => xAxis(d.x))
      .attr('cy', d => yAxis(d.y));

    texts
      .data(data)
      .transition()
      .duration(400)
      .ease(d3.easeQuadOut)
      .attr('x', d => xAxis(d.x))
      .attr('y', d => yAxis(d.y) + fontSize * 0.5);
  }, 1000);
});
