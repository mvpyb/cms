import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message( {
    message : '复制成功',
    type : 'success',
    duration : 1500
  } )
}

function clipboardError() {
  Vue.prototype.$message( {
    message : '复制失败',
    type : 'error'
  } )
}

export default function handleClipboard( text, event ) {
  // console.log( 'handleClipboard', text, event )
  const clipboard = new Clipboard( event.target, {
  // const clipboard = new Clipboard( event, {
    text : () => text
  } )
  clipboard.on( 'success', () => {
    clipboardSuccess()
    clipboard.destroy()
  } )
  clipboard.on( 'error', () => {
    clipboardError()
    clipboard.destroy()
  } )
  clipboard.onClick( event )
}
