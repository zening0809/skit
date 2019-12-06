import BasicSearch from '@/components/basicSearch'

/**
 * 列表页查询表单公共方法混入
 */
export default {
    components: {
        BasicSearch
    },
    props: {
        // 是否立即查询
        immediate: true,
        // 查询模块编码
        searchCode: String,
        updateState: Function,
        queryList: Function,
        searchHeightChange: Function
    },
    data () {
        return {
            // 查询数据模型
            query: this.getDefaultQuery(),
            //表单标签长度
            formLabelWidth: 80,
            // 场景集合
            scenes: [],
            // 场景数据模型
            scene: {
                query: this.getDefaultQuery(),
                id: undefined,
                name: undefined,
                default: 0
            }
        }
    },
    mounted () {
        if (this.immediate) {
            this.handleSearch()
        }
        // 查询场景列表
        this.queryScenes()
    },
    render () {
        return (
            <basic-search
                scenes={this.scenes}
                search-render={this.searchRender}
                scene-render={this.sceneRender}
                handle-search={this.handleSearch}
                handle-reset={this.handleReset}
                handle-del-scene={this.handleDelScene}
                handle-save-scene={this.handleSaveScene}
                handle-apply-scene={this.handleApplyScene}
                handle-default-scene={this.handleDefaultScene}
                onSearchHeightChange={this.searchHeightChange}
                onSceneChange={this.sceneChange}/>
        )
    },
    methods: {
        getFieldKeys (fields) {
            fields = fields || this.fields || []
            const keys = []
            for (let i = 0, len = fields.length; i < len; i++) {
                if (_.isObject(fields[i])) {
                    keys[i] = fields[i].key
                } else {
                    keys[i] = fields[i]
                }
            }
            return keys
        },
        getDefaultQuery () {
            const fields = this.fields
            const query = {}
            for (let i = 0; i < fields.length; i++) {
                if (_.isObject(fields[i])) {
                    query[fields[i].key] = fields[i].default
                } else {
                    query[fields[i]] = undefined
                }
            }
            return query
        },
        getDefaultSceneTpl () {
            return (
                <div class="default-block">
                    <el-form-item label="场景名称" prop="name" rules={[{required: true, message: '请输入场景名称', trigger: 'blur'}]}>
                        <el-input v-model={this.scene.name}/>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model={this.scene.isDefault} true-label={0} false-label={1}>设为默认</el-checkbox>
                    </el-form-item>
                </div>
            )
        },
        toEnd () {
            const query = _.cloneDeep(this.query)
            jt.object.removeEmptyAttr(query)
            return query
        },
        handleReset () {
            this.query = this.getDefaultQuery()
            this.handleSearch()
        },
        handleSearch () {
            const query = this.toEnd()
            this.updateState({ query, pageIndex: 0 })
            this.queryList()
        },
        // 获取字段渲染集合
        getFormItems (tpls) {
            const keys = this.getFieldKeys()
            const items = []
            for (let i = 0, len = keys.length; i < len; i++) {
                if (tpls[keys[i]]) {
                    items.push(tpls[keys[i]])
                }
            }
            return items
        },
        // 查询表单渲染器
        searchRender () {
            const tpls = this.getFieldTpls(this.query)
            return (
                <el-form size="small" label-width={this.formLabelWidth + 'px'}>
                    {this.getFormItems(tpls)}
                </el-form>
            )
        },
        // 场景表单渲染器
        sceneRender () {
            const scene = this.scene
            const tpls = this.getFieldTpls(scene.query)
            return (
                <el-form ref="sceneForm" size="small" label-width={this.formLabelWidth + 'px'} attrs={{model: scene}}>
                    <div class="query-block">
                        {this.getFormItems(tpls)}
                    </div>
                    {this.getDefaultSceneTpl()}
                </el-form>
            )
        },
        // 监听场景改变
        sceneChange (scene) {
            if (typeof scene === 'string') {
                scene = JSON.parse(scene)
            }
            this.scene = {
                query: {
                    ...this.getDefaultQuery(),
                    ...scene.query
                },
                id: scene.id,
                name: scene.name,
                isDefault: scene.isDefault
            }
        },
        // 删除场景
        handleDelScene (scene) {
            const scenes = this.scenes
            api.component.delCustomSearch({ data: scene.id }).then(({ code, msg, data }) => {
                if (code === 200) {
                    for (let i = 0, len = scenes.length; i < len; i++) {
                        if (scenes[i].id === scene.id) {
                            scenes.splice(i, 1)
                            break
                        }
                    }
                }
            })
        },
        // 保存场景
        handleSaveScene (action, cb) {
            this.$refs.sceneForm.validate(valid => {
                if (!valid) {
                    return
                }
                const scenes = this.scenes
                if (action === 'add') {
                    api.component.addCustomSearch({
                        data: {
                            ..._.pick(this.scene, ['name', 'isDefault']),
                            tableCode: this.searchCode,
                            content: JSON.stringify(this.scene.query)
                        }
                    }).then(({ code, msg, data }) => {
                        if (code === 200) {
                            cb && cb()
                            scenes.push({
                                ..._.pick(data, ['id', 'name', 'isDefault']),
                                query: JSON.parse(data.content)
                            })
                        } else {
                            this.$message.error(msg)
                        }
                    })
                } else {
                    api.component.updateCustomSearch({
                        data: {
                            ..._.pick(this.scene, ['id', 'name', 'isDefault']),
                            tableCode: this.searchCode,
                            content: JSON.stringify(this.scene.query)
                        }
                    }).then(({ code, msg, data }) => {
                        if (code === 200) {
                            cb && cb()
                            for (let i = 0, len = scenes.length; i < len; i++) {
                                if (scenes[i].id === this.scene.id) {
                                    scenes.splice(i, 1, {
                                        ..._.pick(this.scene, ['id', 'name', 'isDefault']),
                                        query: this.scene.query
                                    })
                                    break
                                }
                            }
                        } else {
                            this.$message.error(msg)
                        }
                    })
                }
            })
        },
        // 使用场景查询
        handleApplyScene (scene) {
            this.query = { ...scene.query }
            this.handleSearch()
        },
        // 设置默认场景
        handleDefaultScene (scene) {
            const scenes = this.scenes
            api.component.updateCustomSearch({
                data: {
                    ..._.pick(scene, ['id', 'name']),
                    isDefault: 0,
                    tableCode: this.searchCode,
                    content: JSON.stringify(scene.query)
                }
            }).then(({ code, msg }) => {
                if (code === 200) {
                    for (let i = 0, len = scenes.length; i < len; i++) {
                        if (scenes[i].id === scene.id) {
                            scenes.splice(i, 1, {
                                ...scene,
                                isDefault: 0
                            })
                            break
                        }
                    }
                } else {
                    this.$message.error(msg)
                }
            })
        },
        // 场景列表查询
        queryScenes () {
            api.component.queryCustomSearchList({ data: this.searchCode }).then(({ code, msg, data }) => {
                if (code === 200 && data.length) {
                    const scenes = []
                    data.forEach(item => {
                        scenes.push({
                            ..._.pick(item, ['id', 'name', 'isDefault']),
                            query: item.content ? JSON.parse(item.content) : this.getDefaultQuery()
                        })
                    })
                    this.scenes = scenes
                } else if (code !== 200) {
                    this.$message.error(msg)
                }
            })
        }
    }
}

