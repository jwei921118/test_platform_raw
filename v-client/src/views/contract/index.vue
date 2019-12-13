<template>
	<div>
		<navLeft></navLeft>
		<div class="cnt-content">
			<router-view class="h-100" />
		</div>
	</div>
</template>
<script>
import navLeft from './navLeft.vue'
export default {
	components: {
		navLeft
	},
	data() {
		return {}
	}
}
</script>
<style lang="scss" scoped>
.cnt-content {
	height: 100%;
	margin-left: 40px;
	padding: 20px;
	box-sizing: border-box;
}
</style>