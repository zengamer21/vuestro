<template>
  <div class="vuestro-bar-chart">
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroBarChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      width: 0,
      height: 0,
      fill: d3.scaleOrdinal(d3.schemeDark2),
      scaleX: null,
      scaleY: null,
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      valueKeys: ['value'],
    };
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  watch: {
    width() {
      this.redraw();
    },
  },
  methods: {
    resize() {
      this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
      this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
    },
    redraw() {
      let stack = d3.stack().keys(d3.range(this.data.length));
      let series = stack(this.data).map((data, i) => data.map(([y0, y1]) => [y0, y1, i]));

      this.scaleX = d3.scaleBand()
                     .domain(this.data.map(function(d) { return d.title; }))
                     .rangeRound([this.margin.left, this.width - this.margin.right])
                     .padding(0.08);
      this.scaleY = d3.scaleLinear()
                     .domain([0, d3.max(this.data, function(d) { return d.value; })])
                     .range([this.height - this.margin.bottom, this.margin.top]);

      var yAxis = d3.axisLeft(this.scaleY);

      var svg = d3.select(this.$el).append('svg')
          .attr('width', this.width)
          .attr('height', this.height)
        .append("g");

      // bars
      svg.selectAll('g')
        .data(series)
        .enter().append('g')
          .attr('fill', (d, i) => this.fill(i))
        .selectAll("rect")
        .data(d => d)
        .join('rect')
          .attr("x", (d) => { return this.scaleX(d.title); })
          .attr("y", this.height - this.margin.bottom)
          .attr("width", this.scaleX.bandwidth())
          .attr("height", (d) => { return this.height - this.scaleY(d.value); });

      // x axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(this.scaleX));

      // y axis
      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("value");

      this.grouped();
    },
    grouped() {
      this.scaleY.domain([0, yMax]);

      rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("x", (d, i) => this.scaleX(i) + this.scaleX.bandwidth() / n * d[2])
        .attr("width", this.scaleX.bandwidth() / n)
      .transition()
        .attr("y", d => y(d[1] - d[0]))
        .attr("height", d => y(0) - y(d[1] - d[0]));
    },
    stacked() {
      this.scaleY.domain([0, y1Max]);

      rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
      .transition()
        .attr("x", (d, i) => x(i))
        .attr("width", x.bandwidth());
    }
  },
};

</script>

<style scoped>

.vuestro-bar-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>