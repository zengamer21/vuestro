<template>
  <vuestro-container no-wrap>
    <vuestro-card cols=4 color="var(--vuestro-orange)" scroll>
      <template #heading>
        <span>List</span>
        <vuestro-container grow=0 gutter="none">
					<vuestro-button pill @click="onNew" variant="success" value>
					  <template #icon>
  						<vuestro-icon name="plus"></vuestro-icon>
						</template>
						New
					</vuestro-button>
					<vuestro-button round no-border @click="reload">
						<vuestro-icon name="sync-alt" :pulse="loading"></vuestro-icon>
					</vuestro-button>
				</vuestro-container>
      </template>
      <vuestro-list-item v-for="i in items" :key="i.name" :selected="selectedItem == i" @click="onClick(i)">
        <template #icon>
          <vuestro-icon name="user"></vuestro-icon>
        </template>
        <template #title>{{ i.sender }}</template>
        <template #description>{{ i.subject }}</template>
        <!-- <template #content>{{ i.content }}</template>  -->
        <template #buttons>
          <vuestro-button round no-border size="sm" @click="onEdit(i)">
            <vuestro-icon name="pen"></vuestro-icon>
          </vuestro-button>
					<vuestro-confirm-delete @confirm="onDelete(i)"></vuestro-confirm-delete>
        </template>
      </vuestro-list-item>
    </vuestro-card>
    <vuestro-card cols=8>
      <vuestro-panel>
        <template #title>Details</template>
        <vuestro-container>
          <vuestro-object-browser :data="selectedItem"></vuestro-object-browser>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'ContainersList',
  data() {
    return {
      loading: false,
      items: [{"_id":"58fb6d93407cc20302edc6bfc4a04c7d01066efb","sender":"Hanny Mapham","subject":"User-centric leading edge standardization","content":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.","date":"2020-10-16T19:45:11Z"},
{"_id":"47e65e3bc6542184bb43f0c2b68900284d49b579","sender":"Hamnet Harwin","subject":"Reduced heuristic frame","content":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.","date":"2020-07-05T01:29:32Z"},
{"_id":"5900a806ef67491ffb6f9b43961f8b4a1d08a0bf","sender":"Odille Flewitt","subject":"Reactive context-sensitive interface","content":"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.","date":"2020-06-12T01:01:03Z"},
{"_id":"2c1b902d02cf9514d19e16621cf21249c43c340f","sender":"Ofilia Sales","subject":"Future-proofed modular approach","content":"Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.","date":"2020-04-04T07:21:47Z"},
{"_id":"0aab7aa0fabef40c0d3541952287080dc822495e","sender":"Corinna Aughton","subject":"Right-sized attitude-oriented hardware","content":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","date":"2019-12-10T17:36:40Z"}],
      selectedItem: null,
    };
  },
  methods: {
    onNew() {
      this.items.push({
        sender: `New Item ${this.items.length + 1}`,
        subject: 'new subject',
        content: 'new content',
        date: (new Date()).toISOString()
      });
    },
    reload() {

    },
    onClick(i) {
      this.selectedItem = i;
    },
    onEdit(i) {
      alert(`looks like you want to edit ${JSON.stringify(i)}`);
    },
    onDelete(i) {
      alert(`looks like you want to delete ${JSON.stringify(i)}`);
    },
  },
};

</script>

<style scoped>

</style>