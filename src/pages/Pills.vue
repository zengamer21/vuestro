<template>
  <vuestro-card-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template slot="heading">Pills</template>
      <template slot="description">
        Pills are a great way to represent either key-value pairs, or "grabbable" bits of information. They consist of an accented title along with a value. If a title is not provided, the first letter of the value will be used for the accented dot.
      </template>
      <vuestro-pill value="Pill Value"></vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Pill with separate title and value.
      </template>
      <vuestro-pill title="Pill Title" value="Pill Value"></vuestro-pill>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Pills will always stretch to available space unless they are put in a flex box with <code>align-items</code> set.
      </template>
      <div class="example-align-items-start">
        <vuestro-pill title="Pill Title" value="Pill Value"></vuestro-pill>
      </div>
    </vuestro-card>

    </vuestro-card>
    <vuestro-card>
      <template slot="description">
        Use a VuestroTray to keep pills together!
      </template>
  		<vuestro-tray title="Pill Tray">
  			<vuestro-pill value="Pill Value"></vuestro-pill>
  			<vuestro-pill title="Pill" value="Pill Value"></vuestro-pill>
  		</vuestro-tray>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
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
      <template slot="description">
        ...or a different size by specifying a size property (with units). The font size will automatically scale!
      </template>
      <div class="example-align-items-start">
        <vuestro-pill value="Orange" color="var(--vuestro-orange" size="12px"></vuestro-pill>
        <vuestro-pill value="Green" color="var(--vuestro-green" size="24px"></vuestro-pill>
        <vuestro-pill value="Red" color="var(--vuestro-red" size="36px"></vuestro-pill>
        <vuestro-pill value="Blue" color="var(--vuestro-blue" size="48px"></vuestro-pill>
        <vuestro-pill value="Purple" color="var(--vuestro-purple" size="64px"></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        ...or a different radius by specifying a radius property (with units).
      </template>
      <div class="example-align-items-start">
        <vuestro-pill title="Default" value="Radius" size="40px"></vuestro-pill>
        <vuestro-pill title="Small" value="Radius" size="40px" radius="4px"></vuestro-pill>
        <vuestro-pill title="No" value="Radius" size="40px" radius="0"></vuestro-pill>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Set the clickable property to make the pill a button which emits a 'click' event.
      </template>
      <div class="example-align-items-start">
        <vuestro-pill value="Clickable" clickable size="30px" @click="exampleClicked = !exampleClicked"></vuestro-pill>
        <span class="example-action-text" v-if="exampleClicked">Pill clicked!</span>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        A pill will show a close button and emit a 'close' event when the closable property is set.
      </template>
      <div class="example-align-items-start">
        <vuestro-pill v-if="!exampleClosed" value="Closable" closable size="40px" @close="exampleClosed = true"></vuestro-pill>
        <span class="example-action-text" v-if="exampleClosed">
          Pill closed! <vuestro-button variant="link" @click="exampleClosed = false">Click</vuestro-button> to reopen.
        </span>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        A pill will refuse to wrap and will show an ellipsis when the value is too long to fit in the provided space.
      </template>
      <div class="example-constrained-width">
        <vuestro-pill title="Long Title" value="Long Value"></vuestro-pill>
      </div>
    </vuestro-card>

  </vuestro-card-container>
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
  width: 100px;
}

</style>