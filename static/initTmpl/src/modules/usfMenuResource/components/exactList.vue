<template>
    <basic-list
        :fields="fields"
        :loading="state.loading"
        :total="state.total"
        :list="state.list"
        :table-h="tableH"
        :page-index="state.pageIndex"
        :page-size="state.pageSize"
        :page-index-change="pageIndexChange"
        :page-size-change="pageSizeChange">
        <template slot="hd-col--l">
            <el-button type="primary" size="mini" @click="handleAdd">新增一级分类</el-button>
            <el-button type="primary" size="mini" @click="handleAdd">导入分类</el-button>
        </template>
    </basic-list>
</template>

<script>
import ExactList from '@/mixins/exactList'
export default {
    mixins: [ExactList],
    data () {
        return {
            fields: [
                { key: 'name', name: '商品分类' },
                { key: 'code', name: '分类编码' }
            ]
        }
    }
}
</script>

