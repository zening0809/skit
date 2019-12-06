import PageBase from './pageBase'

/**
 * 列表页公共方法混入
 */
export default {
    mixins: [ PageBase ],
    data () {
        return {
            // 实体弹窗是否可见
            entityDlgVis: false,
            // 实体弹窗动作类型
            entityDlgActn: 'add',
            // 是否立即查询
            immediateQuery: true,
            // 表格一高度
            tableH1: null,
            // 编码前缀(菜单编码)
            codePrefix: `${this.$route.meta.code}|`
        }
    },
    watch: {
        'app.view.height' () {
            this.$nextTick(this.calcHeight)
        }
    },
    activated () {
        this.$nextTick(this.calcHeight)
    },
    methods: {
        // 计算高度
        calcHeight () {
            if (this._inactive) {
                return
            }
            const $search = this.$refs.exactSearch
            if (!$search) {
                return
            }
            const searchH = $search.$el.offsetHeight
            const pageH = this.app.view.height
            if (!pageH) {
                return
            }
            this.tableH1 = pageH - searchH - 80
        },
        // 列表查询
        queryList () {
            this.dispatch('queryList')
        },
        // 响应分页索引发生改变
        pageIndexChange (index) {
            this.updateState({ pageIndex: index - 1 })
            this.queryList()
        },
        // 响应分页尺寸发生改变
        pageSizeChange (size) {
            this.updateState({ pageIndex: 0, pageSize: size })
            this.queryList()
        },
        // 新增按钮响应事件
        handleAdd () {
            this.entityDlgVis = true
            this.entityDlgActn = 'add'
            this.updateState('entity')
        },
        /**
         * 查看按钮响应事件
         * @param {*} params
         * @param {*} flag true(通过接口获取实体对象)， false(当前传入参数作为实体对象)
         */
        handleView (params, flag) {
            this.entityDlgVis = true
            this.entityDlgActn = 'view'
            if (flag) {
                this.dispatch('queryEntity', { params })
            } else {
                this.updateState({ entity: params })
            }
        },
        /**
         * 编辑按钮响应事件
         * @param {*} params
         * @param {Boolean} flag: true(通过接口获取实体对象)， false(当前传入参数作为实体对象)
         */
        handleEdit (params, flag) {
            if (flag) {
                this.dispatch('queryEntity', { params }).then(res => {
                    this.entityDlgVis = true
                    this.entityDlgActn = 'edit'
                })

            } else {
                this.updateState({ entity: params })
                this.entityDlgVis = true
                this.entityDlgActn = 'edit'
            }
        },
        // 删除按钮响应事件
        handleDelete (params, msg) {
            msg = msg || `确定删除选中的${this.moduleName}吗`
            const done = () => {
                if (this.state.list.length <= 1) {
                    this.updateState({ pageIndex: 0 })
                }
                this.queryList()
            }
            this.$confirm(msg, '操作提示').then(() => {
                this.dispatch('deleteEntity', { params, done })
            }).catch(() => {})
        },
        // 保存按钮响应事件
        handleSave ({ params, type }) {
            const done = () => {
                this.updateEntityDlgVis(false)
                this.queryList()
            }
            if (type === 'add') {
                // 新建
                this.dispatch('createEntity', { params, done })
            } else {
                // 更新
                this.dispatch('updateEntity', { params, done })
            }
        },
        // 更新实体弹框可见状态
        updateEntityDlgVis (vis) {
            this.entityDlgVis = vis
        }
    }
}
