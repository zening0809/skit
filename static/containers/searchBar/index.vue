<template>
  <div>
    <search-bar
      :fields="fields"
      :fields-arr="fieldsArr"
      :search-query="query"
      :form-items="formItems"
      :search-handle="searchHandle"
      :search-reset="searchHandle"
    />
  </div>
</template>
<script>
import searchMap from './searchMap'
import SearchBar from '@container/searchBar'

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      fields: [],
      formItems: [],
      fieldsArr: [],
      query: {}
    }
  },
  watch: {},
  beforeCreate() {
    this.fields = searchMap.fields
  },
  created() {
    this.fieldsArr = searchMap.fieldsArr
    this.query = searchMap.query
    this.formItems = searchMap.formItems
  },
  methods: {
    searchHandle(query) {
      console.log(query)
    },
    searchReset() {
    }
  }
}
</script>
