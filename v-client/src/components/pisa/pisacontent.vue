<template>
	<el-row :gutter="20" class="h-100">
		<el-col :span="6" class="h-100 overflow-y-auto border-r">
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
				<apiItem contractType="pisa" :data="item.data" :param="item.param" :rules="item.rules"></apiItem>
			</div>
		</el-col>
		<el-col :span="8" class="border-r h-100">
			<outputCtx ref="outputCtx"></outputCtx>
		</el-col>
		<el-col :span="10"></el-col>
	</el-row>
</template>
<script>
import apiItem from '../commom/apiItem'
import outputCtx from '../commom/output.vue'
import { pisaMethodsArr } from './config.data'
export default {
	components: {
		apiItem,
		outputCtx
	},
	data() {
		return {
			methodsArr: pisaMethodsArr,
			// 合约调用者
			caller: '',
			// 合约调用者选项
			userOptions: []
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
		// 添加获取执行合约方法返回参数
		this._event.on('pisa', data => {
			console.log(111)
			if (this.caller) {
				this.handleFn(data, this.caller)
			} else {
				this.tools.message('请先选择调用者')
			}
		})
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
		// 调用方法
		handleFn(methodInfo, accountName) {
			let { contractName, abi } = this.cntInfo
			const param = {
				...methodInfo,
				contractName,
				abi,
				accountName
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
</style>
