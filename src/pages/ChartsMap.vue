<template>
  <vuestro-container no-wrap>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Map</span></template>
      <template #description>VuestroMap uses Leaflet with some nice additions for power users</template>
      <vuestro-panel stretch overflow-hidden>
        <vuestro-map :data="data" :options="options" @click="onMapClick"></vuestro-map>
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
        dataCoordinateKey: 'value',
        dataExtraKvps: ['rating'],
      },
      data: [],
    };
  },
  mounted() {
    this.data = [
      {
        title: 'Port Royale - Temporary Tattoos stand',
        value: [28.36269,-81.54225],
        rating: 3,
      },
      {
        title: 'Port Royale (FQ) pool',
        value: [28.3627,-81.54252],
        rating: 2,
      },
      {
        title: 'Port Royale (FQ) entrance',
        value: [28.36288,-81.54222],
        rating: 4,
      },
      {
        title: 'Wishes fireworks from boat',
        value: [28.41264,-81.58053],
        rating: 5,
      },
      {
        title: 'Flag at start of Main Street',
        value: [28.4169,-81.58125],
        rating: 3,
      },
      {
        title: 'Main Street',
        value: [28.41709,-81.58126],
        rating: 1,
      },
      {
        title: 'Main Street-middle I think',
        value: [28.41756,-81.5812],
        rating: 2,
      },
      {
        title: 'Main Street end',
        value: [28.41804,-81.58122],
        rating: 2,
      },
      {
        title: 'Pirates of the Caribbean',
        value: [28.41808,-81.58429],
        rating: 3,
      },
      {
        title: 'Jungle Cruise',
        value: [28.41824,-81.58349],
        rating: 4,
      },
      {
        title: 'Crystals Palace',
        value: [28.41827,-81.58191],
        rating: 5,
      },
      {
        title: 'Adventureland entrance and benches',
        value: [28.41848,-81.58206],
        rating: 3,
      },
      {
        title: 'Swiss Family Treehouse',
        value: [28.41849,-81.5828],
        rating: 3,
      },
      {
        title: 'Alien Encounter',
        value: [28.41853,-81.57949],
        rating: 2,
      },
      {
        title: 'Luncheon Pad-turkey legs-food',
        value: [28.4186,-81.57912],
        rating: 3,
      },
      {
        title: ' Frontier Fries-Adventure Land-Mcdonalds fries',
        value: [28.41864,-81.58471],
        rating: 1,
      },
      {
        title: 'Walt and Mickey Statue',
        value: [28.41883,-81.58123],
        rating: 2,
      },
      {
        title: 'Space Mountain Entrance',
        value: [28.41883,-81.57832],
        rating: 3,
      },
      {
        title: 'Mad Tea Party',
        value: [28.4189,-81.57951],
        rating: 4,
      },
      {
        title: 'Cinderella\'s Castle South side',
        value: [28.41945,-81.5812],
        rating: 5,
      },
      {
        title: 'Cinderella\'s Castle North side',
        value: [28.41972,-81.58116],
        rating: 3,
      },
      {
        title: 'Sir Mickeys',
        value: [28.41993,-81.58133],
        rating: 3,
      },
      {
        title: 'Mickey\'s Philharmagic',
        value: [28.42007,-81.58133],
        rating: 5,
      },
      {
        title: 'Snow White Scary Adventure',
        value: [28.4201,-81.58101],
        rating: 4,
      },
      {
        title: 'Haunted Mansion Entrance',
        value: [28.42016,-81.58284],
        rating: 1,
      },
      {
        title: 'Carousel of Progress',
        value: [28.42017,-81.58141],
        rating: 2,
      },
      {
        title: 'Mad Hatter',
        value: [28.42018,-81.57958],
        rating: 2,
      },
      {
        title: 'Winnie the Pooh',
        value: [28.42023,-81.58024],
        rating: 2,
      },
      {
        title: 'It\'s a Small World',
        value: [28.42033,-81.58211],
        rating: 3,
      },
      {
        title: 'Dumbo ride',
        value: [28.4205,-81.58084],
        rating: 3,
      },
      {
        title: 'Cinderella\'s castle',
        value: [28.42053,-81.58103],
        rating: 2,
      },
    ];
  },
  methods: {
    onMapClick() {
      
    },
  },
};

</script>


<style scoped>


</style>