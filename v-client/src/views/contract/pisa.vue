<template>
	<div>
		<!--  -->
		<el-row :gutter="20">
			<el-col :span="8">
				<div class="title">稳定币合约</div>
				<tableBase :tableKey="tableKey" :tableData="sdrCntList"></tableBase>
			</el-col>
			<el-col :span="8">
				<div class="title">PISA商户合约</div>
				<tableBase :tableKey="tableKey" :tableData="pisaCntList"></tableBase>
			</el-col>
			<el-col :span="8">
				<div class="title">对账合约</div>
				<tableBase :tableKey="tableKey" :tableData="confirmCntList"></tableBase>
			</el-col>
		</el-row>
		<el-tabs
			class="m-t-20"
			:class="{'reset-tab': editableTabsValue}"
			v-model="editableTabsValue"
			type="card"
			closable
			@tab-remove="removeTab"
			@tab-click="clickTab"
		>
			<el-tab-pane
				class="h-100"
				v-for="item in editableTabs"
				:key="item.name"
				:label="item.title"
				:name="item.name"
			>
				<keep-alive>
					<component :cntInfo="cntInfo" v-bind:is="currentTabComponent"></component>
				</keep-alive>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import tableBase from '@/components/base/tableBase.vue'
import sdrcontent from '@/components/pisa/sdrcontent.vue'
import pisacontent from '@/components/pisa/pisacontent.vue'
import confirmcontent from '@/components/pisa/confirmcontent.vue'
import { project } from '@/constant/data'
const contractTypeArr = project[0].contractTypeArr
export default {
	components: {
		tableBase,
		sdrcontent,
		pisacontent,
		confirmcontent
	},
	data() {
		return {
			tableKey: [
				{
					key: 'contractName',
					name: '合约名称',
					width: '180px'
				},
				{
					key: 'contractType',
					name: '合约类型',
					formatter: row => {
						return contractTypeArr.filter(v => v.value === row.contractType)[0].name
					}
				},
				{
					key: 'identity',
					name: '合约地址'
				},
				{
					key: 'deployer',
					name: '部署人'
				},
				{
					key: 'operation',
					name: '操作',
					ctrlType: 'text',
					width: '160px',
					operations: [
						{
							text: '加入测试列表',
							textClass: () => {
								return 'main-color m-r-10 cursor-p'
							},
							func: this.addToTest
						},
						{
							text: '删除',
							textClass: () => {
								return 'error-text m-r-10 cursor-p'
							},
							func: this.delCnt
						}
					]
				}
			],
			// 稳定币合约
			sdrCntList: [],
			// 商户pisa合约
			pisaCntList: [],
			// 对账合约
			confirmCntList: [],
			editableTabs: [],
			editableTabsValue: '',
			// 合约类型
			contractType: '',
			// 合约信息
			cntInfo: {},
			currentTabComponent: null
		}
	},
	mounted() {
		this.editableTabsValue = ''
		this.getCntList('sdrCntList')
		this.getCntList('pisaCntList')
		this.getCntList('confirmCntList')
	},
	methods: {
		// 获取稳定币合约列表
		getCntList(type) {
			this._services.ajaxGet(type).then(res => {
				if (res.code === 0) {
					if (type === 'sdrCntList') {
						this.sdrCntList = res.data
					} else if (type === 'pisaCntList') {
						this.pisaCntList = res.data
					} else if (type === 'confirmCntList') {
						this.confirmCntList = res.data
					}
				}
			})
		},
		// 添加到测试
		addToTest(data) {
			let indexOf = this.editableTabs.map(v => v.name).indexOf(data.contractName)
			if (indexOf < 0) {
				this.editableTabs.push({
					title: data.contractName,
					name: data.contractName,
					contractType: data.contractType
				})
			}
			this.editableTabsValue = data.contractName
			this.contractType = data.contractType
			if (this.contractType === 'sdr') {
				this.currentTabComponent = sdrcontent
			} else if (this.contractType === 'pisa') {
				this.currentTabComponent = pisacontent
			} else if (this.contractType === 'confirmOrder') {
				this.currentTabComponent = confirmcontent
			}
			this.cntInfo = Object.assign({}, data)
		},
		clickTab(data) {
			console.log(data)
			let name = data.name
			let contractType = this.editableTabs.filter(v => v.name == name)[0].contractType
			if (contractType === 'sdr') {
				this.currentTabComponent = sdrcontent
			} else if (contractType === 'pisa') {
				this.currentTabComponent = pisacontent
			} else if (contractType === 'confirmOrder') {
				this.currentTabComponent = confirmcontent
			}
		},
		// 清除tab
		removeTab(targetName) {
			this.editableTabsValue = ''
			let indexOf = this.editableTabs.map(v => v.name).indexOf(targetName)
			let activeInx = this.editableTabs.map(v => v.name).indexOf(this.editableTabsValue)
			this.editableTabs.splice(indexOf, 1)
			if (indexOf === activeInx && indexOf > 0) {
				this.editableTabsValue = this.editableTabs[indexOf - 1].name
			}
		},
		// 删除
		delCnt(data) {
			this.tools
				.confirm('确认删除合约?', '提示', {
					type: 'warning',
					center: false
				})
				.then(() => {
					let { contractType, id } = data
					const param = {
						id,
						contractType
					}
					this._services
						.ajaxPost('delDeployedCnt', param, { loading: true })
						.then(res => {
							if (res.code === 0) {
								let type = null
								if (contractType === 'sdr') {
									type = 'sdrCntList'
								} else if (contractType === 'pisa') {
									type = 'pisaCntList'
								} else if (contractType === 'confirmOrder') {
									type = 'confirmCntList'
								}
								this.getCntList(type)
							} else {
								this.tools.message(res.message)
							}
						})
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	color: #696969;
	font-weight: 550;
	margin: 6px 0;
}
</style>