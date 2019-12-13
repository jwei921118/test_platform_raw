<template>
	<div class="block">
		<div class="title clearfix">
			<span class="font-w">{{ data.name }}</span>
			<span class="en-text">funtion</span>
			<span class="en-text sub-text">{{ data.value }}</span>
			<el-button class="fr" size="small" type="primary" plain @click="execute()">调用合约</el-button>
		</div>
		<formBase ref="form" :formData="formData" :formGroups="formGroups" :rules="rules"></formBase>
	</div>
</template>
<script>
import formBase from '../base/formBase.vue'
export default {
	components: {
		formBase
	},
	data() {
		return {
			formData: {},
			formGroups: []
		}
	},
	props: {
		// 测试合约名称
		data: {
			type: Object,
			default() {
				return {}
			}
		},
		param: {
			type: Array,
			default() {
				return []
			}
		},
		rules: {
			type: Object,
			default() {
				return {}
			}
		},
		contractType: {
			type: String,
			default: 'sdr'
		}
	},
	methods: {
		execute() {
			this.$refs.form.formValidate.validate(valid => {
				if (valid) {
					this.param.forEach(v => {
						if (v.type === 'number') {
							this.formData[v.key] = Number(this.formData[v.key])
						}
					})
					let param = {
						methodName: this.data.value,
						param: this.formData
					}
					this._event.emit(this.contractType, param)
				}
			})
		}
	},
	created() {
		this.formData = Object.fromEntries(this.param.map(v => [v.key, null]))
		this.formGroups = this.param.map(v => {
			return {
				input: true,
				label: v.label,
				key: v.key,
				type: v.type
			}
		})
	}
}
</script>
<style lang="scss" scoped>
.block {
	// margin-bottom: 4px;
	padding-bottom: 4px;
	margin-bottom: 4px;
	border-bottom: 1px solid #eee;
	.title {
		line-height: 30px;
		span {
			margin-right: 10px;
		}
		.font-w {
			font-weight: 550;
		}
	}
}
</style>
