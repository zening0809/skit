
import BasicDialog from '@/components/basicDialog'

const ACTIONS = {
    add: '新增',
    view: '查看',
    edit: '编辑'
}

export default {
    components: {
        BasicDialog
    },
    props: {
        moduleName: String,
        visible: {
            type: Boolean,
            default: false
        },
        // add | view | edit
        action: {
            type: String,
            default: 'add'
        },
        entity: {
            type: Object,
            default () {
                return {}
            }
        },
        updateVis: {
            type: Function,
            default: () => {}
        },
        updateState: {
            type: Function,
            default: () => {}
        },
        handleSave: {
            type: Function,
            default: () => {}
        }
    },
    computed: {
        title () {
            return ACTIONS[this.action] + this.moduleName
        },
        showFt () {
            return this.action !== 'view'
        }
    },
    data () {
        this.allFieldKeys = this.getFieldKeys(this.allFields)
        return {
            dto: this.toFront()
        }
    },
    watch: {
        entity () {
            this.dto = this.toFront()
        }
    },
    methods: {
        getFieldKeys (fields = []) {
            const keys = []
            for (let i = 0, len = fields.length; i < len; i++) {
                if (_.isObject(fields[i])) {
                    keys[i] = fields[i].key
                } else {
                    keys[i] = fields[i]
                }
            }
            return keys
        },
        isDisabled (field) {
            if (this.action === 'add') {
                return false
            } else if (this.action === 'view') {
                return true
            } else {
                if (this.disFieldKeys.indexOf(field) !== -1) {
                    return true
                }
                return false
            }
        },
        getDefaultDto () {
            const fields = this.allFields || []
            const dto = {}
            for (let i = 0, len = fields.length; i < len; i++) {
                if (_.isObject(fields[i])) {
                    dto[fields[i].key] = fields[i].default
                } else {
                    dto[fields[i]] = undefined
                }
            }
            return dto
        },
        toFront () {
            return {
                ...this.getDefaultDto(),
                ..._.cloneDeep(this.entity)
            }
        },
        toEnd () {
            return _.pick(this.dto, this.allFieldKeys)
        },
        handleClose () {
            this.updateVis(false)
        },
        handleClosed () {
            this.updateState('entity')
            if (this.$refs.form) {
                this.$nextTick(() => {
                    this.$refs.form.clearValidate()
                })
            }
        },
        handleOk () {
            if (!this.$refs.form) {
                return
            }
            this.$refs.form.validate(valid => {
                if (!valid) {
                    return
                }
                let params = this.toEnd()
                this.handleSave({ params, type: this.action})
            })
        }
    }
}
