<template>
    <div :class="['sidebar', fold ? 'sidebar-fold' : undefined]">
        <div class="sidebar-logo-block">
            <!--todo-->
        </div>
        <div class="sidebar-search-block">
            <el-autocomplete
                size="medium"
                prefix-icon="el-icon-search"
                placeholder="搜索菜单"
                value-key="moduleName"
                v-model="keyword"
                :debounce="500"
                :trigger-on-focus="false"
                :fetch-suggestions="handleSearch"
                @select="goPage"/>
            <a class="quick-menu-popover__ref">
                <i class="el-icon-plus"></i>
                <quick-menu-popover :show-quick-menu-dlg="showQuickMenuDlg"/>
            </a>
        </div>
        <el-scrollbar>
            <side-menu/>
        </el-scrollbar>
        <div class="sidebar-fold-block" v-if="$route.meta.showSd !== false">
            <a :class="['sidebar-fold-btn', fold ? 'el-icon-caret-right' : 'el-icon-caret-left']" @click="toggleFold"></a>
        </div>
        <quick-menu-dialog
            :visible="quickMenuDlgVis"
            :update-vis="updateQuickMenuDlgVis"/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SideMenu from './sideMenu'
import QuickMenuPopover from './quickMenuPopover'
import QuickMenuDialog from './quickMenuDialog'
import { constants } from 'crypto';
import { getTreeLeaf } from '@/utils/format';
export default {
    components: {
        SideMenu,
        QuickMenuPopover,
        QuickMenuDialog
    },
    computed: {
        ...mapState('app', ['fold','flag','allMenus','sdMenus','keyArr']),
        leaves () {
            const allMenus = this.allMenus
            return jt.tree.getAllLeaves(allMenus, 'children', [])
        }
    },
    data () {
        return {
            quickMenuDlgVis: false,
            keyword: ''
        }
    },
    methods: {
        ...mapActions('app', [
            'queryUserMenu'
        ]),
        toggleFold () {
            this.$store.commit('app/update', { fold: !this.fold })
        },
        updateQuickMenuDlgVis (vis) {
            this.quickMenuDlgVis = vis
        },
        showQuickMenuDlg () {
            this.updateQuickMenuDlgVis(true)
        },
        // 菜单模糊搜索
        handleSearch (keyword, cb) {
            const leaves = this.leaves
            const result = leaves.filter(item => {
                return item.moduleName.indexOf(keyword)  !== -1
            })
            cb(result)
        },
        // 跳转到对应路由
        goPage (item) {
            this.$store.commit('app/actNavTab', { code: item.code })
        }
    }
}
</script>

<style lang="scss" scoped>
$--search-block-height: 60px;

.el-input::-webkit-input-placeholder{
    color: #fff;
}

.sidebar {
    position: relative;
    width: 100%;
    height: 100%;
    .el-scrollbar {
        height: calc(100% - #{$--tb-height + $--search-block-height});
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
            overflow-y: scroll;
        }
    }

    .sidebar-logo-block {
        height: $--tb-height;
        border-bottom: 1px solid #778ca2;
        box-sizing: border-box;
    }

    .sidebar-search-block {
        display: none;
        position: relative;
        height: $--search-block-height;
        padding: 12px 10px;
        box-sizing: border-box;
        /deep/ .el-autocomplete {
            width: 134px;
            margin-right: 10px;
            transform: scaleX(1);
            transition: all 0.3s;

        }
        /deep/ .el-input__inner {
            font-size: 14px;
            border: none;
            border-radius: 5px;
            background-color: #778ca2;
            color: #fff;
        }

        .quick-menu-popover__ref {
            display: inline-block;
            padding: 10px;
            font-size: 14px;
            color: #fff;
            border-radius: 5px;
            background: #409eff;

            &:hover .quick-menu-popover {
                opacity: 1;
                z-index: 1000;
            }

            .quick-menu-popover {
                position: absolute;
                top: 0;
                right: 0;
                opacity: 0;
                z-index: -1;
                transform: translate(100%, 0);
                transition: all 0.3s;
            }
        }
    }
    .sidebar-fold-block {
        position: absolute;
        width: 12px;
        height: 100px;
        line-height: 100px;
        top: 50%;
        right: 0;
        border-radius: 3px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background: #596F92;
        transform: translate(100%, -50%);
        transition: all 0.3s;
    }
}

.sidebar-fold {
    .sidebar-search-block {
        text-align: center;
        /deep/ .el-autocomplete {
            width: 0;
            margin-right: 0;
            transform: scaleX(0);
        }
    }
}
</style>



