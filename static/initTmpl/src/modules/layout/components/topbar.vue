<template>
    <div class="topbar f-cb">
        <div class="topbar__col--l f-fl">
            <a class="menu-popover__ref">
                <i class="el-icon-menu"></i>
                <top-menu-popover/>
            </a>
            <top-menu/>
        </div>
        <div class="topbar__col--r f-fr">

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TopMenu from './topMenu'
import TopMenuPopover from './topMenuPopover'

export default {
    components: {
        TopMenu,
        TopMenuPopover
    },
    computed: {
        ...mapState('app', ['fold', 'user'])
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.topbar {
    position: relative;
    height: $--tb-height;
    line-height: $--tb-height;
    background-color: $--tb-bg;
    box-shadow: 0px 2px 40px 0px rgba(65, 70, 76, 0.07);
    font-size: 14px;
}
.topbar__col--l {
    .menu-popover__ref {
        display: inline-block;
        padding: 0 18px;
        font-size: 24px;
        vertical-align: middle;
        box-shadow: 3px 0px 10px -4px rgba(0, 0, 0, 0.16);
        &:hover {
            .top-menu-popover {
                opacity: 1;
                z-index: 10000;
            }
        }
    }
    /deep/ .top-menu-popover {
        position: absolute;
        left: 0;
        right: 0;
        opacity: 0;
        z-index: -1;
        border-radius: 4px;
        border: 1px solid #dfdfdf;
        background: #fff;
        box-shadow: 0px 3px 11px 0px rgba(56, 62, 68, 0.09);
        transition: all 0.3s;
    }
    /deep/ .top-menu {
        display: inline-block;
    }
}
.topbar__col--r {
    padding-right: 20px;
}
</style>
