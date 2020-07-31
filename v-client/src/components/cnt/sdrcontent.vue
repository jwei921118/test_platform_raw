<template>
	<el-row :gutter="20" class="h-100">
		<el-col :span="12" class="h-100 overflow-y-auto border-r">
			<div>
				<label class="m-r-10">请选择合约调用者</label>
				<el-select
					size="small"
					class="m-tb-10"
					v-model="caller"
					@change="selectCaller"
					placeholder="请选择合约调用者"
				>
					<el-option
						v-for="item in userOptions"
						:key="item.value"
						:label="item.name"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div v-for="(item,inx) in methodsArr" :key="inx">
				<apiItem
					@execute="execute"
					contractType="sdr"
					:data="item.data"
					:param="item.param"
					:rules="item.rules"
				></apiItem>
			</div>
		</el-col>
		<el-col :span="12" class="border-r h-100">
			<outputCtx ref="outputCtx"></outputCtx>
		</el-col>
		<!-- <el-col :span="10" class="h-100 overflow-y-auto">
			<tableBase :tableKey="proPartnerKey" :tableData="proPartnerData"></tableBase>
		</el-col> -->
	</el-row>
</template>
<script>
import apiItem from '../commom/apiItem'
import outputCtx from '../commom/output.vue'
import { sdrMethodsArr } from './config.data'
import tableBase from '../base/tableBase'
export default {
	components: {
		apiItem,
		outputCtx,
		// tableBase
	},
	data() {
		return {
			methodsArr: sdrMethodsArr,
			// 合约调用者
			caller: '',
			// 合约调用者选项
			userOptions: [],
			// 合伙人信息
			proPartnerKey: [
				{
					key: 'accountName',
					name: '用户名',
					width: '160px'
				},
				{
					key: 'identity',
					name: '用户地址'
				},
				{
					key: 'balanceof',
					name: '账户余额'
				},
				{
					key: 'updatedAt',
					name: '更新时间'
				}
			],
			proPartnerData: []
		}
	},
	props: {
		cntInfo: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	mounted() {
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
				}
			})
		},
		
		selectCaller(v) {
			this.caller = v
		},
		execute(data) {
			if (this.caller) {
				this.handleFn(data, this.caller)
			}
		},
		// 调用方法
		handleFn(methodInfo, accountName) {
			let { contractName, abi, id, contractType } = this.cntInfo
			const param = {
				...methodInfo,
				contractName,
				abi,
				accountName,
				id,
				contractType
			}
			this._services.ajaxPost('executecnt', param, { loading: true }).then(res => {
				let data = null
				if (res.code === 0) {
					data = res.data
				} else {
					data = res.message
				}
				this.$refs.outputCtx.input(data, res.code)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.border-r {
	border-right: 1px solid $sub-gray;
}
</style>
