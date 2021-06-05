module.exports = file => require( '@/views/' + file + '.vue' ).default
// module.exports = file => {
//   const res = require( '@/views/' + file + '.vue' )
//   console.log( 'res', res )
//   return res.default
// }

