<template>
  <!-- DIVISION BAR CHART -->
  <div class="vuestro-bar-chart" style="background-color:#3F3F3F;" >
    <!-- BUTTONS -->
    <div>
      <!-- BRUSH -->
      <template v-if="enableZoom">
        <div id="zoom-brush">
          <vuestro-button 
            :checkbox="true" 
            :value="zoomBrush"
            v-on:click="checkZoomBrush">Zoom Brush</vuestro-button>
        </div>
      </template>
      <!-- ZOOM OUT -->      
      <template v-if="enableZoom && zoomed">
        <div id="reset-zoom">
          <vuestro-button
            v-on:click="resetZoom">Reset
          </vuestro-button>
        </div>
      </template>
    </div>
    <div>
      <!-- BAR CHART -->
      <svg 
        :width="svgWidth"
        :height="svgHeight"
        @mousedown="onZoomPress"
        @mouseup="onZoomRelease"
        @mousemove="onZoomDrag"
      >
        <!-- GRID -->
        <template v-if="enableGrid">
          <g 
            stroke="black"
            stroke-opacity="0.2">
            <!-- X LINES -->
            <line v-for="x in xGrid"
              :key="x.id"
              :x1="x"
              :x2="x"
              :y1="chartHeight + chartMargin.top"
              :y2="chartMargin.top" /> 
            <!-- Y LINES -->       
            <line v-for="y in yGrid"
              :key="y.id"
              :x1="chartMargin.left"
              :x2="chartWidth + chartMargin.left"
              :y1="y"
              :y2="y"/>
          </g> 
        </template>       
        <!-- X Labels --> 
        <template v-if="enableXGridLabel">   
          <g 
            text-anchor="middle"
            font-size="10px"
            fill="white">          
            <text v-for="label in xLabels" 
              :key="label.id"
              :x="label.x"
              :y="chartMargin.top + chartHeight + 10">
              {{label.value}}
            </text>
          </g>
        </template> 
        <!-- Y Labels --> 
        <template v-if="enableYGridLabel">   
          <g 
            text-anchor="end"
            font-size="10px"
            fill="white">          
            <text v-for="label in yLabels" 
              :key="label.id"
              :x="chartMargin.left-4"
              :y="label.y+3">
              {{label.value}}
            </text>
          </g>
        </template>    
        <!-- ZOOM -->
        <g>
          <rect v-if="enableZoom && showZoom && zoomBrush"
            :x="xZoom"
            :y="yZoom"
            :width="zoomWidth"
            :height="zoomHeight"
            fill="red"
            opacity="0.75" />         
        </g>
        <!--BARS -->
        <g>
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
            <template v-if="enableLabels && !zoomed">
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
          </g>
        </g>
        <!-- LEGEND -->
        <template v-if="enableLegend">
          <text font-size="10px" :x="chartMargin.left" :y="svgHeight - 5">
            <tspan v-for="element in legendData"
                :key="element.id"            
                dx="1.2em"
                :fill="element.color" 
                :stroke="element.color"
                stroke-width="2">|
                <tspan fill="white" stroke="black" stroke-width="0">{{element.title}}</tspan>
            </tspan>
          </text> 
        </template>
        <!-- TOOLTIP -->
        <template v-if="enableToolTip && showToolTip">
          <vuestro-bar-svg-tooltip 
            :x="toolX"
            :x-max="svgWidth"
            :y="toolY"
            :y-max="svgHeight"
            :toolData="toolTipData">
          </vuestro-bar-svg-tooltip>
        </template>
      </svg>
    </div>
  </div>
</template>

<script>
  /* global _ */
  import * as d3 from 'd3';
