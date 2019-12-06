<template>
    <div class="basic-list" v-loading="loading">
        <div class="basic-list__hd f-cb" v-if="showHead">
            <div class="basic-list__hd-col--l f-fl">
                <slot name="hd-col--l"></slot>
            </div>
            <div class="basic-list__hd-col--r f-fr">
                <el-pagination
                    v-if="showPage && list.length"
                    :current-page="pageIndex + 1"
                    :page-size="pageSize"
                    :page-sizes="pageSizes"
                    :total="total"
                    layout="total, sizes, prev, jumper, slot, next "
                    @current-change="pageIndexChange"
                    @size-change="pageSizeChange">
                    <span class="page-count"> / {{pageCount}}</span>
                </el-pagination>
                <a class="el-icon-setting basic-list__field-set-btn" @click="updateColSetDlgVis(true)" v-if="showColSet"></a>
            </div>
        </div>
        <el-table
            border
            ref="table"
            size="small"
            :lazy="lazy"
            :load="load"
            :stripe="stripe"
            :data="list"
            :row-key="rowKey"
            :height="tableH"
            :tree-props="treeProps"
            @selection-change="selectionChange"
            @row-click="rowClick"
            style="width: 100%">
            <el-table-column align="center" type="selection" :width="50" v-if="showSelectCol && selectType === 'multiple'"/>
            <el-table-column align="center" :width="50" v-if="showSelectCol && selectType === 'single'">
                <template slot-scope="scope">
                    <el-radio v-model="radioIndex" :label="scope.$index">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column align="center" type="index" :width="indexColWidth" fixed="left" :label="indexColLabel"  :index="getIndex" v-if="showIndexCol"/>
            <el-table-column
                align="center"
                class-name="basic-list__col--action"
                v-if="showActionCol"
                :fixed="actionColFixed"
                :width="actionColWidth"
                :label="actionColLabel">
                <template slot-scope="scope">
                    <table-column
                        :index="scope.$index"
                        :row="scope.row"
                        :col="scope.column"
                        :render="actionRender"
                    />
                </template>
            </el-table-column>
            <template  v-for="(item, index) of colFields">
                <el-table-column
                    v-if="!item.render"
                    :key="`${item.key}-${index}`"
                    :class-name="item.classNames ? item.classNames.join(' ') : null"
                    :prop="item.key"
                    :label="item.name"
                    :align="item.align || 'center'"
                    :width="item.width ? item.width + 'px' : undefined"
                    :min-width="item.minWidth ? item.minWidth + 'px' : '120px'"
                    :render-header="item.hdRender"
                    :formatter="item.formatter">
                </el-table-column>
                <el-table-column
                    v-else
                    :key="`${item.key}-${index}`"
                    :class-name="item.classNames ? item.classNames.join(' ') : null"
                    :prop="item.key"
                    :label="item.name"
                    :align="item.align || 'center'"
                    :width="item.width ? item.width + 'px' : undefined"
                    :min-width="item.minWidth ? item.minWidth + 'px' : '120px'"
                    :render-header="item.hdRender">
                    <template slot-scope="scope">
                        <table-column
                            :index="scope.$index"
                            :row="scope.row"
                            :col="scope.column"
                            :field="item"
                            :render="item.render"/>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <column-set-dlg
            :visible="colSetDlgVis"
            :update-vis="updateColSetDlgVis"
            :val-fields="colFields"
            :all-fields="fields"
            :handle-save="handleSaveColSet"/>
    </div>
</template>

<script>
import TableColumn from '@/components/tableColumn'
import ColumnSetDlg from './columnSetDlg'

const DEFAULTS = {
    radioIndex: null
}

