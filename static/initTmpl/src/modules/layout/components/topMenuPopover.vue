<script>
import { mapState } from 'vuex'
import { getTreeLeaf } from '@/utils/format';
export default {
    computed: {
        ...mapState('app', ['actTab', 'allMenus']),
    },
    data () {
        return {
            keyWords: '',
            arr: []
        }
    },
    render () {
        return (
            <div class="top-menu-popover">
                <el-input
                    size="medium"
                    suffix-icon="el-icon-search"
                    placeholder="搜索信息"
                    v-model={this.keyWords}
                    onInput={() => this.handleKeywords()}
                />
                {this.getMenuItem(this.allMenus)}
            </div>
        )
    },
    methods: {
        getMenuItem (menus, level = 1) {
            return (
                <ul class={['menu', `menu-level-${level}`]}>
                {
                    menus.map(item => {
                        const isLeaf = !item.children || !item.children.length
                        const icon = 'menu-icon ' + item.icon || 'el-icon-menu'
                        return (
                            <li class={[isLeaf ? 'menu-item' : 'submenu']}>
                            {
                                level==2 ? <i class={icon}></i> : undefined
                            }
                            {
                                isLeaf
                                    ? <a class={['menu-title', this.actTab === item.code ? 'active' : undefined]} onClick={() => this.goPage(item)}>
                                        {this.addColor(this.keyWords, item.moduleName)}
                                    </a>
                                    : <span class="menu-title">{item.moduleName}</span>
                            }
                            {
                                isLeaf
                                    ? undefined
                                    : this.getMenuItem(item.children, level + 1)
                            }
                            </li>
                        )
                    })
                }
                </ul>
            )
        },
        goPage (item) {
            this.$store.commit('app/actNavTab', { code: item.code })
        },
        handleKeywords () {
            this.arr=[];
            if(!this.keyWords == '' && this.keyWords.indexOf(" ") == -1){
                let restaurants=getTreeLeaf(this.allMenus,'children')
                restaurants.forEach(item=>{
                    if(item.moduleName.indexOf(this.keyWords)>=0){
                        this.arr.push(item);
                    }
                })
            }
        },
        addColor(keyWords, moduleName) {
            let index = moduleName.indexOf(keyWords);
            let len = keyWords.length;
            if(index!== -1){
                return  <span>{moduleName.slice(0,index)}<span style='color:#4D7CFE'>{keyWords}</span>{moduleName.slice(index+len)}</span>
            }else{
                return moduleName
            }
        }
    }
 }
</script>

<style lang="scss" scoped>
.top-menu-popover {
    line-height: initial;
    padding: 20px;
    font-size: 12px;
    cursor: initial;
    .el-input {
        height:36px;
        background:rgba(246,246,246,1);
        border:1px solid rgba(232,236,239,1);
        margin-bottom: 19px;
    }
    /deep/ .el-input__inner {
        font-size: 14px;
        border: none;
        border-radius: 5px;
        background-color: rgba(246,246,246,1);
    }
}

.menu-level-1 {
    max-height: 300px;
    overflow: auto;
    > .submenu > .menu-title {
        padding-left: 10px;
        border-left: 3px solid #4D7CFE;
    }
}

.menu-level-2 {
    > .submenu {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            top: 20px;
            bottom: 6px;
            left: 7px;
            border-left: 2px dotted #778CA2;
        }
        > .menu {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: 8px;
                left: 10px;
                width: 10px;
                border-top: 2px dotted #778CA2;
            }
        }
    }

    .menu-icon {
        vertical-align: middle;
        font-size: 16px;
        margin-right: 6px;
    }
    .menu-title {
        vertical-align: middle;
    }
}

.submenu {
    margin-bottom: 10px;
    > .menu-title {
        font-size: 14px;
        font-weight: bold;

        & + .menu {
            margin-top: 10px;
        }
    }

    > .menu {
        padding-left: 24px;
    }
}

.menu-item {
    display: inline-block;
    margin-right: 20px;
    > .menu-title {
        &.active,
        &:hover {
            color: $--sd-menu-active-color;
        }
    }
}

</style>
