<template>
	<div class="h-100">
		<Header></Header>
		<div class="content-box">
			<router-view class="h-100" />
		</div>
	</div>
</template>

<script>
import Header from '../components/Header'

export default {
	name: 'home',
	components: {
		Header
	}
}
</script>
