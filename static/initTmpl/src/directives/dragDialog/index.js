import drag from './drag'

const install = function (Vue) {
    Vue.directive('drag-dialog', drag)
}

if (window.Vue) {
    window['drag-dialog'] = drag
    Vue.use(install)
}

drag.install = install

export default drag
