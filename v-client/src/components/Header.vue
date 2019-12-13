<template>
	<div class="header-box">
		<el-row>
			<el-col :span="4">
				<div class="logo-box m-l-10">
					<img src="../assets/logo.png" alt />
				</div>
			</el-col>
			<el-col :span="14" class="nav-pro">
				<router-link to="/cnt">智能合约</router-link>
				<router-link to="/clearance">清分服务</router-link>
				<router-link to="/config">配置项</router-link>
			</el-col>
			<el-col :span="6" class="align-right">
				<el-avatar
					class="m-t-10 m-r-10"
					src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
				></el-avatar>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.header-box {
	height: 60px;
	background-color: #252a3d;
	line-height: 60px;
	.logo-box {
		height: 100%;
		img {
			width: 120px;
			height: auto;
		}
	}
	.nav-pro {
		a {
			color: #eee;
			margin: 0 10px;
			text-decoration: none;
			font-size: 16px;
			&:hover {
				color: #a59e9e;
			}
		}
	}
}
</style>