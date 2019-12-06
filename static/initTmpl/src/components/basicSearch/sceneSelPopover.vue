<template>
    <el-popover
        placement="bottom-start"
        trigger="hover"
        :popper-class="['scene-sel-popover', !this.scenes.length ? 'no-data' : undefined].join(' ')">
        <a slot="reference" class="scene-sel-popover__ref">
            筛选场景
            <i class="el-icon el-icon-arrow-down"></i>
        </a>
        <div class="popover-bd">
            <div class="scene-item" v-for="item of scenes" :key="item.id">
                <a class="scene-name f-toe1" @click="handleApply(item)">{{item.name}}</a>
                <span class="def-flag" v-if="item.isDefault === 0">默认</span>
                <a class="def-btn" v-else @click="handleDefault(item)">设置默认</a>
                <a class="edit-btn el-icon el-icon-edit-outline" @click="handleEdit(item)"></a>
                <a class="del-btn el-icon el-icon-delete" @click="handleDelete(item)"></a>
            </div>
        </div>
        <div class="popover-ft">
            <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
        </div>
    </el-popover>
</template>

<script>
/**
 * 场景选择浮层
 */
export default {
    props: {
        // 场景列表
        scenes: {
            type: Array,
            default () {
                return []
            }
        },
        handleAdd: {
            type: Function,
            default: () => {}
        },
        handleEdit: {
            type: Function,
            default: () => {}
        },
        handleDelete: {
            type: Function,
            default: () => {}
        },
        handleApply: {
            type: Function,
            default: () => {}
        },
        handleDefault: {
            type: Function,
            default: () => {}
        }
    }
}
</script>

<style lang="scss">
.scene-sel-popover__ref {
    font-size: 12px;
    color: #4D7CFE;
    .el-icon {
        margin-left: 4px;
    }
}
.scene-sel-popover {
    padding: 0;
    width: 300px;
    .popover-bd {
        padding: 10px 0;
        height: 260px;
        overflow: auto;
        box-sizing: border-box;
    }
    .popover-ft {
        padding: 18px 0;
        text-align: center;
        border-top: 1px solid #E8ECEF;
    }
    .scene-item {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        &:hover {
            background:rgba(77, 124, 254, 0.06);
        }
        > * {
            vertical-align: middle;
        }
        .scene-name {
            display: inline-block;
            width: 140px;
            cursor: pointer;
        }
        .def-flag {
            margin-right: 18px;
            padding: 1px 3px;
            color: #4D7CFE;
            background:rgba(77, 124, 254, 0.1);
        }
        .def-btn {
            color: #4D7CFE;
        }
        .el-icon {
            margin-left: 16px;
            font-size: 14px;
            &:hover {
                color: #4D7CFE;
            }
        }
    }
}
.scene-sel-popover.no-data {
    .popover-bd {
        background: url('../../imgs/empty.png') no-repeat center center;
    }
}
</style>
