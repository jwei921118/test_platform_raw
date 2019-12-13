<template>
	<div>
		<div class="align-right m-b-10">
			<el-button type="primary" plain round size="small" @click="openLayer()">添加</el-button>
		</div>
		<tableBase :tableKey="tableKey" :tableData="tableData"></tableBase>
		<!-- 添加合约信息 弹出层 -->
		<layerBase ref="cntInfo" :options="layerOption">
			<el-form
				label-position="left"
				ref="form"
				size="small"
				:model="form"
				:rules="rules"
				label-width="100px"
			>
				<el-form-item label="合约描述" prop="contractDes">
					<el-input v-model="form.contractDes" placeholder="请输入合约描述"></el-input>
				</el-form-item>
				<el-form-item label="字节码" prop="bytecode">
					<el-input v-model="form.bytecode" placeholder="请输入合约字节码"></el-input>
				</el-form-item>
				<el-form-item label="ABI" prop="abi">
					<el-input v-model="form.abi" placeholder="请输入abi"></el-input>
				</el-form-item>
				<el-form-item label-width="0" class="align-center">
					<el-button class="wp-120" type="primary" round @click="confirm()">确认</el-button>
					<el-button class="wp-120" round plain @click="cancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</layerBase>

		<!-- 部署合约信息弹出层 -->
		<layerBase ref="deployLayer" :options="{title: '部署合约',width:'480px'}">
			<el-form
				label-position="left"
				ref="deployForm"
				size="small"
				:model="deployForm"
				:rules="deployRules"
				label-width="100px"
			>
				<el-form-item label="所属项目" prop="belong">
					<el-select
						class="w-100"
						v-model="deployForm.belong"
						@change="changePro"
						placeholder="请选择合约所属项目"
					>
						<el-option
							v-for="item in belongProject"
							:key="item.value"
							:label="item.name"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="合约名称" prop="contractName">
					<el-input v-model="deployForm.contractName" placeholder="请输入合约名称"></el-input>
				</el-form-item>
				<el-form-item label="合约参数">
					<el-input v-model="deployForm.cstParam" placeholder="合约参数选填,多个参数逗号隔开"></el-input>
				</el-form-item>
				<el-form-item label="合约类型" prop="contractType">
					<el-select class="w-100" v-model="deployForm.contractType" placeholder="请选择合约部署人">
						<el-option
							v-for="item in contractTypeArr"
							:key="item.value"
							:label="item.name"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部署人" prop="accountName">
					<el-select class="w-100" v-model="deployForm.accountName" placeholder="请选择合约部署人">
						<el-option
							v-for="item in userOptions"
							:key="item.value"
							:label="item.name"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="0" class="align-center">
					<el-button class="wp-120" type="primary" round @click="confirmDeploy()">确认</el-button>
					<el-button class="wp-120" round plain @click="cancleDeploy()">取消</el-button>
				</el-form-item>
			</el-form>
		</layerBase>
	</div>
