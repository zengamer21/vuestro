<template>
  <div class="vuestro-pie-chart" >
    <svg id="Pie" 
		  :width="width"
      :height="height"
      :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
		>
      <!--PIE-->
      <g v-for="d in localData" :transform="`translate(${d.pieX},${d.pieY})`">
        <path v-for="s in processedSeries"
          :key="s.field"
          :d="d.arc"
          :fill="d.color"
          stroke="black"
          style="stroke-with: 4px; opacity: 0.7;"
          @mousemove="onMouseover"
          @mouseleave="onMouseexit"
          @mouseenter="onMouseenter"
        />
        <text v-if="enableLabels"
          :x="d.label[0]"
          :y="d.label[1]"
          text-anchor="middle">
          {{d.key}}
        </text>
      </g> 
      <g>
        <text v-if="enableDonut"
          :x="pieX"
          :y="pieY+5"
          text-anchor="middle">
          {{donutTextValue}}
        </text>
      </g>
      
      <!--TOOLTIP-->
      <template v-if="showTooltip">
          <vuestro-svg-tooltip :x="toolTipLocationX"
                              :x-max="width"
                              :y="toolTipLocationY"
                              :y-max="height"
                              :categoryKey="categoryKey"
                              :utc="utc"
                              :series="processedSeries"
                              :values="localData[pieIndex]"/>
      </template>
      <!-- PIELEGEND -->
        <template v-for="(pieSection, index) in localData">
          <vuestro-svg-legend 
            v-if="enableLegend" 
            :pieSection="pieSection"
            :x="pieX-pieY-200"
            :y="18*(index+1)"
            :key="index"/>
        </template>
    </svg>
  </div>
</template>


<script>
/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroPieChart',
  
  //essentially static data
  props: {
	  data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },    
  
  //essentially dynamic data
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
      utc: false,
      showTooltip: false,
      pieIndex: 0,
      pieX: 0,
      pieY: 0,
      toolTipLocationX: 0,
      toolTipLocationY: 0,
      processedSeries: [{
        field: "value",
        title: "Value"
      }],
      //options
      enableLegend: false,
      enableLabels: false,
      enableToolTip: false,
      enableDonut: false,
      donutTextRender: null,
      donutTextValue: null,
      donutRadius: 0,
    };
  },
  

  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    /* No longer called
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
    },*/
  },
  /* UNUSED
  watch: {
    //called early in the component lifecycle, so basically initialization is redraw()
    data(newVal) {
      console.log("i'm called?")
      this.redraw();
    },
  },*/
  
  //load options data in
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
    //redraw if window changes
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.redraw();
      }
    },
    //redraw componenet
    redraw() {	  
      //clones this.data into dynamic localdata
      this.localData = _.cloneDeep(this.data);      
      //generate pie
      this.pieGenerate();
    },
    
    //Update tooltip values
    onMouseover({ offsetX }) {
      //console.log(event.target);	  
      //console.log(event.target.attributes.d.nodeValue);
      this.toolTipLocationX = event.offsetX+75;
      this.toolTipLocationY = event.offsetY;
      //grab selected pie section
      let pieSection = event.target.attributes.d.nodeValue;
          
      //grab data associated with pie section	
      let pieSectionData;	  
      for(let i=0; i<this.localData.length; i++) {
        if(this.localData[i]["arc"] == pieSection) {
          pieSectionData = this.localData[i];
          this.pieIndex = i;
        }
      }		 
      
      //THIS MAY STILL BE IMPLEMENTED
      //ATTEMPT TO CHANGE COLOR ON TOOLTIP BUT THIS IS SET BEFOREHAND SO CAN'T BE CHANGED DYNAMICALLY
      //this.processedSeries.color = pieSectionData.color;
      
      //Set tool data
      let toolValue = [{
        "value": pieSectionData.value,
      }]
      this.data.toolData = toolValue;    
    },
    //Hide/show tooltip
    onMouseenter() {
      if(this.enableToolTip)
        this.showTooltip = true; 
    },
    onMouseexit() {
      this.showTooltip = false;	  
    },
  
    //Helper functions
    //set pie center
    pieCenter() {
      if(document.getElementById('Pie').getAttribute("height") == 0) {
        this.pieY = this.height/2;
      } else {
        this.pieY = document.getElementById('Pie').getAttribute("height")/2;	  
      }	  
      if(document.getElementById('Pie').getAttribute("width") == 0) {
        this.pieX = this.width/2;
      } else {
        this.pieX = document.getElementById('Pie').getAttribute("width")/2;
      }	  
    },
    //create coordinates for labels
    pieLabels(data, index, innerRadius, arcGenerator) {
      //create label coordinates
      let labelData = arcGenerator.centroid({
        startAngle: data[index]["startAngle"],
        endAngle: data[index]["endAngle"],
        innerRadius: innerRadius,
        outerRadius: this.pieY-5,
      });
              
      //set label coordinates into local data
      this.localData[index]["label"] = labelData;
    },
    //generate pie
    pieGenerate() {      
      //Append changing container values to container	  
      //instantiate center of pie chart defaults to 150,150 
      this.pieCenter();
      //if donut is enabled
      let innerRadius = 0;
      if(this.enableDonut) {
        innerRadius = this.donutRadius;
        this.donutValueRender();
      }
      //create path object (section of pie)
      let path = d3.select("path");
      //create pie data to be ingested
      let pieData = {}
      for(let i=0; i<this.localData.length; i++) {
        pieData[this.localData[i].key] = this.localData[i].value;
      }
      //create pie object to computer starting/ending angles for pie sections
      let pie = d3.pie().value(function(d) {return d.value;});
      let data_ready = pie(d3.entries(pieData)); 
      //variable to store total
      let totalData = 0;         
      //Update values of pie chart
      for(let i=0; i<this.localData.length; i++) {
        //Record total
        totalData += this.localData[i]["value"];
        //Set pie chart center and radius
        this.localData[i]["pieX"] = this.pieX;
        this.localData[i]["pieY"] = this.pieY;
        //margin of 5px
        this.localData[i]["pieRadius"] = this.pieY-5;		          
        //generate svg path data (pie sections)
        let arcGenerator = d3.arc();
        let pathData = arcGenerator({
          startAngle: data_ready[i]["startAngle"],
          endAngle: data_ready[i]["endAngle"],
          innerRadius: innerRadius,
          outerRadius: this.pieY-5,
        });
        //set paths (pie sections) into local data
        this.localData[i]["arc"] = pathData;
        if(this.enableLabels) {
          this.pieLabels(data_ready, i, innerRadius, arcGenerator);
        }        
        //set initial color (do not change after setting)
        if(this.localData[i]["color"] === void(0)) {	
          this.localData[i]["color"] = this.color(this.localData[i].value);
        }		  
      }	 	 
      //store percentages
      for(let i=0; i<this.localData.length; i++) {
        this.localData[i]["valuePercentage"] = ((this.localData[i]["value"]/totalData)*100) + "%";
      }
    },
    //donut value render
    donutValueRender() {
      //if render function is passed in
      if(typeof(this.donutTextRender) === 'function') {
        this.donutTextValue = this.donutTextRender();
      }
      //if value is passed in
      else {
        this.donutTextValue = this.donutTextRender;
      }
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