<template>
    <basic-list
        row-key="id"
        :show-col-set="true"
        :fields="fields"
        :loading="state.loading"
        :total="state.total"
        :list="state.list"
        :table-h="tableH"
        :table-code="tableCode"
        :lazy="true"
        :load="queryDictByType"
        :show-index-col="false"
        :action-render="actionRender"
        :action-col-fixed="'right'"
        :page-index="state.pageIndex"
        :page-size="state.pageSize"
        :page-index-change="pageIndexChange"
        :page-size-change="pageSizeChange">
        <template slot="hd-col--l">
            <el-button type="primary" size="mini" @click="handleAddType">新建字典类型</el-button>
        </template>
    </basic-list>
</template>

<script>
import ExactList from '@/mixins/exactList'
export default {
    mixins: [ExactList],
    props: {
        handleAddType: Function,
        handleEditType: Function,
        handleAddItem: Function,
        handleEditItem: Function
    },
    data () {
        return {
            fields: [
                { key: 'paramTypeCode', name: '字典类型编码' },
                { key: 'paramTypeName', name: '字典类型名称' },
                { key: 'paramName', name: '字典值名称' },
                { key: 'paramCode', name: '字典值编码' },
                { key: 'paramValue', name: '字典值' },
                { key: 'tenantName', name: '所属租户' }
            ]
        }
    },
    methods: {
        actionRender (h, { index, row, col }) {
            return (
                <el-dropdown trigger="click" onCommand={(command) => this.actionProxy(command, row)}>
                    <span class="el-dropdown-link">查看<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item command="delete">删除</el-dropdown-item>
                        {
                            row.dataType === 1
                                ? <el-dropdown-item command="addSub">新建字典值</el-dropdown-item>
                                : undefined
                        }
                    </el-dropdown-menu>
                </el-dropdown>
            )
        },
        actionProxy (command, row) {
            if (command === 'edit') {
                if (row.dataType === 1) {
                    this.handleEditType(row)
                } else {
                    this.handleEditItem(row)
                }
            } else if (command === 'delete') {
                this.handleDelete({ id: row.id })
            } else if (command === 'addSub') {
                this.handleAddItem(row)
            }
        },
        queryDictByType (parent, parentNode, resolve) {
            api.dict.queryDictByType({ 'data': { paramTypeCode: parent.paramTypeCode, dataType: 2 } }).then(({ code, msg, data }) => {
                if (code === 200) {
                    resolve(data)
                } else {
                    this.$message.error(msg)
                }
            })
        }
    }
}
</script>
