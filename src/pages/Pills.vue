<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template #heading>Pills</template>
      <template #description>
        Pills are a great way to represent either key-value pairs, or "grabbable" bits of information. They consist of an color-accented title along with a value. If a title is not provided, the first letter of the value property will be used for the accent dot.
      </template>
      <vuestro-pill>
        <template #value>Pill Value</template>
      </vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Pill with <em>title</em> and <em>value</em> properties</span>
      </template>
      <vuestro-pill>
        <template #title>Title</template>
        <template #value>Value</template>
      </vuestro-pill>
      <vuestro-pill>
        <template #icon>
          <vuestro-icon name="download"></vuestro-icon>
        </template>
        <template #value>Value</template>
      </vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Use VuestroPill with <em>icon</em>, <em>title</em>, and <em>value</em> slots to embed components</span>
      </template>
      <vuestro-pill>
        <template #icon>
          <vuestro-icon name="pills"></vuestro-icon>
        </template>
        <template #title>Title</template>
        <template #value>value slot</template>
      </vuestro-pill>
      <vuestro-pill>
        <template #value>value slot</template>
      </vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Pills will always stretch to available space unless they are put in a flex box with 'align-items' set.
      </template>
      <div class="example-align-items-start">
        <vuestro-pill title="Pill Title" value="Pill Value"></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Get a color pill by only setting the <em>title</em> slot (or <em>icon</em> and <em>title</em>)</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill>
          <template #title>Pill Title</template>
        </vuestro-pill>
        <vuestro-pill>
          <template #title>M</template>
        </vuestro-pill>
        <vuestro-pill>
          <template #title>Slot Title</template>
          <template #title-buttons>
            <vuestro-button round no-border variant="white">
              <vuestro-icon name="times"></vuestro-icon>
            </vuestro-button>
          </template>
        </vuestro-pill>
        <vuestro-pill>
          <template #icon>
            <vuestro-icon name="tractor" scale="0.8"></vuestro-icon>
          </template>
          <template #title>Tractor</template>
        </vuestro-pill>
        <vuestro-pill>
          <template #icon>
            <vuestro-icon name="tractor" scale="0.8"></vuestro-icon>
          </template>
          <template #title>Tractor</template>
          <template #title-buttons>
            <vuestro-button round no-border variant="white">
              <vuestro-icon name="save"></vuestro-icon>
            </vuestro-button>
            <vuestro-button round no-border variant="white">
              <vuestro-icon name="times"></vuestro-icon>
            </vuestro-button>
          </template>
        </vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Enable a shadow by setting the <em>shadow</em> property</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill title="Pill Title" value="Pill Value" shadow></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Use a VuestroTray to keep pills together!
      </template>
  		<vuestro-tray title="Pill Tray" variant="outline">
  			<vuestro-pill>
  			  <template #title>Pill Value</template>
  			</vuestro-pill>
  			<vuestro-pill>
  			  <template #value>Pill Value</template>
			  </vuestro-pill>
  		</vuestro-tray>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Pills can also have different colors by specifying a color property.
      </template>
      <div class="example-align-items-start">
        <vuestro-pill color="var(--vuestro-orange)">
          <template #value>Orange</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-green)">
          <template #value>Green</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-red)">
          <template #value>Red</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-blue)">
          <template #value>Blue</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-purple)">
          <template #value>Purple</template>
        </vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...or a different size by specifying a size property {'sm', 'md', 'lg', 'xl'}
      </template>
      <div class="example-align-items-start">
        <vuestro-pill color="var(--vuestro-orange)" size="sm">
          <template #value>Orange</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-green)" size="md">
          <template #value>Green</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-red)" size="lg">
          <template #value>Red</template>
        </vuestro-pill>
        <vuestro-pill color="var(--vuestro-blue)" size="xl">
          <template #value>Blue</template>
        </vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>...or a different radius by defining the <em>--vuestro-pill-radius</em> CSS var (with units)</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill>
          <template #title>Default</template>
          <template #value>Radius</template>
        </vuestro-pill>
        <vuestro-pill style="--vuestro-pill-radius:4px">
          <template #title>4px</template>
          <template #value>Radius</template>
        </vuestro-pill>
        <vuestro-pill style="--vuestro-pill-radius:0.5em">
          <template #title>0.5em</template>
          <template #value>Radius</template>
        </vuestro-pill>
        <vuestro-pill style="--vuestro-pill-radius:0">
          <template #title>0</template>
          <template #value>Radius</template>
        </vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <em>clickable</em> property to make the pill a button which emits a 'click' event.</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill clickable @click="exampleClicked = !exampleClicked">
          <template #title>Clickable</template>
        </vuestro-pill>
        <span class="example-action-text" v-if="exampleClicked">Pill clicked!</span>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>A pill will show a close button and emit a <em>close</em> event when the closable property is set.</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill v-if="!exampleClosed" closable @close="exampleClosed = true">
          <template #title>Close</template>
          <template #value>Me</template>
        </vuestro-pill>
        <span class="example-action-text" v-if="exampleClosed">
          Pill closed! <vuestro-button variant="link" @click="exampleClosed = false">Click</vuestro-button> to reopen.
        </span>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Combining <em>clickable</em> and <em>closable</em> will yield expected results.</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill v-if="!exampleClosed" clickable closable @close="exampleClosed = true" @click="exampleClicked = !exampleClicked">
          <template #value>
            Click or close
          </template>
        </vuestro-pill>
        <span class="example-action-text" v-if="exampleClosed">
          Pill closed! <vuestro-button variant="link" @click="exampleClosed = false">Click</vuestro-button> to reopen.
        </span>
        <span class="example-action-text" v-if="exampleClicked">Pill clicked!</span>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        A pill will refuse to wrap and will show an ellipsis when the value is too long to fit in the provided space.
      </template>
      <div class="example-constrained-width">
        <vuestro-pill>
          <template #title>Long Title</template>
          <template #value>Long Value</template>
        </vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <em>geopattern</em> property for a generated geometric background based on the <em>title</em> string.</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill geopattern>
          <template #title>
            This string generated the background!!!
          </template>
        </vuestro-pill>
        <vuestro-pill geopattern="theseed">
          <template #title>
            ...or set geopattern to a string to set the seed!
          </template>
        </vuestro-pill>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'Pills',
  data() {
    return {
      exampleClicked: false,
      exampleClosed: false,
    };
  }
};

</script>

<style scoped>

.example-align-items-start {
  display: flex;
  align-items: flex-start;
}

.example-action-text {
  margin-left: 10px;
  margin-right: 10px;
  align-self: center;
  display: flex;
  align-items: center;
}

.example-constrained-width {
  width:120px;
}

</style>