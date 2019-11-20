<template>
  <vuestro-container no-wrap>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Map</span></template>
      <template #description>VuestroMap uses Leaflet with some nice additions for power users</template>
      <vuestro-panel stretch overflow-hidden>
        <vuestro-map :data="data" :options="options"></vuestro-map>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'ChartsMap',
  data() {
    return {
      options: {
        view: {
          center: [28.4187, -81.5812],
        },
        dataCoordinateKey: 'value',
      },
      data: [],
    };
  },
  mounted() {
    this.data = [
      {
        title: 'Disney World',
        value: [28.24067,-81.34906],
      },
      {
        title: 'Port Royale - Temporary Tattoos stand',
        value: [28.36269,-81.54225],
      },
      {
        title: 'Port Royale (FQ) pool',
        value: [28.3627,-81.54252],
      },
      {
        title: 'Port Royale (FQ) entrance',
        value: [28.36288,-81.54222],
      },
      {
        title: 'Wishes fireworks from boat',
        value: [28.41264,-81.58053],
      },
      {
        title: 'Sammy Duvall Watersports-Contemporary',
        value: [28.41494,-81.57313],
      },
      {
        title: 'Flag at start of Main Street',
        value: [28.4169,-81.58125],
      },
      {
        title: 'Main Street',
        value: [28.41709,-81.58126],
      },
      {
        title: 'Main Street-middle I think',
        value: [28.41756,-81.5812],
      },
      {
        title: 'Main Street end',
        value: [28.41804,-81.58122],
      },
      {
        title: 'Pirates of the Caribbean',
        value: [28.41808,-81.58429],
      },
      {
        title: 'Jungle Cruise',
        value: [28.41824,-81.58349],
      },
      {
        title: 'Crystals Palace',
        value: [28.41827,-81.58191],
      },
      {
        title: 'Adventureland entrance and benches',
        value: [28.41848,-81.58206],
      },
      {
        title: 'Swiss Family Treehouse',
        value: [28.41849,-81.5828],
      },
      {
        title: 'Alien Encounter',
        value: [28.41853,-81.57949],
      },
      {
        title: 'Luncheon Pad-turkey legs-food',
        value: [28.4186,-81.57912],
      },
      {
        title: ' Frontier Fries-Adventure Land-Mcdonalds fries',
        value: [28.41864,-81.58471],
      },
      {
        title: 'Walt and Mickey Statue',
        value: [28.41883,-81.58123],
      },
      {
        title: 'Space Mountain Entrance',
        value: [28.41883,-81.57832],
      },
      {
        title: 'Mad Tea Party',
        value: [28.4189,-81.57951],
      },
      {
        title: 'Cinderella\'s Castle South side',
        value: [28.41945,-81.5812],
      },
      {
        title: 'Cinderella\'s Castle North side',
        value: [28.41972,-81.58116],
      },
      {
        title: 'Sir Mickeys',
        value: [28.41993,-81.58133],
      },
      {
        title: 'Mickey\'s Philharmagic',
        value: [28.42007,-81.58133],
      },
      {
        title: 'Snow White Scary Adventure',
        value: [28.4201,-81.58101],
      },
      {
        title: 'Haunted Mansion Entrance',
        value: [28.42016,-81.58284],
      },
      {
        title: 'Carousel of Progress',
        value: [28.42017,-81.58141],
      },
      {
        title: 'Mad Hatter',
        value: [28.42018,-81.57958],
      },
      {
        title: 'Winnie the Pooh',
        value: [28.42023,-81.58024],
      },
      {
        title: 'It\'s a Small World',
        value: [28.42033,-81.58211],
      },
      {
        title: 'Dumbo ride',
        value: [28.4205,-81.58084],
      },
      {
        title: 'Cinderella\'s castle',
        value: [28.42053,-81.58103],
      },
      {
        title: 'Walt Disney World Resort',
        value: [28.45809,-81.45248],
      },
    ];
  }
};

</script>


<style scoped>


</style>