export default {
    components: {
        TableColumn,
        ColumnSetDlg
    },
    props: {
        stripe: {
            type: Boolean,
            default: true
        },
        tableH: {
            type: Number
        },
        // 表格唯一code码
        tableCode: {
            type: String
        },
        // 表格所有字段
        fields: {
            type: Array,
            default () {
                return []
            }
        },
        //是否显示索引列
        showIndexCol: {
            type: Boolean,
            default: true
        },
        // 索引列宽度
        indexColWidth: {
            type: Number,
            default: 55
        },
        // 索引列Label
        indexColLabel: {
            type: String,
            default: '序号'
        },
        // 是否显示选择列
        showSelectCol: {
            type: Boolean,
            default: false
        },
        // 选择类型(单选|多选)
        selectType: {
            type: String,
            default: 'multiple'
        },
        // 是否显示操作列
        showActionCol: {
            type: Boolean,
            default: true
        },
        // 索引列是否固定
        actionColFixed: {
            type: [Boolean, String],
            default: 'right'
        },
        // 操作列宽度
        actionColWidth: {
            type: Number,
            default: 100
        },
        // 操作列Label
        actionColLabel: {
            type: String,
            default: '操作'
        },
        // 操作列渲染函数
        actionRender: {
            type: Function,
            default: () => {}
        },
        // 树形列表是否懒加载
        lazy: {
            type: Boolean,
            default: false
        },
        // 懒加载调用函数
        load: Function,
        loading: {
            type: Boolean,
            default: false
        },
        showHead: {
            type: Boolean,
            default: true
        },
        showPage: {
            type: Boolean,
            default: true
        },
        pageIndex: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default () {
                return [10, 20]
            }
        },
        total: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            default () {
                return []
            }
        },
        rowKey: {
            type: [ String, Function],
            default () {
                return undefined
            }
        },
        treeProps: {
            type: Object,
            default () {
                return { children: 'children', hasChildren: 'hasChildren' }
            }
        },
        pageIndexChange: {
            type: Function,
            default: () => {}
        },
        pageSizeChange: {
            type: Function,
            default: () => {}
        },
        selectionChange: {
            type: Function,
            default: () => {}
        },
        handleRowClick: {
            type: Function,
            default: () => {}
        },
        // 是否显示列
        showColSet: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            ..._.cloneDeep(DEFAULTS),
            // 列设置弹窗是否可见
            colSetDlgVis: false,
            // 显示的列字段
            colFields: this.fields,
            // 列设置是否已经保存过
            colSetSaved: false
        }
    },
    computed: {
        pageCount () {
            return Math.ceil(this.total / this.pageSize)
        }
    },
    watch: {
        radioIndex (newVal) {
            if (newVal !== null || newVal !== undefined) {
                this.selectionChange([this.list[newVal]])
            } else {
                this.selectionChange([])
            }
        }
    },
    created () {
        // 查询列设置查询
        if (this.showHead && this.showColSet) {
            this.queryColSet()
        }
    },
    methods: {
        getIndex (index) {
            return this.pageIndex * this.pageSize + index + 1
        },
        rowClick (row, col) {
            if (col && col.className === 'edit-col') {
                return
            }
            const table = this.$refs.table
            let selected = false
            if (this.showSelectCol) {
                if (this.selectType === 'multiple') {
                    table.toggleRowSelection(row)
                    const selection = table.selection
                    for (let i = 0, len = selection.length; i < len; i++) {
                        if (selection[i] === row) {
                            selected = true
                            break
                        }
                    }
                } else if (this.selectType === 'single') {
                    const list = this.list
                    for (let i = 0, len = this.list.length; i < len; i++) {
                        if (list[i] === row) {
                            if (i === this.radioIndex) {
                                this.radioIndex = null
                            } else {
                                this.radioIndex = i
                                selected = true
                            }
                            break
                        }
                    }
                }
            }
            this.handleRowClick(row, selected)
        },
        updateData (arg) {
            Object.assign(this, arg)
        },
        resetData (arg) {
            if (_.isEmpty(arg) || _.isObject(arg)) {
                Object.assign(this, { ..._.cloneDeep(DEFAULTS), ...(arg || {})})
            } else if(_.isObject(arg)) {
                Object.assign(this, arg)
            } else if (_.isArray(arg)) {
                for (let i = 0; i < arg.length; i++) {
                    this[arg[i]] = _.cloneDeep(DEFAULTS[arg[i]])
                }
            } else if (_.isString(arg)) {
                this[arg] = _.cloneDeep(DEFAULTS[arg])
            }
        },
        updateColSetDlgVis (vis) {
            this.colSetDlgVis = vis
        },
        handleSaveColSet ({ valFields, done }) {
            const cols = []
            for (let i = 0, len = valFields.length; i < len; i++) {
                cols.push({
                    paramNo: valFields[i].key,
                    paramName: valFields[i].name,
                    paramSeq: i + 1
                })
            }
            if (!cols.length) {
                this.$message.error('请至少保留一个显示字段')
            }
            if (!this.tableCode) {
                return
            }
            const saveFn = this.colSetSaved ? api.component.updateCustomColumn : api.component.addCustomColumn
            saveFn({ data: {
                tableCode: this.tableCode + '|col',
                customRowParamList: cols
            }}).then(({ code, msg }) => {
                if (code === 200) {
                    this.colFields = valFields
                    this.$nextTick(function () {
                        this.$refs.table.doLayout()
                    })
                    done && done()
                } else {
                    this.$message.error(msg)
                }
            })
        },
        queryColSet () {
            api.component.queryCustomColumnDetail({ data: this.tableCode + '|col' }).then(({ code, msg, data }) => {
                if (code === 200 && data.length) {
                    this.colSetSaved = true
                    const colFields = []
                    data.forEach(item => {
                        colFields.push({ key: item.paramNo, name: item.paramName })
                    })
                    this.colFields = colFields
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.basic-list {
    /deep/ .cell {
        .el-radio__label {
            display: none;
        }
    }
}
.basic-list__hd {
    padding: 15px 10px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #e8ecef;
    border-bottom: none;
    background: #fcfcfc;

    .el-dropdown:not(:first-child) {
        margin-left: 10px
    }
}
.basic-list__sel-field-btn {
    margin-left: 12px;
    vertical-align: middle;
    color: #606266;
    cursor: pointer;
}
.el-pagination {
    display: inline-block;
    font-size: 12px;
    /deep/ .el-select .el-input {
        width: 60px;
    }
    /deep/ .el-pagination__jump {
        margin-left: 0;
    }
    /deep/ .page-count {
        min-width: auto;
        font-weight: normal;
        color: #606266;
    }
}
</style>
