<script>
import { mapState } from 'vuex'
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
        updateVis: {
            type: Function,
            default: () => {}
        }
    },
    computed: {
        ...mapState('app', ['allMenus', 'quickMenus'])
    },
    watch: {
        quickMenus: {
            immediate: true,
            handler: function (newVal) {
                this.checkMenuArr = [...newVal]
            }
        }
    },
    data () {
        return {
            checkMenuArr: [],
            checkMenuMap: {}
        }
    },
    render () {
        return (
            <basic-dialog
                title="设置快捷菜单"
                visible={this.visible}
                width={1064}
                handle-close={this.handleClose}
                handle-closed={this.handleClosed}
                handle-ok={this.handleOk}>
                <div class="block-bd">
                    <div class="panel--l">
                    {this.getLeftMenuItem(this.allMenus)}
                    </div>
                    <div class="panel--r">
                        <draggable v-model={this.checkMenuArr}>
                        {
                            this.checkMenuArr.map(item => {
                                return (
                                    <div class="drag-item">
                                        <span class="name">{item.moduleName}</span>
                                        <i class="el-icon-close" onClick={() => this.handleCheck(false, item)}></i>
                                    </div>
                                )
                            })
                        }
                        </draggable>
                    </div>
                </div>
                <div class="block-ft"></div>
            </basic-dialog>
        )
    },
    methods: {
        handleClose () {
            this.updateVis(false)
        },
        handleClosed () {

        },
        handleOk () {
            this.$store.commit('app/update', { quickMenus: this.checkMenuArr })
            this.updateVis(false)
        },
        handleCheck (check, item) {
            const checkMenuArr = this.checkMenuArr
            const checkMenuMap = this.checkMenuMap
            if (check) {
                checkMenuArr.push(item)
                this.$set(checkMenuMap, item.code, true)
            } else {
                for (let i = 0, len = checkMenuArr.length; i < len; i++) {
                    if (checkMenuArr[i].code === item.code) {
                        checkMenuArr.splice(i, 1)
                        break
                    }
                }
                this.$set(checkMenuMap, item.code, false)
            }
        },
        getLeftMenuItem (menus, level = 1) {
            return (
                <ul class={['menu', `menu-level-${level}`]}>
                {
                    menus.map(item => {
                        const isLeaf = !item.children || !item.children.length
                        return (
                            <li class={[isLeaf ? 'menu-item' : 'submenu']}>
                            {
                                level==2 ? <i class="menu-icon el-icon-menu"></i> : undefined
                            }
                            {
                                isLeaf
                                    ? <el-checkbox value={this.checkMenuMap[item.code]} onChange={(check) => this.handleCheck(check, item)}>{item.moduleName}</el-checkbox>
                                    : <span class="menu-title">{item.moduleName}</span>
                            }
                            {
                                isLeaf
                                    ? undefined
                                    : this.getLeftMenuItem(item.children, level + 1)
                            }
                            </li>
                        )
                    })
                }
                </ul>
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.block-bd {
    display: flex;
    height: 300px;
    font-size: 12px;
}
.panel--l,
.panel--r {
    border: 1px solid #E8ECEF;
    overflow: auto;
}
.panel--l {
    flex: 1;
    margin-right: 48px;
    padding: 20px;
    .menu-level-1 {
        > .submenu > .menu-title {
            padding-left: 10px;
            border-left: 3px solid #4D7CFE;
        }
    }

    .menu-level-2 {
        > .submenu {
            position: relative;
            &::after {
                content: '';
                position: absolute;
                top: 20px;
                bottom: 9px;
                left: 7px;
                border-left: 2px dotted #778CA2;
            }
            > .menu {
                position: relative;
                &::before {
                    content: '';
                    position: absolute;
                    top: 8px;
                    left: 10px;
                    width: 10px;
                    border-top: 2px dotted #778CA2;
                }
            }
        }

        .menu-icon {
            vertical-align: middle;
            font-size: 16px;
            margin-right: 6px;
        }
        .menu-title {
            vertical-align: middle;
        }
    }

    .submenu {
        margin-bottom: 10px;
        > .menu-title {
            font-size: 14px;
            font-weight: bold;

            & + .menu {
                margin-top: 10px;
            }
        }

        > .menu {
            padding-left: 24px;
        }
    }

    .menu-item {
        display: inline-block;
        margin-right: 20px;
    }
}
.icon_active{
    width:14px;
    height:15px;
    font-size: 18px;
    color:rgba(51,51,51,1);
    margin-right: 8px;
    position: relative;
}
.dotted_active{
    width: 7px;
    height: 17px;
    border: 2px dotted #778CA2;
    position: absolute;
    left: 84px;
    margin-top: 22px;
    border-top: none;
    border-right: none;
}
.panel--r {
    width: 200px;
    padding: 10px 0;
    .drag-item {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        .name {
            display: inline-block;
            width: 140px;
            vertical-align: middle;
            cursor: move;
            overflow: hidden;
            word-wrap: normal;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .el-icon-close {
            vertical-align: middle;
            cursor: pointer;
        }
    }
}
</style>
