<template>
  <div>
    <Table-bar
      :fields="fields"
      :list="state.list"
      :total="state.total"
      :page-size="state.pageSize"
      :page-index="state.pageIndex"
      :loading="state.loading"
      :pageindexfun="pageIndexHandle"
      :pagesizefun="pageSizeHandle"
    />
  </div>
</template>
<script>
import TableBar from '@container/basicList'
import ExactList from '@/minxs/exactList'
import tableMap from './tableMap.json'
import { mapState } from 'vuex'
export default {
  components: {
    TableBar
  },
  mixins: [ExactList],
  props: {
    state: {
      type: Object,
      default: () => {}
    },
    updateState: {
      type: Function,
      default: () => {}
    },
    dispatch: {
      type: Function,
      default: () => {}
    }
  },
  provide: {
    formItems: tableMap.formItems
  },
  data() {
    return {
      fields: tableMap.fieldsArr,
      fieldsArr: []
    }
  },
  computed: {
    ...mapState('navigator', ['query'])
  },
  watch: {},
  beforeCreate() {},
  created() {
  },
  mounted() {
    if (tableMap.immediateQuery) {
      this.dispatch('queryList')
    }
  },
  methods: {
    pageIndexHandle(val) {
      this.updateState({ pageIndex: val, loading: true })
      this.dispatch('queryList', { query: this.query })
    },
    pageSizeHandle(val) {
      this.updateState({ pageIndex: 0, size: val, loading: true })
      this.dispatch('queryList', { query: this.query })
    }
  }
}
</script>
