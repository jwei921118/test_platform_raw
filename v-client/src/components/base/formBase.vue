<template>
	<el-form
		class="clearfix"
		:label-width="labelWidth"
		:label-position="'left'"
		ref="formRef"
		:rules="rules"
		:model="formData"
	>
		<template v-for="item in formGroups">
			<el-form-item
				:class="'l-mode-' + mode"
				v-if="item.input"
				:label="item.label"
				:prop="item.key"
				:key="item.key"
			>
				<el-input
					v-model="formData[item.key]"
					:placeholder="item.placeholder ? item.placeholder : '请输入'"
					:type="item.type ? item.type : 'text'"
					:size="size"
					:disabled="disabled"
					:clearable="item.clearable"
				></el-input>
			</el-form-item>
			<el-form-item
				:class="'l-mode-' + mode"
				v-if="item.selection"
				:label="item.label"
				:prop="item.key"
				:key="item.key"
			>
				<el-select
					collapse-tags
					v-model="formData[item.key]"
					:multiple="item.multiple"
					:size="size"
					:clearable="item.clearable"
				>
					<el-option
						v-for="option in item.options"
						:placeholder="item.placeholder ? item.placeholder : '请选择'"
						:key="option.code !== undefined ? option.code : option[item.optionKey]"
						:label="option.name !== undefined ? option.name : option[item.optionName]"
						:value="option.code !== undefined ? option.code : option[item.optionKey]"
						:disabled="disabled"
					></el-option>
				</el-select>
			</el-form-item>
		</template>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			formValidate: {} // 通过ref 返回form 的属性和方法
		}
	},
	props: {
		rules: {
			type: Object,
			default() {
				return {}
			}
		}, // 表单字段的规则
		formData: { type: Object }, // 表单所有字段集
		formGroups: { type: Array }, // 表单所有字段的规则 示例 {input:'是否为输入框'，selection:'是否为选择框' , label: '表单描述' , key: '表单字段' , options: [{code:'1', name: '描述'}]}
		labelWidth: { type: String, default: '120px' },
		mode: { type: String, default: '1' },
		size: { type: String, default: 'small' },
		disabled: { type: Boolean, default: false }
	},
	mounted() {
		this.formValidate = this.$refs['formRef']
	}
}
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 12px;
}
.el-form-item__error {
	padding: 0;
}

.el-select {
	display: block;
}
.l-mode-1 {
	width: 100%;
}
.l-mode-2 {
	width: 49%;
	float: left;
	&:nth-of-type(odd) {
		margin-right: 2%;
	}
}
.l-mode-3 {
	width: 32%;
	margin-right: 2%;
	float: left;
	&:nth-of-type(3n) {
		margin-right: 0;
	}
}
.l-mode-4 {
	width: 24%;
	margin-right: 1.33333%;
	float: left;
	&:nth-of-type(4n) {
		margin-right: 0;
	}
}
</style>