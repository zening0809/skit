export default {
    bind (el, binding, vnode) {
        const dlgHdEl = el.querySelector('.el-dialog__header')
        const dragEl = el.querySelector('.el-dialog')
        dlgHdEl.style.cssText += ';cursor:move;'
        // dragEl.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle
        const getStyle = (function () {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr]
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr]
            }
        })()

        dlgHdEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dlgHdEl.offsetLeft
            const disY = e.clientY - dlgHdEl.offsetTop

            const dragElWidth = dragEl.offsetWidth
            const dragElHeight = dragEl.offsetHeight

            const screenWidth = document.body.clientWidth
            const screenHeight = document.body.clientHeight

            const minDragElLeft = dragEl.offsetLeft
            const maxDragElLeft = screenWidth - dragEl.offsetLeft - dragElWidth

            const minDragElTop = dragEl.offsetTop
            const maxDragElTop = screenHeight - dragEl.offsetTop - dragElHeight
            let styL = getStyle(dragEl, 'left')
            let styT = getStyle(dragEl, 'top')
            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
            } else {
                styL = +styL.replace(/\px/g, '')
                styT = +styT.replace(/\px/g, '')
            }

            document.onmousemove = function (e) {
                let left = e.clientX - disX
                let top = e.clientY - disY

                // 边界处理
                if (-(left) > minDragElLeft) {
                    left = -minDragElLeft
                } else if (left > maxDragElLeft) {
                    left = maxDragElLeft
                }

                if (-(top) > minDragElTop) {
                    top = -minDragElTop
                } else if (top > maxDragElTop) {
                    top = maxDragElTop
                }

                dragEl.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

                vnode.child.$emit('dragDialog')
            }

            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
