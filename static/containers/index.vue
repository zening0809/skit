<template>
  <div>
    <search-bar />
    <!-- 列表 -->
    <Tbale-list :state="state" />
  </div>
</template>
<script>
import SearchBar from './containers/exactSearch'
import TbaleList from './containers/exactList'
import store from './store'
import mixinStores from '@/minxs/store'
import pageList from '@/minxs/pageList'
export default {
  components: {
    SearchBar,
    TbaleList
  },
  mixins: [mixinStores, pageList],
  data() {
    return {
      storeKey: '@STORE_KEY',
      formInline: {
        user: '',
        region: ''
      },
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
  },
  created() {
    this.registStore(store)
  },
  mounted() {
    this.queryList()
  },
  methods: {
    queryList(query = {}) {
      this.dispatch('queryTest', {
        data: { page: this.listQuery.page, limit: this.listQuery.limit }
      })
    }
  }
}
</script>


