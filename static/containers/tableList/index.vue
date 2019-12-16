<template>
  <div>
    <Table-bar
      :fields="fields"
      :list="state.tableData"
      :total="state.total"
      :page-size="state.pageSize"
      :page-index="state.pageIndex"
    />
  </div>
</template>
<script>
import tableMap from './tableMap'
import TableBar from '@container/basicList'
import ExactList from '@/minxs/exactList'
export default {
  components: {
    TableBar
  },
  mixins: [ExactList],
  props: {
    state: {
      type: Object,
      default: () => {}
    }
  },
  provide: {
    formItems: tableMap.formItems
  },
  data() {
    return {
      fields: tableMap.fieldsArr,
      fieldsArr: [],
      query: {}
    }
  },
  watch: {},
  beforeCreate() {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>
