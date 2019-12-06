<template>
    <basic-dialog
        :visible="visible"
        :title="title"
        :width="720"
        :update-vis="updateVis"
        :handle-close="handleClose"
        :handle-closed="handleClosed"
        :handle-ok="handleOk">
        <el-form
            ref="form"
            size="small"
            label-position="right"
            label-width="128px"
            :model="dto"
            :rules="rules"
            @submit.native.prevent>
            <div class="entity-dlg__block">
                <div class="entity-dlg__block-bd">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="销售平台名称" prop="name">
                                <el-input v-model="dto.name"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="销售平台主站域名" prop="website">
                                <el-input v-model="dto.website"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-form>
    </basic-dialog>
</template>

<script>
import EntityDialog from '@/mixins/entityDialog'
export default {
    mixins: [EntityDialog],
    data () {
        return {
            rules: {

            }
        }
    },
    beforeCreate () {
        this.allFields = ['name', 'desc']
        this.disFields = []
    }
}
</script>

