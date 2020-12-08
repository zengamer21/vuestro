<template>
    <g class="vuestro-svg-legend">
        <text :x="x" :y="y" ref="text">
            <template>
                <tspan 
                    :x="x" 
                    dy="1.2em" 
                    :fill="pieSection.color" 
                    :stroke="pieSection.color"
                    stroke-width="2">
                |</tspan>
                <tspan fill="black">{{ pieSection.key }}</tspan>
            </template>
        </text>
    </g>
</template>

<script>
    import * as d3 from 'd3';

    export default {
    name: 'VuestroSvgLegend',
    props: {
        pieSection: { type: Object, required: true },
        x: { type: Number, default: 5},
        y: { type: Number, default: 10 },
        radius: { type: Number, default: 2 },
    },
    data() {
        return {
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
        // x
        /*
        let width = this.$el.getBBox().width;
                let newX = 0;
                if (this.x + width > this.xMax) {
                    // clamp maximum x
                    newX = this.xMax - width;
                } else {
                    newX = this.x - width/2;
                    // clamp minimum
                    if (newX < 0) {
                        newX = 0;
                    }
                }
                // y
                let height = this.$el.getBBox().height;
                let newY = 0;
                if (this.y + height > this.yMax) {
                    // clamp maximum x
                    newY = this.yMax - height;
                } else {
                    newY = this.y - height/2;
                    // clamp minimum
                    if (newY < 0) {
                        newY = 0;
                    }
                }
                // size it
                let size = this.$refs.text.getBBox();
                this.tooltipHeight = size.height + this.padding;
                this.tooltipWidth = size.width + this.padding;
                // move it
        d3.select(this.$el).attr("transform", `translate(${newX}, ${newY})`);*/
        },
    },
    };
</script>
<style scoped>
    .vuestro-svg-legend > rect {
    fill: var(--vuestro-popup-bg);
    opacity: var(--vuestro-tooltip-opacity);
    }

    .vuestro-svg-legend > text {
    fill: var(--vuestro-popup-fg);
    }
</style>