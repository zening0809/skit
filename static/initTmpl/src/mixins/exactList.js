import BasicList from '@/components/basicList'

/**
 * 列表页数据列表公共方法混入
 */
export default {
    components: {
        BasicList
    },
    props: {
        state: Object,
        tableH: Number,
        tableCode: String,
        pageIndexChange: Function,
        pageSizeChange: Function,
        handleAdd: Function,
        handleEdit: Function,
        handleDelete: Function,
        handleSelectionChange: Function
    },
    data () {
        return {
            // 选中行
            selRows: [],
            // 是否显示列设置
            showColSet: true,
            // 导出弹窗是否可见
            expSetDlgVis: false,
            // 已选导出字段
            expFields: []
        }
    },
    methods: {
        selectionChange (rows) {
            this.selRows = rows
            this.handleSelectionChange && this.handleSelectionChange(rows)
        },
        updateExpSetDlgVis (vis) {
            this.expSetDlgVis = vis
        },
        expProxy (command) {
            if (command === 'expSet') {
                this.updateExpSetDlgVis(true)
            } else if (command === 'doExp') {

            }
        },
        handleSaveExpSet ({ valFields, done }) {
            const cols = []
            for (let i = 0, len = valFields.length; i < len; i++) {
                cols.push({
                    paramNo: valFields[i].key,
                    paramName: valFields[i].name,
                    paramSeq: i + 1
                })
            }
            if (!this.tableCode) {
                return
            }
            api.custom.updateCustomCols({ data: {
                tableCode: this.tableCode + '|exp',
                customRowParamList: cols
            }}).then(({ code, msg }) => {
                if (code === 200) {
                    done && done()
                    this.expFields = valFields
                } else {
                    this.$message.error(msg)
                }
            })
        }
    }
}
