import * as d3 from 'd3';

export default (data, length, id, range) => {
  const x = d3
    .scaleBand()
    .domain(data.map((_, i) => i))
    .range([0, 100 * length]);

  const y = d3
    .scaleLinear()
    .domain(range || d3.extent(data))
    .range([95, 25]);

  const height = 5;

  d3
    .select(id)
    .selectAll('rect')
    .data(data)
    .join(
      enter => enter
        .append('rect')
        .attr('class', 'cursor-pointer')
        .attr('x', (_, i) => x(i))
        .attr('y', d => y(d) - height / 2)
        .attr('data-data', d => d)
        .attr('width', x.bandwidth())
        .attr('height', height),
      update => update
        .transition()     // <-- akin to a D3 selection, but interpolates values
        .duration(1000)     // <-- 1000 ms === 1 sec
        .ease(d3.easeCubic)
        .attr('class', 'cursor-pointer')
        .attr('x', (_, i) => x(i))
        .attr('y', d => y(d) - height / 2)
        .attr('data-data', d => d)
        .attr('width', x.bandwidth())
        .attr('height', height)
    )
    // .attr('class', 'cursor-pointer')
    // .attr('x', (_, i) => x(i))
    // .attr('y', d => y(d) - height / 2)
    // .attr('data-data', d => d)
    // .attr('width', x.bandwidth())
    // .attr('height', height)
    .on('mouseover', function () {
      const self = d3.select(this);
      self
        .attr('fill', 'red');
      d3.select(this.parentElement)
        .selectAll('text')
        .data([null])
        .join('text')
        .text(self.attr('data-data'))
        .attr('x', self.attr('x'))
        .attr('y', self.attr('y') - 5);
    })
    .on('mouseout', function () {
      d3
        .select(this)
        .attr('fill', '');
      d3.select(this.parentElement)
        .selectAll('text')
        .data([])
        .join('text');
    });
};
