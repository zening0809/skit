<template>
    <div class="quick-menu-popover">
        <div class="popover-hd">
            <span class="popover-hd__line"></span>
            <span class="popover-hd__title">快捷菜单设置</span>
        </div>
        <div class="popover-bd">
            <a class="menu-item f-toe1" v-for="item of quickMenus" :key="item.code" @click="goPage(item)">
                {{item.moduleName}}
            </a>
        </div>
        <div class="popover-ft">
            <a @click="showQuickMenuDlg">设置我的快捷菜单</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        showQuickMenuDlg: Function
    },
    computed: {
        ...mapState('app', ['quickMenus'])
    },
    methods: {
        goPage (item) {
            this.$store.commit('app/actNavTab', { code: item.code })
        }
    }
}
</script>

<style lang="scss" scoped>
.quick-menu-popover {
    width: 172px;
    cursor: initial;
    color: #333;
    font-size: 14px;
    background: #fff;
    box-shadow: 0px 3px 11px 0px rgba(56, 62, 68, 0.09);
    border: 1px solid #DFDFDF;
}
.popover-hd {
    padding: 0 20px;
    line-height: 38px;
    font-weight: bold;
    .popover-hd__line,
    .popover-hd__title {
        display: inline-block;
        vertical-align: middle;
    }
    .popover-hd__line {
        width: 3px;
        height: 16px;
        margin-right: 12px;
        background: #4D7CFE;
    }
}

.popover-bd {
    min-height: 80px;
    max-height: 200px;
    overflow: auto;
    .menu-item {
        display: block;
        height: 40px;
        line-height: 40px;
        padding: 0 20px 0 36px;
        &:hover {
            background: rgba(77, 124, 254, 0.06);
        }
    }
}

.popover-ft {
    padding: 0 20px;
    line-height: 48px;
    color: #4D7CFE;
    font-size: 12px;
    text-align: center;
    border-top: 1px solid #E8ECEF;
}
</style>
