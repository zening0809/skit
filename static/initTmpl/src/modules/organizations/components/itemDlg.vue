<template>
    <basic-dialog
        :visible="visible"
        :title="title"
        :width="666"
        :update-vis="updateVis"
        :handle-close="handleClose"
        :handle-closed="handleClosed"
        :handle-ok="handleOk">
        <el-form
            ref="form"
            size="small"
            label-position="right"
            label-width="108px"
            :model="dto"
            :rules="rules"
            @submit.native.prevent>
            <div class="entity-dlg__block">
                <div class="entity-dlg__block-bd">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="字典类型编码" prop="paramTypeCode">
                                <el-input v-model="dto.paramTypeCode" :disabled="true"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="字典类型名称" prop="paramTypeName">
                                <el-input v-model="dto.paramTypeName" :disabled="true"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="字典值编码" prop="paramCode">
                                <el-input v-model="dto.paramCode"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="字典值名称" prop="paramName">
                                <el-input v-model="dto.paramName"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="字典值" prop="paramValue">
                                <el-input v-model="dto.paramValue"/>
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
        this.allFields = ['id', 'paramTypeCode', 'paramTypeName', 'paramCode', 'paramName', 'paramValue', { key: 'dataType', default: 2 }]
        this.disFields = []
    }
}
</script>
