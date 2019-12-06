
import Vue from 'vue'

import resize from 'vue-resize-directive'
import dragDialog from './dragDialog'

Vue.directive('resize', resize)

Vue.use(dragDialog)