</template>
<script>
import tableBase from '@/components/base/tableBase.vue'
import layerBase from '@/components/base/layerBase.vue'
import { project } from '@/constant/data'
console.log(project)
const cntObject = {
	contractDes: '',
	bytecode: '',
	abi: ''
}
const deployForm = {
	// 合约名称
	contractName: '',
	// 合约参数
	cstParam: '',
	// 部署人
	accountName: '',
	// 所有者
	belong: '',
	// 合约类型
	contractType: ''
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
					key: 'contractDes',
					name: '合约描述',
					width: '240px'
				},
				{
					key: 'bytecode',
					name: '字节码'
				},
				{
					key: 'abi',
					name: 'ABI'
				},
				{
					key: 'operate',
					name: '操作',
					ctrlType: 'text',
					width: '200px',
					operations: [
						{
							text: '部署',
							textClass: () => {
								return 'main-color m-r-10 cursor-p'
							},
							func: this.openDeployLayer
						},
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
				title: '添加合约信息',
				width: '560px'
			},
			form: Object.assign({}, cntObject),
			rules: {
				contractDes: [
					{
						required: true,
						message: '合约描述不能为空',
						trigger: ['blur', 'change']
					}
				],
				bytecode: [
					{
						required: true,
						message: '合约类型不能为空',
						trigger: ['blur', 'change']
					}
				],
				abi: [
					{
						required: true,
						message: '合约类型不能为空',
						trigger: ['blur', 'change']
					}
				]
			},
			deployForm: Object.assign({}, deployForm),
			// 部署合约规则
			deployRules: {
				contractName: [
					{
						required: true,
						message: '合约名称不能为空',
						trigger: ['blur', 'change']
					}
				],
				accountName: [
					{
						required: true,
						message: '未选择合约部署人',
						trigger: 'change'
					}
				],
				belong: [
					{
						required: true,
						message: '未选择所属项目',
						trigger: 'change'
					}
				]
			},
			// 用户选项
			userOptions: [],
			// 所属项目
			belongProject: project,
			// 合约类型数组
			contractTypeArr: [],
			// 部署合约数据
			deployCntData: {}
		}
	},
	mounted() {
		this.getBytecodeInfo()
		this.getUser()
	},
	methods: {
		// 获取用户信息
		getUser() {
			this._services.ajaxGet('userList').then(res => {
				if (res.code === 0) {
					let data = res.data
					this.userOptions = data.map(v => {
						return {
							value: v.accountName,
							name: v.accountName
						}
					})
					console.log(this.userOptions)
				}
			})
		},
		// 获取合约信息
		getBytecodeInfo() {
			this._services.ajaxGet('cntBytecodeList').then(res => {
				if (res.code === 0) {
					this.tableData = res.data
				}
			})
		},
		openLayer() {
			this.$refs.cntInfo.open()
		},
		openDeployLayer(data) {
			this.deployCntData = data
			this.$refs.deployLayer.open()
		},
		changePro(v) {
			console.log(v)
			this.deployForm.contractType = ''
			this.belongProject.forEach(val => {
				if (val.value === v) {
					this.contractTypeArr = val.contractTypeArr
				}
			})
		},
		// 提交合约信息
		confirm() {
			this.$refs.form.validate(valid => {
				if (valid) {
					let param = { ...this.form }
					this._services
						.ajaxPost('addCntBytecode', param, {
							loading: true
						})
						.then(res => {
							if (res.code === 0) {
								this.cancle()
								this.getBytecodeInfo()
							}
						})
				}
			})
		},
		// 取消
		cancle() {
			this.form = Object.assign({}, cntObject)
			this.$refs.cntInfo.close()
			this.$refs.form.resetFields()
		},
		// 取消部署
		cancleDeploy() {
			this.deployForm = Object.assign({}, deployForm)
			this.$refs.deployLayer.close()
			this.$refs.deployForm.resetFields()
		},
		// 删除合约
		delCol(data) {
			this.tools
				.confirm('确定删除本条合约信息?', '提示', {
					type: 'warning',
					center: false
				})
				.then(() => {
					this._services.ajaxPost('delCntBytecode', { id: data.id }).then(res => {
						console.log(res)
						if (res.code === 0) {
							this.tools.message('删除合约成功', 'success')
							this.getBytecodeInfo()
						}
					})
				})
		},
		// 确认部署
		confirmDeploy() {
			this.$refs.deployForm.validate(valid => {
				if (valid) {
					const { bytecode, abi } = this.deployCntData
					const param = {
						...this.deployForm,
						bytecode,
						abi
					}
					this._services
						.ajaxPost('deployCnt', param, {
							loading: true
						})
						.then(res => {
							if (res.code === 0) {
								this.cancleDeploy()
							} else {
								this.tools.message(res.message)
							}
						})
				}
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
