<template>
	<el-dialog
		class="reset-layer"
		:visible.sync="dialogVisible"
		:custom-class="defaultCustomClass"
		:width="defaultOptions.width"
		:fullscreen="defaultOptions.fullscreen"
		:top="defaultOptions.top"
		:modal="defaultOptions.modal"
		:modal-append-to-body="defaultOptions.modalAppendToBody"
		:lock-scroll="defaultOptions.lockScroll"
		:close-on-click-modal="defaultOptions.closeOnClickModal"
		:close-on-press-escape="defaultOptions.closeOnPressEscape"
		:show-close="defaultOptions.showClose"
		:center="defaultOptions.center"
		:destroy-on-close="defaultOptions.destroyOnClose"
	>
		<slot></slot>
		<div slot="title" class="dialog-title">{{ defaultOptions.title }}</div>
	</el-dialog>
</template>
<script>
export default {
	data() {
		return {
			dialogVisible: false,
			defaultOptions: {
				modal: true,
				modalAppendToBody: true,
				lockScroll: true,
				closeOnClickModal: true,
				closeOnPressEscape: true,
				showClose: true,
				top: '30vh'
			},
			// 默认重置样式
			defaultCustomClass: 'reset-dialog'
		}
	},
	props: {
		// 属性
		options: {
			type: Object,
			default() {
				return {}
			}
		},
		customClass: { type: String, default: '' }
	},
	methods: {
		open() {
			this.dialogVisible = true
		},
		close() {
			this.dialogVisible = false
		}
	},
	created() {
		this.defaultOptions = { ...this.defaultOptions, ...this.options }
		this.defaultCustomClass = this.customClass
			? this.customClass + ' ' + this.defaultCustomClass
			: this.defaultCustomClass
	}
}
</script>
<style lang="scss">
.dialog-title {
	position: relative;
	font-size: 18px;
	font-weight: bold;
}
.reset-dialog {
	border-radius: 8px !important;
}
</style>
