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
                                <el-input v-model="dto.paramTypeCode"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="字典类型名称" prop="paramTypeName">
                                <el-input v-model="dto.paramTypeName"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="归属" prop="paramLevel">
                                <el-select clearable v-model="dto.paramLevel">
                                    <el-option v-for="item of levels" :key="item.code" :label="item.value" :value="item.code"/>
                                </el-select>
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
    props: {
        levels: Array
    },
    data () {
        return {
            rules: {

            }
        }
    },
    beforeCreate () {
        this.allFields = ['id', 'paramTypeCode', 'paramTypeName', 'paramLevel', { key: 'dataType', default: 1 }]
        this.disFields = []
    }
}
</script>

