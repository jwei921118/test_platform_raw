<template>
	<el-table
		class="element-reset-table"
		stripe
		highlight-current-row
		:data="tableData"
		key="tableData"
		ref="tableMethods"
		v-loading="loading"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(255, 255, 255, 0.5)"
		:header-row-class-name="thClassName"
		:row-class-name="rowClassName"
		@select="select"
		@select-all="selectAll"
		@row-click="rowClick"
		@current-change="handleCurrentChange"
		size="small"
	>
		<el-table-column v-if="selectType" :type="selectType" width="80"></el-table-column>
		<el-table-column v-if="hasNumber" width="80">
			<template slot-scope="scope">{{ scope.$index + 1 }}</template>
		</el-table-column>
		<template v-for="(item, index) in tableKey">
			<el-table-column
				v-if="item.operations"
				:item="item"
				:index="index"
				:key="index"
				:prop="item.key"
				:label="item.name"
				:width="item.width"
				:sortable="item.sortable ? true : false"
				:formatter="item.formatter ? item.formatter : formatterData"
				:fixed="item.fixed !== undefined ? item.fixed : false"
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					<template v-if="item.ctrlType === 'colorIcon'">
						<el-tooltip
							v-for="(operate, i) in item.operations"
							v-show="
                operate.show === undefined ? true : operate.show(scope.row)
              "
							:key="i"
							effect="dark"
							:content="operate.label"
							placement="top-start"
						>
							<svg
								class="icon mlr-10"
								aria-hidden="true"
								:width="operate.width ? operate.width : '36px'"
								:height="operate.height ? operate.height : '36px'"
								:key="i"
								@click="operate.func(scope.row, $event)"
							>
								<use :href="operate.iconClass" :key="i" />
							</svg>
						</el-tooltip>
					</template>

					<template v-if="item.ctrlType === 'icon'">
						<el-tooltip
							v-for="(operate, i) in item.operations"
							v-show="
                operate.show === undefined ? true : operate.show(scope.row)
              "
							:key="i"
							effect="dark"
							:content="operate.label"
							placement="top-start"
						>
							<i
								class="iconfont"
								:key="i"
								:class="operate.iconClass"
								@click="operate.func(scope.row, $event)"
							></i>
						</el-tooltip>
					</template>

					<template v-if="item.ctrlType === 'text'">
						<span
							v-for="(operate, i) in item.operations"
							v-show="
                operate.show === undefined ? true : operate.show(scope.row)
              "
							:class="operate.textClass(scope.row)"
							:key="i"
							@click="operate.func(scope.row, $event)"
						>
							{{
							operate.formatter === undefined
							? operate.text
							: operate.formatter(scope.row)
							}}
						</span>
					</template>

					<template v-if="item.ctrlType === undefined || item.ctrlType === 'btn'">
						<el-button
							v-for="(operate, i) in item.operations"
							v-show="
                operate.show === undefined ? true : operate.show(scope.row)
              "
							:key="i"
							size="mini"
							:disabled="
                operate.disabledFn === undefined
                  ? operate.disabled
                  : operate.disabledFn(scope.row)
              "
							:type="
                operate.styleFn === undefined
                  ? operate.type
                  : operate.styleFn(scope.row)
              "
							@click="operate.func(scope.row, $event)"
						>
							{{
							operate.formatter === undefined
							? operate.label
							: operate.formatter(scope.row)
							}}
						</el-button>
					</template>
				</template>
			</el-table-column>
			<el-table-column
				v-else
				:item="item"
				:index="index"
				:key="index"
				:prop="item.key"
				:label="item.name"
				:width="item.width"
				:sortable="item.sortable ? true : false"
				:formatter="item.formatter ? item.formatter : formatterData"
				show-overflow-tooltip
			></el-table-column>
		</template>
	</el-table>
</template>

<script>
export default {
	props: {
		tableData: { type: Array }, // 表格数据
		loading: { type: Boolean, default: false }, // 是否开启加载动画
		tableKey: { type: Array }, // 表格字段配置  示例 { key: '字段名' , name: '字段的中文描述' , width: '单元格的宽度' , formatter: '格式化函数' , operations: { type: '类型' , label: '操作名字' , func:'操作函数'}}
		thClassName: { type: String, default: 'th-row-classname' },
		thCellClassName: { type: String },
		rowClassName: { type: String, default: 'row-classname' },
		cellClassName: { type: String },
		selectType: { type: String, default: '' }, //table 选择类型
		hasNumber: { type: Boolean, default: false },
		options: {
			height: { type: String | Number },
			maxheight: { type: String | Number },
			border: { type: Boolean }
		},
		event: {
			select: { type: Function },
			selectAll: { type: Function },
			selectionChange: { type: Function },
			rowClick: { type: Function },
			sortChange: { type: Function }
		} // 表格事件
	},
	data() {
		return {
			tableMethods: {} // 通过ref 返回一个table的所有属性和方法
		}
	},
	methods: {
		/**
		 * @desc 默认格式化数据
		 */
		formatterData(row, column, cellValue) {
			return cellValue
		},

		/**
		 * @desc row 选中
		 * @param {Object} selection 选中行数据
		 * @param {Number} row
		 */
		select(selection, row) {
			if (this.event && this.event.select) {
				this.event.select(selection, row)
			}
		},

		/**
		 * @desc 全选
		 */
		selectAll(selection) {
			if (this.event && this.event.selectAll) {
				this.event.selectAll(selection)
			}
		},

		/**
		 * @desc check选中变化
		 */
		selectionChange(selection) {
			if (this.event && this.event.selectionChange) {
				this.event.selectionChange(selection)
			}
		},

		/**
		 * @desc 行单击
		 */
		rowClick(row, event, column) {
			if (this.event && this.event.rowClick) {
				this.event.rowClick(row, event, column)
			}
		},

		/**
		 * @desc 翻页
		 */
		handleCurrentChange(row) {
			if (row) {
				this.$emit('getRow', row)
			}
		},

		/**
		 * @desc 排序
		 */
		sortChange(row, expandedRows) {
			if (this.event && this.event.sortChange) {
				this.event.sortChange(row, expandedRows)
			}
		}
	},
	mounted() {
		this.tableMethods = this.$refs.tableMethods
	}
}
</script>

<style lang="scss">
.el-table {
	.th-row-classname {
		th {
			background-color: #eeeeee;
		}
	}
	td {
		border-bottom: none;
	}
	th {
		&.is-leaf {
			border-bottom: none;
		}
	}
	.row-classname {
		height: 44px;
	}
	.textYellow {
		background-color: rgba(230, 162, 60, 0.1);
		border-color: rgba(230, 162, 60, 0.2);
		padding: 10px;
		color: #e6a23c;
	}
	.textRed {
		background-color: hsla(0, 87%, 69%, 0.1);
		border-color: hsla(0, 87%, 69%, 0.2);
		padding: 10px;
		color: #f56c6c;
	}
	.textGreen {
		background-color: rgba(103, 194, 58, 0.1);
		border-color: rgba(103, 194, 58, 0.2);
		padding: 10px;
		color: #67c23a;
	}
}
</style>
