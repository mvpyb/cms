const req = require.context( '../../../icons/chahua', false, /\.svg$/ )
const requireAll = requireContext => requireContext.keys()

// console.log( 'requireAll', requireAll )

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll( req ).map( i => {
  return i.match( re )[1]
} )

export default svgIcons
