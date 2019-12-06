<script>
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
        updateVis: Function,
        sceneRender: Function,
        handleSave: Function
    },
    render () {
        return (
            <basic-dialog
                title="筛选设置"
                class="scene-set-dialog"
                visible={this.visible}
                width={556}
                append-to-body={true}
                update-vis={this.updateVis}
                handle-close={this.handleClose}
                handle-closed={this.handleClosed}
                handle-ok={this.handleSave}>
                {this.sceneRender()}
            </basic-dialog>
        )
    },
    methods: {
        handleClose () {
            this.updateVis(false)
        },
        handleClosed () {

        }
    }
}
</script>

<style lang="scss" scoped>
.scene-set-dialog {
    /deep/ .query-block,
    /deep/ .default-block {
        display: flex;
        flex-wrap: wrap;
    }
    /deep/ .el-form-item {
        width: 50%;
        padding-right: 15px;
        box-sizing: border-box;
    }
    /deep/ .el-form-item.span-2 {
        width: 100%;
    }
}
</style>
