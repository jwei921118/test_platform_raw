<template>
	<div class="nav-left">
		<router-link to="/cnt/bytecode">
			<i class="el-icon-notebook-1"></i>
		</router-link>
		<router-link to="/cnt/execute">
			<i class="el-icon-s-shop"></i>
		</router-link>
		<router-link to="/cnt/user">
			<i class="el-icon-user"></i>
		</router-link>
	</div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.nav-left {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	border-left: 1px solid #eee;
	box-shadow: 0 0 2px 0 #ccc;
	width: 40px;
	a {
		display: inline-block;
		width: 100%;
		color: #ccc;
		font-size: 24px;
		text-align: center;
		margin: 10px 0;
		&.router-link-active {
			color: #409eff;
		}
	}
}
</style>