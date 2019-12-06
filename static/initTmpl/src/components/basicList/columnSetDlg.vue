<script>
import FieldSetDlg from './mixins/fieldSetDlg'

export default {
    mixins: [FieldSetDlg],
    data () {
        return {
            dlgTitle: '显示字段设置',
            xfeTitles: ['不显示字段', '显示字段']
        }
    }
}
</script>
