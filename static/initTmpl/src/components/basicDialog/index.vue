<template>
    <el-dialog
        class="basic-dialog"
        top="0"
        :class="{'has-ft': showFt}"
        :visible="visible"
        :title="title"
        :width="realWidth"
        :fullscreen="fullscreen"
        :modal="modal"
        :append-to-body="appendToBody"
        :close-on-click-modal="closeOnClickModal"
        @close="handleClose"
        @closed="handleClosed">
        <slot></slot>
        <div slot="footer" class="basic-dialog-ft" v-if="showFt">
            <slot name="ft">
                <el-button size="small" type="primary" @click="handleOk">{{okText}}</el-button>
                <el-button size="small" @click="handleClose">{{closeText}}</el-button>
            </slot>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: Boolean,
        title: String,
        showFt: {
            type: Boolean,
            default: true
        },
        width: {
            type: [ Number, String ],
            default: 802
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        modal: {
            type: Boolean,
            default: true
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        closeText: {
            type: String,
            default: '取消'
        },
        okText: {
            type: String,
            default: '保存'
        },
        handleClose: {
            type: Function,
            default: () => {}
        },
        handleClosed: {
            type: Function,
            default: () => {}
        },
        handleOk: {
            type: Function,
            default: () => {}
        }
    },
    computed: {
        realWidth () {
            if (typeof this.width === 'number') {
                return this.width + 'px'
            } else {
                return this.width
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.basic-dialog {
    display: flex;
    align-items: center;
    /deep/ .el-dialog {
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
        max-height: calc(100% - 30px);
        max-width: calc(100% - 30px);
    }
    /deep/ .el-dialog__header {
        padding: 20px 30px 12px;
        font-size: 14px;
        background: #f5f7fa;
    }
    /deep/ .el-dialog__headerbtn {
        top: 24px;
    }
    /deep/ .el-dialog__body {
        padding: 20px 30px 12px;
        overflow: auto;
    }
}
.basic-dialog-ft {
    text-align: center;
    .el-button + .el-button {
        margin-left: 30px;
    }
}
</style>


