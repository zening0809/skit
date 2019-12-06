import ROUTES from './routes'

const REG_EXP = {
    // 检测邮箱
    EMAIL: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    // 检测11位手机号
    MOBILE: /^1\d{10}$/,
    // 检测浮点数
    FLOAT: /^\d+(\.\d+)?$/,
    // 检测整数
    NUMBER: /^\d+$/,
    // 检测中文
    CHINESE: /^[\u4e00-\u9fa5]+$/
}

export {
    ROUTES,
    REG_EXP
}
