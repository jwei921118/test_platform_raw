<template>
	<div class="output h-100">
		<div class="title">
			输出结果
			<i class="m-l-10 el-icon-delete" @click="clear()"></i>
		</div>
		<div class="content overflow-y-auto">
			<el-tabs v-model="activeName">
				<el-tab-pane label="成功" name="success">
					<div class="item" v-for="(item, inx) in successData" :key="inx">
						<p>
							<span class="label">output :</span>
							<span class="text">{{item.output}}</span>
						</p>
						<p>
							<span class="label">区块高度 :</span>
							<span class="text">{{item.info.block_number}}</span>
						</p>
						<p>
							<span class="label">gas消耗 :</span>
							<span class="text">{{item.info.gas_used}}</span>
						</p>

						<p>
							<span class="label">哈希值 :</span>
							<span class="text">{{item.info.txhash}}</span>
						</p>
						<el-divider content-position="center">分割线</el-divider>
					</div>
				</el-tab-pane>
				<el-tab-pane label="错误" name="error">
					<div class="m-t-10" v-for="(item, inx) in errorData" :key="inx">
						<p>{{item}}</p>
						<el-divider content-position="center">分割线</el-divider>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			successData: [],
			errorData: [],
			activeName: 'success'
		}
	},
	methods: {
		input(data, type) {
			console.log(type)
			if (type === 0) {
				this.successData.push(data)
				this.activeName = 'success'
			} else if (type === 1) {
				this.errorData.push(data)
				this.activeName = 'error'
			}
		},
		clear() {
			if (this.activeName === 'success') {
				this.successData = []
			} else if (this.activeName === 'error') {
				this.errorData = []
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.output {
	.title {
		// font-size: 14px;
		font-weight: 550;
		color: #333;
		.el-icon-delete {
			font-size: 16px;
			color: $error-color;
		}
	}
	.content {
		height: calc(100% - 50px);
		margin-top: 10px;
		border-radius: 3px;
		padding: 10px;
		border: 1px solid $sub-gray;
		p {
			margin: 4px 0;
		}
		.label {
			color: #585858;
			font-weight: 550;
		}
		.text {
			color: #8d8d8d;
		}
	}
}
</style>