import VuestroButton from '../VuestroButton.vue';
  export default {
  components: { VuestroButton },
    name: 'VuestroBarChart',
    props: {
      data: { type: Array, default: () => [] },
      options: { type: Object, default: () => {} },
    },
    data() {
      return {
        //default settings
        colors: d3.schemeCategory10,
        padding: 0.1,
        //svg dimensions
        svgWidth: 0,
        svgHeight: 0,
        //chart dimensions
        chartWidth: 0,
        chartHeight: 0,
        chartMargin: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        //input data
        localData: [],        
        categoryKey: 'key',
        series: [{
          field: 'value'
        }],
        //bars data
        barsData: [],
        //legend data
        legendData: [],
        legendShift: 0,
        //grid data
        xGrid: [],
        yGrid: [],
        gridPadding: 0,
        //labels data
        xLabels: [],
        yLabels: [],
        //tool tip data
        toolX: 0,
        toolY: 0,
        toolTipData: {},
        showToolTip: false,
        //zoom box data
        zoomBrush: false,
        showZoom: false,
        xZoom: 0,
        yZoom: 0,
        xZoomScale: 0,
        yZoomScale: 0,
        zoomWidth: 0,
        zoomHeight: 0,
        zoomed: false,
        //options
        enableStacked: false,
        enableLegend: false,
        enableLabels: false,
        enableToolTip: false,
        enableGrid: false,
        enableZoom: false,
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
      //view box is resized
      resize() {
        //view box doesn't exist
        if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
          //set legend shift if legend is enabled
          if(this.enableLegend) {
            this.legendShift = 20;
          }
          //SVG
          this.svgWidth = this.$el.clientWidth;
          this.svgHeight = this.$el.clientHeight;
          //chart padding          
          this.chartMargin.left = this.gridPadding;
          this.chartMargin.right = this.gridPadding;
          this.chartMargin.bottom = this.legendShift + this.gridPadding;
          this.chartMargin.top = this.gridPadding;
          //chart dimensions
          this.chartWidth = this.svgWidth - this.chartMargin.left - this.chartMargin.right;
          this.chartHeight = this.svgHeight - this.chartMargin.top - this.chartMargin.bottom;
          //redraw svg
          this.redraw();
        }
      },
      //redraw svg
      redraw() {
        this.localData = _.cloneDeep(this.data);        
        //function to scale x
        let xScale = this.generateXScale();
        //d3.extent is a function that returns min and max of an array
        let extents = this.series.map((series) => {
          return d3.extent(this.localData, function(d) { return d[series.field]; });
        });       
        //set y max (increase max a little so bar does not reach top of graph)
        let yMax = Math.trunc((d3.max(extents, function(d) { return d[1] * 1.1 ; })));        
        //function to scale y
        let yScale = this.generateYScale(
          0, yMax, 
          this.chartHeight+this.chartMargin.top, this.chartMargin.top);  
        //generate bar data
        this.generateBarData(xScale, yScale);
        //generate grid        
        if(this.enableGrid) {
          this.generateXGrid(xScale);
          this.generateYGrid(0, yMax, yScale);
        }
        //generate legend
        if(this.enableLegend) {
          this.generateLegend();
        }
        //generate x labels
        if(this.enableXGridLabel) {
          this.generateXLabels(xScale);
        }
        //generate y labels
        if(this.enableYGridLabel) {
          this.generateYLabels(yMax, yScale);
        }
      },
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
      //generate scale for x
      generateXScale() {
        let xScale = d3.scaleBand()
          .domain(this.data.map((d) => { return d[this.categoryKey]; }))
          .rangeRound([this.chartMargin.left, this.chartMargin.left + this.chartWidth])
          .padding(this.padding);
        return xScale;
      },
      //generate scale for y
      generateYScale(min, max, yMin, yMax) {
        //function to scale y, add range (pixel range)
        let yScale = d3.scaleLinear().range([yMin, yMax]);        
        //add domain to function scale Y
        yScale.domain([min, max]);
        //return scale
        return yScale;
      },      
      //generate x grid
      generateXGrid(xScale) {
        //generate x coordinates
        let x = [];
        //stacked
        let width;
        if(this.enableStacked) {
          //bars are stacked
          width = xScale.bandwidth();
        } else {
          //width of bar set is divided by number of bars
          width = xScale.bandwidth()/this.series.length;
        }         
        //pretty shift
        let barCenter = width/2;
        //for every set of bars
        for(let i=0; i<this.localData.length; i++) {
          //stacked
          if(this.enableStacked) {
            //calculate x coordinate            
            x.push(xScale(this.localData[i]["key"]) + barCenter);
          } 
          //unstacked
          else {
            //for ever bar
            for(let j=0; j<this.series.length; j++) {
              //calculate x coordinate            
              x.push(xScale(this.localData[i]["key"]) + j*(width) + barCenter);
            } 
          }
        }        
        //first x
        x.push(this.chartMargin.left);
        //last x
        x.push(this.chartWidth+this.chartMargin.left);
        this.xGrid = x;
      },      
      //generate y grid
      generateYGrid(min, max, yScale) {
        //create y grid lines
        let y = [];
        //get ticks from scale
        let ticks = yScale.ticks();
        //get coordinates from tick values
        for(let i=0; i<ticks.length; i++) {
          y.push(yScale(ticks[i]));
        }
        //last line
        y.push(yScale(max));
        //save grid values
        this.yGrid = y;
      }, 
      //generate x labels
      generateXLabels(xScale) {
        //generate x coordinates
        let labels = [];
        //set width
        let barCenter = xScale.bandwidth()/2;
        //for every set of bars
        for(let i=0; i<this.localData.length; i++) {
          //generate label
          let label = {};
          //set x coordinate 
          label.x = xScale(this.localData[i]["key"]) + barCenter;          
          //set value 
          label.value = this.localData[i]["key"];
          //push label
          labels.push(label);
        }        
        //save labels
        this.xLabels = labels;
      },      
      //generate y grid labels
      generateYLabels(max, yScale) {
        //generate y labels
        let labels = [];
        //get ticks from scale
        let ticks = yScale.ticks();
        //get coordinates from tick values
        for(let i=0; i<ticks.length; i++) {
          //generate label
          let label = {};
          //set y coordinate
          label.y = yScale(ticks[i]);
          //set value
          label.value = ticks[i];
          //push label
          labels.push(label);
        }
        //last label
        labels.push({y: this.chartMargin.top, value: max});
        //save label values
        this.yLabels = labels;
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
            //call scaleX function on date key + index * width of bar
            //if stacks are enabled do not change x
            if(this.enableStacked) {
              if(first) {
                firstValue = scaleX(this.localData[i]["key"]);
                first = false;
              } 
              //set width
              bar.width = scaleX.bandwidth();
              bar.x = firstValue;
            } else {
              //set width
              bar.width = scaleX.bandwidth()/this.series.length;
              bar.x = scaleX(this.localData[i]["key"]) + j*(bar.width);
            }
            //call scaleY function on 'data'['value1-3'] - 10
            bar.y = scaleY(this.localData[i][this.series[j].field]);            
            //calculate height of bar
            bar.height = this.chartHeight + this.chartMargin.top - scaleY(this.localData[i][this.series[j].field]);
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
            //sort lowest to highest
            barsData.sort(function(a,b){return a.height-b.height});
            //reverse sort so highest is drawn first
            barsData = barsData.reverse()
          }
          //put bars data into dynamic data
          this.barsData.push(bars)          
        } 
      },
      //click for zoom
      onZoomPress() {
        //check if zoom is enabled
        if(this.enableZoom && this.zoomBrush) {
          //enable draw box
          this.showZoom = true;
          //save coordinates of click
          this.xZoomClick = event.offsetX;
          this.yZoomClick = event.offsetY;
          //set initial value of box
          this.xZoom = event.offsetX;
          this.yZoom = event.offsetY;
        }        
      },
      //bounding box of zoom
      onZoomDrag() {
        if(this.enableZoom && this.showZoom && this.zoomBrush) {          
          //calculate x coordinate of box
          let xDelta = event.offsetX;
          //calculate width
          let xDiff = this.xZoomClick - xDelta;
          //drags right
          if(xDiff < 0) {
            this.xZoom = this.xZoomClick;
          } 
          //drags left
          else {
            this.xZoom = this.xZoomClick - xDiff;
          }
          //update width of zoom box
          this.zoomWidth = Math.abs(xDiff);
          //calculate y coordinate of box
          let yDelta = event.offsetY;
          //calculate y offset difference
          let yDiff = this.yZoomClick - yDelta;
          //calculate height aspect ratio and update height of zoom box
          this.zoomHeight = (this.chartHeight/this.chartWidth)*this.zoomWidth;
          //drags up
          if(yDiff > 0) {
            this.yZoom = this.yZoomClick-this.zoomHeight;
          }
          //drags down
          else {
            this.yZoom = this.yZoomClick;
          }           
        }
      },
      //check/uncheck
      checkZoomBrush() {
        //untick or tick checkbox
        if(this.zoomBrush) {
          this.zoomBrush = false;
        } else {
          this.zoomBrush = true;
        }        
      },
      //reset chart
      resetZoom() {
        console.log("clicked");
        this.redraw();
        this.zoomed = false;
      },
      //disable zoom
      onZoomRelease() {
        if(this.enableZoom && this.zoomBrush) { 
          //calculate y min and y max pixel
          let yMin, yMax;
          if(this.yZoomClick > event.offsetY) {
            yMin = this.yZoomClick;
            yMax = this.yZoomClick-this.zoomHeight;
          } else {
            yMin = this.yZoomClick+this.zoomHeight;
            yMax = this.yZoomClick;
          }
          //calculate x min and x max pixel
          let xMin = this.xZoom;
          let xMax = this.xZoom + this.zoomWidth;      
          //generate zoom scales
          this.calculateZoom();
          //update x grid and labels
          this.updateXZoom(xMin, xMax);
          //update y grid and labels 
          this.updateYZoom(yMin, yMax);    
          //update bars
          this.updateZoomBars(xMin, xMax, yMin, yMax);
          //turn off zoom box
          this.showZoom = false;
          //zoomed
          this.zoomed = true;
        }; 
      },
      //update x grid and labels
      updateXZoom(xStart, xEnd) {        
        //update x labels
        this.updateXZoomLabels(xStart, xEnd);
        //update x grid
        this.updateXZoomGrid(xStart, xEnd);
      },
      //update y grid and labels
      updateYZoom(yStart, yEnd) {          
        //set y max
        let yMax = this.yLabels[this.yLabels.length-1].value;
        //set y min
        let yMin = this.yLabels[0].value;
        //function to scale y        
        let yScale = this.generateYScale(this.chartMargin.top+this.chartHeight, this.chartMargin.top, yMin, yMax);
        //calculate new min and new max
        let newMin = Math.trunc(yScale(yStart));
        let newMax = Math.trunc(yScale(yEnd));
        //generate new scale with new min/max
        this.yZoomScale = this.generateYScale(newMin, newMax,this.chartMargin.top+this.chartHeight, this.chartMargin.top);
        //generate new y labels
        this.generateYLabels(newMax, this.yZoomScale);
        //generate new y grid
        this.generateYGrid(newMin, newMax, this.yZoomScale);
      },
      //calculate x scale and y scale
      calculateZoom() {
        this.xZoomScale = this.chartWidth/this.zoomWidth;
      },
      //update x labels
      updateXZoomLabels(xStart, xEnd) {
        //generate new label values
        let updateXLabels = [];
        //only include labels within range
        for(let i=0; i<this.xLabels.length; i++) {
          if(this.xLabels[i].x >= xStart && this.xLabels[i].x <= xEnd) {
            //generate new label
            let label = {}
            //set x
            label.x = (this.xLabels[i].x-xStart)*this.xZoomScale;
            //set value
            label.value = this.xLabels[i].value;
            //add label
            updateXLabels.push(label);
          }
        }
        //update labels        
        this.xLabels = updateXLabels;
      },
      //update x grid
      updateXZoomGrid(xStart, xEnd) {
        //generate new grid values
        let updateXGrid = [];
        //only include grid lines within range
        for(let i=0; i<this.xGrid.length; i++) {
          //update grid values
          if(this.xGrid[i] >= xStart && this.xGrid[i] <= xEnd) {
            //update x coordinate
            updateXGrid.push((this.xGrid[i]-xStart)*this.xZoomScale);
          }
        }
        //first x
        updateXGrid.push(this.chartMargin.left);
        //last x
        updateXGrid.push(this.chartWidth+this.chartMargin.left);
        //update grid values
        this.xGrid = updateXGrid;
      },
      //update bar data
      updateZoomBars(xStart, xEnd, yStart, yEnd) {
        //generate updated bars data
        let updateBars = [];
        //iterate bars data
        for(let i=0; i<this.barsData.length; i++) {
          //generate bar set
          let barSet = {};
          //set key
          barSet.key = this.barsData[i].key;  
          //generate data
          barSet.data = [];        
          //decide if bar set is to be included
          let include = false;
          //iterate bar set
          for(let j=0; j<this.barsData[i].data.length; j++) {
            //set bar
            let bar = this.barsData[i].data[j]
            //left side of bar
            let barLeft = bar.x;
            //right side of bar
            let barRight = bar.x + bar.width;
            //top side of bar
            let barTop = bar.y;
            //bottom side of bar
            let barBottom = bar.y + bar.height;
            //check if bar is within range of zoom selection  
            if(barRight >= xStart && barLeft <= xEnd) {
              //check if bar height is within range of selection
              if(barTop <= yStart && barBottom >= yEnd) {
                //include this bar set
                include = true;
                //scale width
                bar.width = bar.width * this.xZoomScale;
                //scale x
                bar.x = (bar.x - xStart) * this.xZoomScale;
                //clip x if bar is clipped from left side
                if(bar.x < this.chartMargin.left) {
                  //keep difference
                  let clip = this.chartMargin.left - bar.x;
                  //set new x
                  bar.x = this.chartMargin.left;
                  //adjust width
                  bar.width = bar.width - clip;
                }
                //clip x if bar is clipped from right side
                if((bar.x + bar.width) > (this.chartMargin.left + this.chartWidth)) {
                  //keep difference
                  let clip = (bar.x + bar.width) - (this.chartMargin.left + this.chartWidth)
                  //adjust width
                  bar.width = bar.width - clip;
                }
                //scale y
                bar.y = this.yZoomScale(bar.value);
                //clip y if bar is out of view
                if(bar.y < this.chartMargin.top) {
                  //set y to top of chart                  
                  bar.y = this.chartMargin.top;
                  //set height to height of chart
                  bar.height = this.chartHeight;
                } else {
                  //scale height
                  bar.height = this.chartHeight - bar.y + this.chartMargin.top;
                }                
                //include bar into barset
                barSet.data.push(bar);
              }
            }
          }
          //include this barset
          if(include){
            updateBars.push(barSet);
          }
        }
        //update bars data
        this.barsData = updateBars;
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
        this.toolX = event.offsetX + 20;
        this.toolY = event.offsetY - 20;
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
#zoom-brush{
  position: absolute;
  padding-left: 40px;
}
#reset-zoom{
  position: absolute;
  padding-left: 150px;
}
.vuestro-bar-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.vuestro-bar-chart-bar {
  transition: all 0.4s ease-in-out;
}
</style>