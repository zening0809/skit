<template>
    <div id="app">
        <router-view v-if="$route.meta.isGlobal"/>
        <layout v-else/>
    </div>
</template>

<script>
import Layout from '@/modules/layout'
import '@/styles/index.scss'
export default {
    name: 'App',
    components: {
        Layout
    }
}
</script>


