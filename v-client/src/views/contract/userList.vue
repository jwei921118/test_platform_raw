<template>
	<div>
		<div class="align-right m-b-10">
			<el-button type="primary" plain round size="small" @click="openLayer()">新增</el-button>
		</div>
		<tableBase :tableKey="tableKey" :tableData="tableData"></tableBase>
		<!-- 弹出层 -->
		<layerBase ref="cntInfo" :options="layerOption">
			<el-form
				label-position="left"
				ref="form"
				size="small"
				:model="form"
				:rules="rules"
				label-width="100px"
			>
				<el-form-item label="用户名" prop="accountName">
					<el-input v-model="form.accountName" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="keyhash">
					<el-input v-model="form.keyhash" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label-width="0" class="align-center">
					<el-button class="wp-120" type="primary" round @click="confirm()">确认</el-button>
					<el-button class="wp-120" round plain @click="cancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</layerBase>
	</div>
</template>
<script>
import tableBase from '@/components/base/tableBase.vue'
import layerBase from '@/components/base/layerBase.vue'
const userObject = {
	accountName: '',
	keyhash: ''
}
export default {
	components: {
		tableBase,
		layerBase
	},
	data() {
		return {
			// 表格建
			tableKey: [
				{
					key: 'accountName',
					name: '用户名',
					width: '160px'
				},
				{
					key: 'addr',
					name: '用户地址'
				},
				{
					key: 'balanceof',
					name: '余额'
				},
				{
					key: 'operate',
					name: '操作',
					ctrlType: 'text',
					width: '200px',
					operations: [
						{
							text: '删除',
							textClass: () => {
								return 'error-text m-r-10 cursor-p'
							},
							func: this.delCol
						}
					]
				}
			],
			// 合约数据
			tableData: [],
			layerOption: {
				title: '新增用户',
				width: '620px'
			},
			form: Object.assign({}, userObject),
			rules: {
				accountName: [
					{
						required: true,
						message: '用户名不能为空',
						trigger: ['blur', 'change']
					}
				]
			}
		}
	},
	mounted() {
		this.getUserList()
	},
	methods: {
		// 获取合约信息
		getUserList() {
			this._services.ajaxGet('userList').then(res => {
				if (res.code === 0) {
					this.tableData = res.data
				}
			})
		},
		openLayer() {
			this.$refs.cntInfo.open()
		},
		// 提交
		confirm() {
			this.$refs.form.validate(valid => {
				if (valid) {
					let param = { ...this.form }
					this._services.ajaxPost('createUser', param, { loading: true }).then(res => {
						if (res.code === 0) {
							this.cancle()
							this.getUserList()
						}
					})
				}
			})
		},
		//
		cancle() {
			this.form = Object.assign({}, userObject)
			this.$refs.cntInfo.close()
		},
		updateCol() {},
		// 删除合约
		delCol(data) {
			this.tools
				.confirm('确认删除用户?', '提示', {
					type: 'warning',
					center: false
				})
				.then(() => {
					this._services.ajaxPost('delUser', { id: data.id }).then(res => {
						console.log(res)
						if (res.code === 0) {
							this.tools.message('删除用户成功', 'success')
							this.getUserList()
						}
					})
				})
		}
	}
}
</script>
<style lang="scss" scoped>
.cnt-content {
	height: 100%;
	margin-left: 40px;
	padding: 10px;
	box-sizing: border-box;
}
</style>
