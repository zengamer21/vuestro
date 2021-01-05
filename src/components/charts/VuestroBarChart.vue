<template>
  <div class="vuestro-bar-chart" >
    <svg 
      id="testZoom"
      :width="width+2"
      :height="height"
      :style="{ transform: `translate(${margin.left}px, ${margin.top}px)
                            scale(${zoomScale})`}"
      @mousedown="onZoomPress"
      @mouseup="onZoomRelease"
      @mousemove="onZoomDrag"
    >
      <!-- BACKGROUND -->
      <g>
        <rect :width="width+2"
          :height="height"
          fill="black"
          opacity="0.75" />         
      </g>
      <!-- ZOOM -->
      <g>
        <rect v-if="enableZoom && showZoom"
          :x="zoomX"
          :y="zoomY"
          :width="zoomWidth"
          :height="zoomHeight"
          fill="red"
          opacity="0.75" />         
      </g>
      <!-- GRID -->
      <g v-if="enableGrid">
        <line v-for="line in gridX.x"
          :key="line.id"
          :x1="line+gridX.width"
          :x2="line+gridX.width"
          stroke="black"
          stroke-opacity="0.2"
          :y1="height-legendShift-gridPadding"
          :y2="0+gridPadding" />        
        <line v-for="line in gridY"
          :key="line.id"
          :x1="gridPadding"
          :x2="width-gridPadding"
          stroke="black"
          stroke-opacity="0.2"
          :y1="line.coordinate"
          :y2="line.coordinate" />
        <template v-if="enableYGridLabel">          
          <text v-for="line in gridY" 
            :key="line.id"
            :x="gridPadding-6"
            :y="line.coordinate+3"
            text-anchor="end"
            font-size="10px"
            fill="white">
            {{line.value}}
          </text>
        </template>
      </g>
      <!--BARS-->
      <g v-for="barSet in barsData" 
        :key="barSet.id">
        <rect v-for="bar in barSet.data"
          :key="bar.id"
          class="vuestro-bar-chart-bar"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          :fill="bar.color"
          fill-opacity="0.7"
          :stroke="bar.color"
          :barKey="bar.key"
          :barTitle="bar.title"
          :barValue="bar.value"
          @mousemove="onMouseover"
          @mouseleave="onMouseexit"
          @mouseenter="onMouseenter">
        </rect>
        <template v-if="enableLabels">
          <text v-for="barLabel in barSet.data" 
            :key="barLabel.id"
            :x="barLabel.x+barLabel.width/2"
            :y="barLabel.y-5"
            text-anchor="middle"
            font-size="10px"
            fill="white">
            {{barLabel.value}}
          </text>
        </template>     
        <template v-if="enableXGridLabel">          
          <text v-for="label in xLabels" 
            :key="label.id"
            :x="label.x"
            :y="height-gridPadding-legendShift+12"
            text-anchor="middle"
            font-size="10px"
            fill-opacity="0.2"
            fill="white"
            font-weight="normal">
            {{label.key}}
          </text>
        </template>
      </g>
      <!-- LEGEND -->
      <g v-if="enableLegend">
        <text font-size="10px" :x="0" :y="height-5">
          <tspan v-for="element in legendData"
              :key="element.id"
              dx="1.2em"
              :fill="element.color" 
              :stroke="element.color"
              stroke-width="2">|
              <tspan font-size="10px" fill="white" stroke="black" stroke-width="0">{{element.title}}</tspan>
          </tspan>
        </text> 
      </g>
      <!-- TOOLTIP -->
      <template v-if="enableToolTip && showToolTip">
        <!--<path class="vuestro-bar-chart-cursor" :d="cursorLine" />-->
        <vuestro-bar-svg-tooltip :x="mouseX"
                             :x-max="width"
                             :y="mouseY"
                             :y-max="height"
                             :toolData="toolTipData">
        </vuestro-bar-svg-tooltip>
      </template>
      <g ref="yAxis"></g>
    </svg>
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
        hideTooltip: false,
        utc: false,
        mouseX: 0,
        mouseY: 0,
        barsData: [],
        legendData: [],
        gridX: [],
        gridY: [],
        yGridMax: 0,
        yGridMin: 0,
        numYLines: 10,
        gridPadding: 0,
        yMax: 0,
        xLabels: [],
        toolTipData: {},
        showToolTip: false,
        zoomX: 0,
        zoomY: 0,
        zoomWidth: 0,
        zoomHeight: 0,
        zoomScale: 1,
        //options
        enableStacked: false,
        enableLegend: false,
        enableLabels: false,
        enableToolTip: false,
        legendShift: 0,
        enableGrid: false,
        enableZoom: false,
        showZoom: false,
        enableYGridLabel: false,
        enableXGridLabel: false,
      };
    },
    //computed methods reactively change to data changes, 
    //think of it as a dynamic data property 
    computed: {
      color() {
        //returns a function that has a range of this.colors
        return d3.scaleOrdinal(this.colors);
      },
      // process series prop by adding default colors
      processedSeries() {      
        //associates colors to the range in color's range
        let result = this.series.map((s) => {
          if (s.field && !s.color) {
            s.color = this.color(s.field);
          }
          return s;
        });
        return result;
      },
      getCursor() {
        return d3.area().x(d => d.center).y0(this.height).y1(0);
      },
    },
    //Loads options into reactive data 
    beforeMount() {
      _.merge(this, this.options);
    },
    //Called after previous lifecycle functions called
    mounted() {
      //on resize event call function this.resize
      window.addEventListener('resize', this.resize);
      this.resize();
      //this.updateYAxis();
    },
    //before removal call these functions
    beforeDestroy() {
      //removes event listener
      window.removeEventListener('resize', this.resize);
    },
    //support methods
    methods: {
      //generate legend data
      generateLegend() {
        this.legendData = [];
        for(let i=0; i<this.series.length; i++) {
          let legendKey = {}
          legendKey.title = this.series[i].title;
          legendKey.color = this.color(this.series[i].field);
          this.legendData.push(legendKey);
        }
      },
      //generate grid x
      generateGridX(scaleX) {
        let scale = {};
        let x = [];
        let width = scaleX.bandwidth()/this.series.length;
        let firstLine, lastLine;
        for(let i=0; i<this.localData.length; i++) {
          for(let j=0; j<this.series.length; j++) {
            scale.width = width/2;            
            x.push(scaleX(this.localData[i]["key"]) + j*(width+1));
          }
        }
        //last line
        x.push(x[x.length-1]+width);
        //first line
        x.push(x[0]-width);
        scale.x = x;
        this.gridX = scale;
      },
      //generate x grid labels
      generateXLabels() {
        let data = [];
        //stacked
        if(this.enableStacked) {
          //add label for each set of bars
          for(let i=0; i<this.barsData.length; i++) {
            let label = {};
            label.key = this.barsData[i].key;
            label.x = this.barsData[i].data[0].x+this.barsData[i].data[0].width/2;
            data.push(label);
          }
        }
        //unstacked
        else {
          //add label for each set of bars
          for(let i=0; i<this.barsData.length; i++) {
            let label = {};
            label.key = this.barsData[i].key;
            let barData = this.barsData[i].data;
            let totalX = 0;
            //average of number of bars
            for(let j=0; j<barData.length; j++) {
              totalX += barData[j].x;            
            }
            label.x = totalX/barData.length+this.barsData[i].data[0].width/2;
            data.push(label);
          }
        }
        this.xLabels = data;      
      },
      //generate grid y
      generateGridY() {
        let y = []
        //y grid max
        this.yGridMax = this.height-this.legendShift-this.gridPadding;
        //y grid min
        this.yGridMin = this.gridPadding;
        //value step
        let valueStep = this.yMax/this.numYLines;
        //step
        let step = (this.yGridMax-this.yGridMin)/this.numYLines;
        //set grid values
        for(let i=0; i<this.numYLines; i++) {
          let yGridObj = {};
          yGridObj.value = Math.trunc(i*valueStep);
          yGridObj.coordinate = this.yGridMax - i*step;
          y.push(yGridObj);
        }
        //last line
        y.push({value: this.yMax, coordinate: this.yGridMin});
        this.gridY = y;
        console.log(this.yMax);
      },
      //generate bar data
      generateBarData(scaleX, scaleY) {
        //reset bars data
        this.barsData = [];
        // set the bar descriptions
        for(let i=0; i<this.localData.length; i++) {
          //set key (date)
          let bars = {"key": this.localData[i].key}
          let barsData = [];
          //add bars data field
          bars.data = barsData;
          let first = true;
          let firstValue;
          for(let j=0; j<this.series.length; j++) {
            let bar = {};
            //append value
            bar.value = this.localData[i][this.series[j].field];
            //calculate width of bar
            bar.width = scaleX.bandwidth()/this.series.length;
            //call scaleX function on date key + index * width of bar
            //if stacks are enabled do not change x
            if(this.enableStacked) {
              if(first) {
                firstValue = scaleX(this.localData[i]["key"]);
                bar.x = firstValue;
                first = false;
              } else {
                bar.x = firstValue;
              }
            } else {
              bar.x = scaleX(this.localData[i]["key"]) + j*(bar.width+1);
            }
            //call scaleY function on 'data'['value1-3'] - 10
            bar.y = scaleY(this.localData[i][this.series[j].field])-this.legendShift;            
            //calculate height of bar
            bar.height = this.height - this.gridPadding - scaleY(this.localData[i][this.series[j].field]);
            //set title
            bar.title = this.series[j].title;
            //set color
            bar.color = this.color(this.series[j].field);
            //set key
            bar.key = this.localData[i]["key"];
            //append bar to bars data
            barsData.push(bar);
          }
          //if stacks are enabled sort heights
          if(this.enableStacked) {
            barsData.sort(function(a,b){return a.height-b.height});
            barsData = barsData.reverse()
          }
          //put bars data into dynamic data
          this.barsData.push(bars)          
        }   
        //generate x labels
        if(this.enableXGridLabel) {
          this.generateXLabels();
        }
      },
      resize() {
        //set legend shift if legend is enabled
        if(this.enableLegend) {
          this.legendShift = 20;
        }
        if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
          this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
          this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;        
          this.redraw();
        }
      },
      test() {
      /*  console.log(this.margin.left)
      // append the svg object to the body of the page
      var svg = d3.select("#testZoom")
          console.log(svg);
          svg.call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
          }))*/
      },
      redraw() {
        this.test();
        this.localData = _.cloneDeep(this.data);
        //function to scale x
        let scaleX = d3.scaleBand()
                      .domain(this.data.map((d) => { return d[this.categoryKey]; }))
                      .rangeRound([this.margin.left+this.gridPadding, this.width - this.margin.right-this.gridPadding])
                      .padding(this.padding);

        //function to scale y
        let scaleY = d3.scaleLinear().range([this.height-this.gridPadding, this.gridPadding+this.legendShift]);
        //d3.extent is a function that returns min and max of an array
        let extents = this.series.map((series) => {
          return d3.extent(this.localData, function(d) { return d[series.field]; });
        });        
        //set y max
        this.yMax = Math.trunc((d3.max(extents, function(d) { return d[1] * 1.1 ; })));        
        //add domain to function scale Y
        scaleY.domain([0, this.yMax]);
        //generate bar data
        this.generateBarData(scaleX, scaleY);
        //generate grid
        if(this.enableGrid) {
          this.generateGridX(scaleX);
          this.generateGridY(scaleY);
        }
        //generate legend
        if(this.enableLegend) {
          this.generateLegend();
        }
      },
      //enable zoom
      onZoomPress() {
        if(this.enableZoom) {
          this.showZoom = true;
          //save coordinates of click
          this.zoomXClick = event.offsetX;
          this.zoomYClick = event.offsetY;
          //set initial value of box
          this.zoomX = event.offsetX;
          this.zoomY = event.offsetY;
        }        
        this.zoomScale += 0.1;
        console.log(event);
        console.log("click");
      },
      //bounding box of zoom
      onZoomDrag() {
        if(this.enableZoom && this.showZoom) {
          //calculate x coordinate of box
          let widthDiff = this.zoomXClick - event.offsetX;
          this.zoomWidth = Math.abs(widthDiff);
          if(widthDiff > 0) {
            this.zoomX = event.offsetX;
          }
          //calculate y coordinate of box
          let heightDiff = this.zoomYClick - event.offsetY;
          this.zoomHeight = Math.abs(heightDiff);
          if(heightDiff > 0) {
            this.zoomY = event.offsetY;
          }            
        }
      },
      //disable zoom
      onZoomRelease() {
        if(this.enableZoom) {
          this.showZoom = false;
        }
      },
      //enable tooltip
      onMouseenter({ offsetX }) {
        this.showToolTip = true;
      },
      //disable tooltip
      onMouseexit({ offsetX }) {
        this.showToolTip = false;
      },
      //Tool tip data passed through event
      onMouseover({ offsetX }) {
        //track mouse
        this.mouseX = event.offsetX + 20;
        this.mouseY = event.offsetY - 20;
        //generate tool data
        let toolData = {};
        //stacked
        if(this.enableStacked) {
          //event data is passed through attributes of html
          toolData.key = event.target.attributes.barKey.value;
          //find data through bars data
          for(let i=0; i<this.barsData.length; i++) {
            //find set of stacked data
            if(toolData.key === this.barsData[i].key) {
              let barData = this.barsData[i].data;
              //create tooltip data
              toolData.data = [];
              for(let j=0; j<barData.length; j++) {
                toolData.data.push({
                  title: barData[j].title,
                  color: barData[j].color,
                  value: barData[j].value,
                })
              }
            }
          }
        } 
        //bars are not stacked
        else {
          //event data is passed through attributes of html
          toolData.key = event.target.attributes.barKey.value;
          toolData.data = [];
          toolData.data.push({
            title: event.target.attributes.barTitle.value,
            color: event.target.attributes.fill.value,
            value: event.target.attributes.barValue.value,
          });
        }

        //allow tooltip to be shown
        this.toolTipData = toolData;
      },
    },
  };
</script>

<style scoped>

.vuestro-bar-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vuestro-bar-chart-bar {
  transition: all 0.4s ease-in-out;
}

.vuestro-bar-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 1px;
  fill: none;
}

</style>