<script>
import ExactSearch from '@/mixins/exactSearch'
export default {
    mixins: [ExactSearch],
    beforeCreate () {
        this.fields = ['name', 'code', 'flag']
    },
    methods: {
        getFieldTpls (model) {
            const tpls = {
                'name': <el-form-item label="分类名称"><el-input v-model={model.name}/></el-form-item>,
                'code': <el-form-item label="分类编码"><el-input v-model={model.code}/></el-form-item>,
                'flag': <el-form-item label="是否启用"><el-select v-model={model.flag} clearable><el-option value="1" label="是"></el-option><el-option value="0" label="否"></el-option></el-select></el-form-item>
            }
            return tpls
        }
    }
}
</script>
