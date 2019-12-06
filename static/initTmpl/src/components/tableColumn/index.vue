<script>
export default {
    props: {
        index: Number,
        row: {
            type: Object,
            default () {
                return {}
            }
        },
        col: {
            type: Object,
            default () {
                return {}
            }
        },
        field: {
            type: Object,
            default () {
                return {}
            }
        },
        render: {
            type: Function,
            default: () => {}
        }
    },
    render (h) {
        return this.render(h, {
            index: this.index,
            row: this.row,
            col: this.col
        })
    }
}
</script>
