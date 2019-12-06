import Sortable from 'sortablejs'
import BasicDialog from '@/components/basicDialog'

export default {
    components: {
        BasicDialog
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        titles: Array,
        updateVis: {
            type: Function,
            default: () => {}
        },
        allFields: {
            type: Array,
            default: () => { return [] }
        },
        valFields: {
            type: Array,
            default: () => { return [] }
        },
        handleSave: {
            type: Function,
            default: () => {}
        }
    },
    watch: {
        visible: function (newVal) {
            if (newVal && !this.rightSortable) {
                this.$nextTick(function () {
                    this.initSortable()
                })
            }
        },
        allFields: {
            immediate: true,
            handler: function (newVal) {
                this.data = _.cloneDeep(newVal) || []
                const map = {}
                for (let i = 0, len = newVal.length; i < len; i++) {
                    map[newVal[i].key] = newVal[i]
                }
                this.fieldMap = map
            }
        },
        valFields: {
            immediate: true,
            handler: function (newVal) {
                const value = []
                for (let i = 0, len = newVal.length; i < len; i++) {
                    value.push(newVal[i].key)
                }
                this.value = value
            }
        }
    },
    data () {
        return {
            data: [],
            value: [],
            fieldMap: {}
        }
    },
    render () {
        return (
            <basic-dialog class="field-set-dlg"
                title={this.dlgTitle}
                visible={this.visible}
                width={562}
                handle-close={this.handleClose}
                handle-closed={this.handleClosed}
                handle-ok={this.handleOk}>
                <el-transfer
                    data={this.data}
                    props={{props:{key: 'key', label: 'name'}}}
                    titles={this.xfeTitles}
                    v-model={this.value}/>
            </basic-dialog>
        )
    },
    mounted () {
        this.initSortable()
    },
    methods: {
        handleClose () {
            this.updateVis(false)
        },
        handleClosed () {

        },
        handleOk () {
            const valFields = []
            const value = this.value
            const map = this.fieldMap
            for (let i = 0, len = value.length; i < len; i++) {
                if (map[value[i]]) {
                    valFields.push(map[value[i]])
                }
            }
            this.handleSave({
                valFields,
                done: () => {
                    this.updateVis(false)
                }
            })
        },
        initSortable () {
            const sortEls = this.$el.querySelectorAll('.el-transfer-panel__list')
            if (sortEls.length && !this.rightSortable) {
                this.rightSortable = new Sortable(sortEls[1], {
                    draggable: '.el-transfer-panel__item',
                    onEnd: ({ newIndex, oldIndex}) => {
                        if (newIndex === oldIndex) {
                            return
                        }
                        const item = this.value[oldIndex]
                        this.value.splice(newIndex, 0, item)
                        if (newIndex < oldIndex) {
                            this.value.splice(oldIndex + 1, 1)
                        } else {
                            this.value.splice(oldIndex, 1)
                        }
                    }
                })
            }
        }
    }
}
