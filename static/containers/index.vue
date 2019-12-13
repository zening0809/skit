<template>
  <div>
    <search-bar />
  </div>
</template>
<script>
import SearchBar from './containers/searchBar'
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      storeKey: '@STORE_KEY'
    }
  },
  created() {
    this.registStore(store)
  },
  mounted() {
  },
  methods: {
  }
}
</script>

