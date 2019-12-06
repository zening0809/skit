<script>
import { mapState } from 'vuex'
import SceneSelPopover from './sceneSelPopover'
import SceneSetDialog from './sceneSetDialog'
export default {
    components: {
        SceneSelPopover,
        SceneSetDialog
    },
    props: {
        // 场景数组
        scenes: {
            type: Array,
            default () {
                return []
            }
        },
        searchRender: Function,
        sceneRender: Function,
        handleSearch: Function,
        handleReset: Function,
        handleDelScene: Function,
        handleSaveScene: Function,
        handleApplyScene: Function,
        handleDefaultScene: Function
    },
    data () {
        return {
            closed: true,
            showMore: false,
            size: 'small',
            // 场景设置弹窗是否可见
            sceneSetDlgVis: false,
            // 场景弹窗动作类型
            sceneSetDlgActn: 'add'
        }
    },
    computed: {
        ...mapState('app', ['view'])
    },
    watch: {
        'view.width': {
            immediate: true,
            handler: function (newVal) {
                let size = 'large'
                if (!newVal || newVal < 1360) {
                    size = 'small'
                } else if (newVal >= 1360 && newVal <= 1640) {
                    size = 'medium'
                }
                this.size = size
                this.$nextTick(this.calcStatus)
            }
        }
    },
    render () {
        return (
            <div class={['basic-search', `basic-search--${this.size}`, this.closed ? 'basic-search--close' : 'basic-search--open']}>
                <div class="basic-search__hd">
                    <scene-sel-popover
                        scenes={this.scenes}
                        handle-add={this.addSceneActn}
                        handle-edit={this.editSceneActn}
                        handle-delete={this.delSceneActn}
                        handle-apply={this.applySceneActn}
                        handle-default={this.handleDefaultScene}/>
                </div>
                <div class="basic-search__bd">
                    <div class="col-l">
                        {this.searchRender()}
                    </div>
                    <div class="col-r">
                        <el-button type="primary" size="small" onClick={this.handleSearch}>查询</el-button>
                        <el-button size="small" onClick={this.handleReset}>重置</el-button>
                        {
                            this.showMore
                                ? <a title="展开更多" class="toggle-more-btn" onClick={this.toggleMore}>{this.closed ? '展开查询' : '收起查询'}</a>
                                : undefined
                        }
                    </div>
                </div>
                <scene-set-dialog
                    visible={this.sceneSetDlgVis}
                    update-vis={this.updateSceneSetDlgVis}
                    scene-render={this.sceneRender}
                    handle-save={this.saveSceneActn}/>
            </div>
        )
    },
    methods: {
        calcStatus () {
            const formH = this.$el.querySelector('.basic-search__bd .el-form').offsetHeight
            if (formH > 105 ) {
                this.showMore = true
            } else {
                this.showMore = false
            }
            this.$emit('searchHeightChange', this.$el.offsetHeight)
        },
        toggleMore () {
            this.closed = !this.closed
            this.$nextTick(function () {
                this.$emit('searchHeightChange', this.$el.offsetHeight)
            })
        },
        updateSceneSetDlgVis (vis) {
            this.sceneSetDlgVis = vis
        },
        // 新增场景
        addSceneActn () {
            this.sceneSetDlgActn = 'add'
            this.$emit('sceneChange', {})
            this.updateSceneSetDlgVis(true)
        },
        // 编辑场景
        editSceneActn (scene) {
            this.sceneSetDlgActn = 'edit'
            this.$emit('sceneChange', scene)
            this.updateSceneSetDlgVis(true)
        },
        // 删除场景
        delSceneActn (scene) {
            this.handleDelScene(scene)
        },
        // 保存场景
        saveSceneActn () {
            this.handleSaveScene(this.sceneSetDlgActn, () => {
                this.updateSceneSetDlgVis(false)
            })
        },
        // 应用场景
        applySceneActn (scene) {
            this.handleApplyScene(scene)
        },
        // 设置默认场景
        defaultSceneActn (scene) {
            this.handleDefaultScene(scene)
        }
    }
}
</script>

<style lang="scss" scoped>
.basic-search {
    .basic-search__hd {
        display: flex;
        padding: 16px 0;
        .col-l {
            flex: 1;
        }
        .col-r {
            width: 162px;
        }
    }
    .basic-search__bd {
        display: flex;
        .col-l {
            flex: 1;
            .el-form {
                display: flex;
                flex-wrap: wrap;
            }
            /deep/ .el-form-item {
                padding-right: 15px;
                box-sizing: border-box;
            }
        }
        .col-r {
            position: relative;
            padding: 0 0 0 25px;
            width: 162px;
            .el-button {
                width: 75px;
            }

            .toggle-more-btn {
                position: absolute;
                display: inline-block;
                left: 36px;
                bottom: 22px;
                width: 60px;
                font-size: 12px;
                color: #3998FC;
                background: no-repeat center right;
                background-size: auto 9px;
            }
        }
    }
}
.basic-search--close {
    .basic-search__bd {
        .col-l {
            max-height: 102px;
            overflow: hidden;
        }
        .toggle-more-btn {
            background-image: url('../../imgs/icon-open.png');
        }
    }
}
.basic-search--open {
    .basic-search__bd {
        .col-l {
            max-height: none;
        }
        .toggle-more-btn {
            background-image: url('../../imgs/icon-close.png');
        }
    }
}
.basic-search--small {
    /deep/ .el-form-item {
        width: 33.33%;
    }
    /deep/ .span-2 {
        width: 66.67%;
    }
}
.basic-search--medium {
    /deep/ .el-form-item {
        width: 25%;
    }
    /deep/ .span-2 {
        width: 50%;
    }
}
.basic-search--large {
    /deep/ .el-form-item {
        width: 20%;
    }
    /deep/ .span-2 {
        width: 40%;
    }
}
</style>



