<template>
  <div>
    <search-bar :dispatch="dispatch" :update-state="updateState" />
    <Tbale-list :state="state" :dispatch="dispatch" />
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
  computed: {},
  created() {
    this.registStore(store)
  },
  mounted() {
  },
  methods: {
  }
}
</script>




