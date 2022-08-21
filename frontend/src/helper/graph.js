import { axisLeft, curveStep, extent, format, line, scaleLinear, select, transition } from 'd3';
import interpolate from './interpolate';

const graph = (el, id, data, feature, envelope, onMouseEnter, onMouseLeave) => {
  const points = interpolate(data);

  const featureData = feature ? [null] : [];
  const envelopeData = envelope ? [null] : [];
  const markData = !feature && !envelope ? [null] : [];

  const selection = select(el);

  const style = getComputedStyle(el);
  const width = +style.width.slice(0, style.width.length - 2);
  const height = +style.height.slice(0, style.height.length - 2);
  const margin = {
    x: 0.05 * width,
    y: 0.05 * height
  };
  const r = 2.5;
  const t = transition().duration(500);

  const x = scaleLinear()
    .domain([0, data.length])
    .range([margin.x, width]);
  const y = scaleLinear()
    .domain(extent(data))
    .range([height - margin.y, margin.y]);
  const get = {
    x: (_, i) => x(i),
    y: d => y(d)
  };

  const envelopeLine = line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

  const l = line()
    .x(get.x)
    .y(get.y)
    .curve(curveStep);

  const axis = axisLeft()
    .scale(y)
    .ticks(5, format('s'))
    .tickSizeOuter(0);

  selection
    .selectAll(`g.graph-${ id }-axis`)
    .data([null])
    .join(
      enter => enter
        .append('g')
        .attr('class', `graph-${ id }-axis`)
        .style('transform', `translate(${ margin.x }px)`)
        .call(axis),
      update => update
        .transition(t)
        .call(axis),
      exit => exit.remove()
    );

  selection
    .selectAll(`g.graph-${ id }-line`)
    .data([null])
    .join('g')
    .attr('class', `graph-${ id }-line`)
    .selectAll('path')
    .data(featureData)
    .join(
      enter => enter
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('d', l(data)),
      update => update
        .transition(t)
        .attr('d', l(data)),
      exit => exit.remove()
    );

  selection
    .selectAll(`g.graph-${ id }-mark`)
    .data([null])
    .join('g')
    .attr('class', `graph-${ id }-mark`)
    .selectAll('path')
    .data(markData)
    .join(
      enter => enter
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', '#aaa')
        .attr('stroke-width', 1)
        .attr('d', l(data)),
      update => update
        .transition(t)
        .attr('d', l(data)),
      exit => exit.remove()
    );

  selection
    .selectAll(`g.graph-${ id }-envelope`)
    .data([null])
    .join('g')
    .attr('class', `graph-${ id }-envelope`)
    .selectAll('path')
    .data(envelopeData)
    .join(
      enter => enter
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('d', envelopeLine(points)),
      update => update
        .transition(t)
        .attr('d', envelopeLine(points)),
      exit => exit.remove()
    );

  selection
    .selectAll(`g.graph-${ id }-data`)
    .data([null])
    .join('g')
    .attr('class', `graph-${ id }-data`)
    .selectAll('circle')
    .data(data)
    .join(
      enter => enter
        .append('circle')
        .on('mouseenter', (e, d) => {
          onMouseEnter?.(e, d);
          e.target.setAttribute('r', 5);
        })
        .on('mouseleave', e => {
          onMouseLeave?.(e);
          e.target.setAttribute('r', r);
        })
        .attr('class', 'track-datum')
        .attr('r', r)
        .attr('cx', get.x)
        .attr('cy', get.y),
      update => update
        .transition(t)
        .attr('cx', get.x)
        .attr('cy', get.y),
      exit => exit.remove()
    );
};

export default graph;
