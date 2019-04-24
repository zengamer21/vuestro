<template>
	<div class="vuestro-pill">
		<div class="title">{{ titleComputed }}</div>
		<div class="value">{{ value }}</div>
	</div>
</template>

<script>
	
export default {
	name: 'VuestroPill',
	props: {
		title: { type: String },
		value: { type: String, required: true },
	},
	computed: {
		titleComputed() {
			if (this.title) {
				return this.title;
			} else {
				return this.value.slice(0, 1).toUpperCase();
			}
		},
	},
};
	
</script>
	
<style scoped>

.vuestro-pill {
	background-color: var(--vuestro-widget-light-bg);
	line-height: 32px;
	border-radius: 32px;
	flex: 0 1 auto;
	display: flex;
	margin: 2px;
}

.title {
	min-width: 32px;
	text-align: center;
	background-color: var(--vuestro-primary);
	color: var(--vuestro-light);
	border-radius: 20px;
	font-size: 18px;
	padding-left: 8px;
	padding-right: 8px;
}

.value {
	padding-left: 6px;
	padding-right: 10px;
}

</style>