import Vue from 'vue'

import './variables.scss'
import './index.scss'

import {
    // Basic
    Row,
    Col,
    Button,
    ButtonGroup,

    // Form
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Input,
    InputNumber,
    Autocomplete,
    Select,
    Option,
    OptionGroup,
    DatePicker,
    TimeSelect,
    TimePicker,
    Upload,
    Form,
    FormItem,
    Cascader,
    Transfer,

    // Data
    Table,
    TableColumn,
    Progress,
    Tree,
    Pagination,
    Tag,

    // Notice
    Alert,
    Loading,
    Message,
    MessageBox,

    // Navigation
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Tabs,
    TabPane,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Steps,
    Step,

    // Others
    Dialog,
    Tooltip,
    Popover,
    Scrollbar
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

const components = [
    // Base
    Row,
    Col,
    Button,
    ButtonGroup,

    // Form
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Input,
    InputNumber,
    Autocomplete,
    Select,
    Option,
    OptionGroup,
    DatePicker,
    TimeSelect,
    TimePicker,
    Upload,
    Form,
    FormItem,
    Cascader,
    Transfer,

    // Data
    Table,
    TableColumn,
    Progress,
    Tree,
    Pagination,
    Tag,

    // Notice
    Alert,

    // Navigation
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Tabs,
    TabPane,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Steps,
    Step,

    // Others
    Dialog,
    Tooltip,
    Popover,
    Scrollbar
]

// 循环注册全局组件
components.forEach(item => {
    Vue.use(item)
})
Vue.use(Loading.directive)

locale.use({
    el: {
        ...lang.el,
        pagination: {
            goto: '',
            pagesize: '',
            total: '共 {total} 条',
            pageClassifier: ''
        }
    }
})

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
