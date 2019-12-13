<template>
  <div>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="用户">
        <el-input v-model="query.author" placeholder="请输入用户"></el-input>
      </el-form-item>
      <el-form-item label="审核人">
        <el-input v-model="query.reviewer" placeholder="请输入审核人" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <div class="control">
      <el-table
        ref="handSelectTest_multipleTable"
        :data="tableData"
        @current-change="handleRowClick"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column>
          <template slot="header">
            <div class="btns">
              <el-button
                type="primary"
                @click="()=>{this.handleFunction1(this.multipleSelection)}"
              >功能1</el-button>
              <el-button type="primary">功能2</el-button>
              <el-button type="primary">功能3</el-button>
            </div>
          </template>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            :prop="item.key"
            :label="item.name"
            :width="item.width"
            v-for="(item, index) in fields"
            :key="index"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[10, 20]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
  </div>
</template>
<script>
import { testList } from "@/api/testList";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      currentPage2: 1,
      total: 0,
      fields: [
        { key: "author", name: "用户" },
        { key: "display_time", name: "创建时间" },
        { key: "timestamp", name: "运单号" },
        { key: "reviewer", name: "审核人" },
        { key: "forecast", name: "预收金额" }
      ],
      tableData: [],
      query: {
        author: undefined,
        reviewer: undefined
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      multipleSelection: []
    };
  },
  methods: {
    async queryList(query = {}) {
      console.log("query", query)
      await testList({ ...this.listQuery, ...query }).then(
        ({ code, content }) => {
          if (code === 1) {
            this.tableData = content.rows
            this.total = content.total
          } else {
            this.$message.error(content.message)
          }
        }
      )
    },
    onSubmit() {
      console.log(1)
      this.queryList(this.query)
    },
    handleReset() {
      this.listQuery.page = 1
      this.currentPage2 = 1
      this.queryList()
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`)
      this.listQuery.limit = val
      this.listQuery.page = 1;
      this.currentPage2 = 1;
      this.queryList();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.listQuery.page = val;
      this.queryList();
    },
    handleRowClick(row, column, event) {
      this.$refs.handSelectTest_multipleTable.toggleRowSelection(row);
      // console.log("this.selecTestContent", this.selectTestContent);
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleFunction1(data) {
      console.log(data, "data");
    }
  },
  mounted() {
    this.queryList();
  }
};
</script>
<style  scoped>
.demo-form-inline {
  margin: 20px 40px;
  display: flex;
  justify-content: space-around;
}
tr {
  background-color: rgb(245, 247, 250);
}
.control {
  background-color: rgb(245, 247, 250);
}
.btns {
  margin-left: 10px;
}
.block {
  display: flex;
  text-align: right;
  justify-content: flex-end;
}
</style>