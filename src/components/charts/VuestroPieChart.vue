<template>
  <div class="vuestro-pie-chart" >
    <svg id="Pie" 
		:width="width"
        :height="height"
        :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
		>
		<!--
		@mousemove="onMouseover">
        -->
      <!--PIE-->
	  <g v-for="d in localData" :transform="`translate(${d.pieX},${d.pieY})`">
		<path v-for="s in processedSeries" :key="s.field"
			:d="d.arc"
			:fill="d.color"
			stroke="black"
			style="stroke-with: 4px; opacity: 0.7;"
			@mousemove="onMouseover"
			@mouseleave="onMouseexit"
			@mouseenter="onMouseenter"
		/>		
      </g> 
      <!--TOOLTIP-->
	  <template v-if="hideTooltip">
        <vuestro-svg-tooltip :x="0"
							 :x-max="width"
                             :categoryKey="categoryKey"
                             :utc="utc"
                             :series="toolKey"
                             :values="toolData">
        </vuestro-svg-tooltip>
      </template>
    </svg>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroPieChart',
  
  props: {
	data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },    
  
  data() {
    return {
      width: 0,
      height: 0,
	  toolKey: [],
      toolData: {},
	  localData: [],
      lastHoverPoint: {},
      cursorLine: '',
      colors: d3.schemeCategory10,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      categoryKey: 'key',
      series: [{
        field: 'value'
      }],
      stacked: false,
      padding: 0.1,
      hideTooltip: true,
      utc: false,
    };
  },
  
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    // process series prop by adding default colors
    processedSeries() {
	  console.log("series");
	  console.log(this.series);
	  let result = this.series.map((s) => {
	  
		console.log(s.field);
		console.log(s.color);
        if (s.field && !s.color) {
          s.color = this.color(s.field);
        }
		console.log(s.color);
        return s;
      });
	  console.log("Processed Series");
	  console.log(result);
      return result;
    },
    getCursor() {
      return d3.area().x(d => d.center).y0(this.height).y1(0);
    },
  },
  
  watch: {
    data(newVal) {
      this.redraw();
    },
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
  
  //Methods
  methods: {
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.redraw();
      }
    },
	
    getPie(v) {
    },
	
    redraw() {	  
	  let path = d3.select("path");
      this.localData = _.cloneDeep(this.data);
	  
	  //Append changing container values to container	  
	  //instantiate center of pie chart defaults to 150,150
	  let pieX=0, pieY=0;	  
	  if(document.getElementById('Pie').getAttribute("height") == 0) {
	    pieY = 150;
	  } else {
		pieY = document.getElementById('Pie').getAttribute("height")/2;	  
	  }	  
	  if(document.getElementById('Pie').getAttribute("width") == 0) {
	    pieX = 150;
	  } else {
	    pieX = document.getElementById('Pie').getAttribute("width")/2;
	  }	  

	  let pieData = {}
	  for(let i=0; i<this.localData.length; i++) {
		pieData[this.localData[i].key] = this.localData[i].value;
	  }
	  let pie = d3.pie()
		.value(function(d) {return d.value;});
	  let data_ready = pie(d3.entries(pieData));
	  	  
	  //Update values of pie chart
	  for(let i=0; i<this.localData.length; i++) {
		  //Set pie chart center and radius
		  this.localData[i]["pieX"] = pieX;
		  this.localData[i]["pieY"] = pieY;
		  this.localData[i]["pieRadius"] = pieY-5;		  
		  
		  //generate svg path data
		  let arcGenerator = d3.arc();
		  let pathData = arcGenerator({
			startAngle: data_ready[i]["startAngle"],
			endAngle: data_ready[i]["endAngle"],
			innerRadius: 0,
			outerRadius: pieY-5
		  });
		  
		  //set path data
		  this.localData[i]["arc"] = pathData;
		  
		  //set initial color
		  if(this.localData[i]["color"] === void(0)) {	
		    this.localData[i]["color"] = this.color(this.localData[i].value);
		  }		  
	  }	 	 
	  
	  
      let scaleX = d3.scaleBand()
                     .domain(this.data.map((d) => { return d[this.categoryKey]; }))
                     .rangeRound([this.margin.left, this.width - this.margin.right])
                     .padding(this.padding);

      let scaleY = d3.scaleLinear().range([this.height, 0]);
      let stackedData;
      let extents;
      if (this.stacked) {
        let keys = _.flatMap(this.series, 'field');
        stackedData = d3.stack().keys(keys)(this.localData);
        extents = this.series.map((series, idx) => {
          return d3.extent(_.flatten(stackedData[idx]));
        });
      } else {
        extents = this.series.map((series) => {
          return d3.extent(this.localData, function(d) { return d[series.field]; });
        });
      }
      scaleY.domain([0, d3.max(extents, function(d) { return d[1] * 1.1; })]);

      // set the pie descriptions
      for (let [di, d] of this.localData.entries()) {
        for (const [si, s] of this.series.entries()) {
          if (stackedData) {
            d[`${s.field}_y`] = scaleY(stackedData[si][di][0]);
            d[`${s.field}_height`] = scaleY(stackedData[si][di][1]);
          } else {
            d.width = scaleX.bandwidth() / this.series.length;
            d[`${s.field}_x`] = scaleX(d[this.categoryKey]) + si*(d.width + 1);
            d[`${s.field}_y`] = scaleY(d[s.field]) - 1;
            d[`${s.field}_height`] = this.height - scaleY(d[s.field]);
            d.center = scaleX(d[this.categoryKey]) + scaleX.bandwidth() / 2;
          }
        }
      }
    },
	
	//Update tooltip values
    onMouseover({ offsetX }) {
	  //console.log(event.target);	  
	  //console.log(event.target.attributes.d.nodeValue);
	  
	  //grab selected pie section
	  let pieSection = event.target.attributes.d.nodeValue;
	  	 	 
	  //grab data associated with pie section	
	  let pieSectionData;	  
	  for(let i=0; i<this.localData.length; i++) {
	    if(this.localData[i]["arc"] == pieSection) {
		  pieSectionData = this.localData[i];
		}
	  }		 
	  
	  //Set tool key
	  let toolLegend = [{
	    "title": pieSectionData.key,
		"field": "value1",
		"color": pieSectionData.color,
	  }];	  
	  this.data.toolKey = toolLegend;
	  
	  //Set tool data
	  let toolValue = [{
	    "value1": pieSectionData.value,
	  }]
	  this.data.toolData = toolValue;
	  
	  console.log(this.data.toolKey);
	  console.log(this.data.toolData);
	  console.log(this.data.categoryKey);
    },
	
	//Hide/show tooltip
	onMouseenter() {
	  this.data.hideTooltip = true;	  
	},
    onMouseexit() {
	  this.data.hideTooltip = false;	  
	},
	
    getClosestPoint(x) {
      return this.localData
        .map((point, index) => ({
          x: point[`${this.series[this.series.length-1].field}_x`],
          diff: Math.abs(point[`${this.series[this.series.length-1].field}_x`] - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onMouseleave() {
      this.cursorLine = '';
    },
  },
};

</script>

<style scoped>

.vuestro-pie-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vuestro-pie-chart-pie {
  transition: all 0.4s ease-in-out;
}

.vuestro-pie-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 1px;
  fill: none;
}

</style>