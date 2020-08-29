<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template #heading>Pills</template>
      <template #description>
        Pills are a great way to represent either key-value pairs, or "grabbable" bits of information. They consist of an color-accented title along with a value. If a title is not provided, the first letter of the value property will be used for the accent dot.
      </template>
      <vuestro-pill value="Pill Value"></vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Pill with <em>title</em> and <em>value</em> properties</span>
      </template>
      <vuestro-pill title="Pill Title" value="Pill Value"></vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Use VuestroPill with <em>icon</em>, <em>title</em>, and <em>value</em> slots to embed components</span>
      </template>
      <vuestro-pill>
        <template #icon>
          <vuestro-icon name="pills"></vuestro-icon>
        </template>
        <template #title>
          title
        </template>
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
        <vuestro-pill title="Pill Title"></vuestro-pill>
        <vuestro-pill title="M"></vuestro-pill>
        <vuestro-pill>
          <template #title>Slot Title</template>
          <template #title-buttons>
            <vuestro-button round no-border variant="white" size="sm">
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
            <vuestro-button round no-border variant="white" size="sm">
              <vuestro-icon name="save"></vuestro-icon>
            </vuestro-button>
            <vuestro-button round no-border variant="white" size="sm">
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
  			<vuestro-pill value="Pill Value"></vuestro-pill>
  			<vuestro-pill title="Pill" value="Pill Value"></vuestro-pill>
  		</vuestro-tray>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Pills can also have different colors by specifying a color property.
      </template>
      <div class="example-align-items-start">
        <vuestro-pill value="Orange" color="var(--vuestro-orange"></vuestro-pill>
        <vuestro-pill value="Green" color="var(--vuestro-green"></vuestro-pill>
        <vuestro-pill value="Red" color="var(--vuestro-red"></vuestro-pill>
        <vuestro-pill value="Blue" color="var(--vuestro-blue"></vuestro-pill>
        <vuestro-pill value="Purple" color="var(--vuestro-purple"></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...or a different size by specifying a size property {'sm', 'md', 'lg', 'xl'}
      </template>
      <div class="example-align-items-start">
        <vuestro-pill value="Orange" color="var(--vuestro-orange" size="sm"></vuestro-pill>
        <vuestro-pill value="Green" color="var(--vuestro-green" size="md"></vuestro-pill>
        <vuestro-pill value="Red" color="var(--vuestro-red" size="lg"></vuestro-pill>
        <vuestro-pill value="Blue" color="var(--vuestro-blue" size="xl"></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>...or a different radius by defining the <em>--vuestro-pill-radius</em> CSS var (with units)</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill title="Default" value="Radius"></vuestro-pill>
        <vuestro-pill title="4px" value="Radius" style="--vuestro-pill-radius:4px"></vuestro-pill>
        <vuestro-pill title="0.5em" value="Radius" style="--vuestro-pill-radius:0.5em"></vuestro-pill>
        <vuestro-pill title="0" value="Radius" style="--vuestro-pill-radius:0"></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <em>clickable</em> property to make the pill a button which emits a 'click' event.</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill value="Clickable" clickable @click="exampleClicked = !exampleClicked"></vuestro-pill>
        <span class="example-action-text" v-if="exampleClicked">Pill clicked!</span>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>A pill will show a close button and emit a <em>close</em> event when the closable property is set.</span>
      </template>
      <div class="example-align-items-start">
        <vuestro-pill v-if="!exampleClosed" value="Closable" closable @close="exampleClosed = true"></vuestro-pill>
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
        <vuestro-pill title="Long Title" value="Long Value"></vuestro-pill>
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
  width: 10vh;
}

</style>