<script>
import ExactSearch from '@/mixins/exactSearch'
export default {
    mixins: [ExactSearch],
    beforeCreate () {
        this.fields = ['paramTypeCode', 'paramTypeName']
    },
    data () {
        return {
            formLabelWidth: 100
        }
    },
    methods: {
        getFieldTpls (model) {
            const tpls = {
                'paramTypeCode': <el-form-item label="字典类型编码"><el-input v-model={model.paramTypeCode}/></el-form-item>,
                'paramTypeName': <el-form-item label="字典类型名称"><el-input v-model={model.paramTypeName}/></el-form-item>
            }
            return tpls
        }
    }
}
</script>

