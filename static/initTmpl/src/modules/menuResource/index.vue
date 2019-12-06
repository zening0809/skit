<template>
    <div class="p-basic">
        <exact-search
            ref="exactSearch"
            :immediate="immediateQuery"
            :update-state="updateState"
            :query-list="queryList"
            :search-height-change="calcHeight"/>
        <exact-list
            :state="state"
            :table-h="tableH1"
            :handle-add="handleAdd"/>
        <entity-dialog
            :module-name="moduleName"
            :visible="entityDlgVis"
            :action="entityDlgActn"
            :entity="state.entity"
            :update-vis="updateEntityDlgVis"
            :handle-save="handleSave"/>
    </div>
</template>

<script>
import PageList from '@/mixins/pageList'
import store from './store'
import ExactSearch from './components/exactSearch'
import ExactList from './components/exactList'
import EntityDialog from './components/entityDialog'
export default {
    name: 'menuResource',
    mixins: [PageList],
    components: {
        ExactSearch,
        ExactList,
        EntityDialog
    },
    data () {
        return {
            // store唯一标识
            storeKey: 'menuResource',
            // 模块名称
            moduleName: '自定义模块'
        }
    },
    created () {
        this.registStore(store)
    },
    methods: {

    }
}
</script>

