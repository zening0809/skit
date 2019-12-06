<script>
import FieldSetDlg from './mixins/fieldSetDlg'

export default {
    mixins: [FieldSetDlg],
    data () {
        return {
            dlgTitle: '导出字段设置',
            xfeTitles: ['不导出字段', '导出字段']
        }
    }
}
</script>
