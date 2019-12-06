<template>
    <div class="p-basic">
        <exact-search
            ref="exactSearch"
            :search-code="codePrefix + '01'"
            :immediate="immediateQuery"
            :update-state="updateState"
            :query-list="queryList"
            :search-height-change="calcHeight"/>
        <exact-list
            :state="state"
            :table-h="tableH1"
            :table-code="codePrefix + '01'"
            :page-index-change="pageIndexChange"
            :page-size-change="pageSizeChange"
            :handle-add-type="handleAddType"
            :handle-edit-type="handleEditType"
            :handle-add-item="handleAddItem"
            :handle-edit-item="handleEditItem"
            :handle-delete="handleDelete"/>
        <type-dlg
            module-name="字典类型"
            :action="typeDlgAct"
            :entity="state.entity"
            :levels="enums.DataTypeEnum.array"
            :visible="typeDlgVis"
            :update-vis="updateTypeDlgVis"
            :update-state="updateState"
            :handle-save="handleSave"/>
        <item-dlg
            module-name="字典值"
            :action="itemDlgAct"
            :entity="state.entity"
            :visible="itemDlgVis"
            :update-vis="updateItemDlgVis"
            :update-state="updateState"
            :handle-save="handleSave"/>
    </div>
</template>

<script>
import PageList from '@/mixins/pageList'
import store from './store'
import ExactSearch from './components/exactSearch'
import ExactList from './components/exactList'
import TypeDlg from './components/typeDlg'
import ItemDlg from './components/itemDlg'
export default {
    name: 'organizations',
    mixins: [PageList],
    components: {
        ExactSearch,
        ExactList,
        TypeDlg,
        ItemDlg
    },
    data () {
        return {
            // store唯一标识
            storeKey: 'organizations',
            // 模块名称
            moduleName: '数据字典',
            // 字典类型弹窗动作类型
            typeDlgAct: 'add',
            // 字典类型弹窗是否可见
            typeDlgVis: false,
            // 字典条目弹窗动作类型
            itemDlgAct: 'add',
            // 字典条目弹窗是否可见
            itemDlgVis: false
        }
    },
    created () {
        this.registStore(store)
        this.queryEnums(['DataTypeEnum'])
    },
    methods: {
        updateTypeDlgVis (vis) {
            this.typeDlgVis = vis
        },
        updateItemDlgVis (vis) {
            this.itemDlgVis = vis
        },
        handleAddType () {
            this.typeDlgAct = 'add'
            this.updateTypeDlgVis(true)
        },
        handleEditType (params) {
            this.typeDlgAct = 'edit'
            this.updateTypeDlgVis(true)
            this.updateState({ entity: params })
        },
        handleAddItem (sup) {
            this.itemDlgAct = 'add'
            this.updateItemDlgVis(true)
            this.updateState({ entity: { ...sup, dataType: 2 } })
        },
        handleEditItem (params) {
            this.itemDlgAct = 'edit'
            this.updateItemDlgVis(true)
            this.updateState({ entity: params })
        },
        // 保存按钮响应事件
        handleSave ({ params, type }) {
            const done = () => {
                if (params.dataType === 1) {
                    this.updateTypeDlgVis(false)
                } else {
                    this.updateItemDlgVis(false)
                }
                this.queryList()
            }
            if (type === 'add') {
                // 新建
                this.dispatch('createEntity', { params, done })
            } else {
                // 更新
                this.dispatch('updateEntity', { params, done })
            }
        },
    }
}
</script>

