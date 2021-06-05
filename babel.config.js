// https://www.cnblogs.com/amiezhang/p/11384309.html
module.exports = {
  presets : [
    [
      '@vue/cli-plugin-babel/preset',
      // {
      //   useBuiltIns : 'entry'
      //   // 'useBuiltIns' : 'usage',
      //   // 'corejs' : 3
      // }
    ]
  ],
  // 'plugins' : [
  //   // '@vue/babel-plugin-transform-vue-jsx',
  //   '@babel/plugin-transform-runtime'
  // ],
  'env' : {
    'development' : {
      'plugins' : ['dynamic-import-node']
    }
  }
}

// module.exports = {
// //   presets : [
// //     '@vue/cli-plugin-babel/preset'
// //     // '@babel/preset-env',
// //     // {
// //     //   'useBuiltIns' : 'usage',
// //     //   'corejs' : 3
// //     // }
// //   ],
//
//   presets : [
//     [
//       '@vue/app',
//       {
//         polyfills : [
//           'es6.array.iterator',
//           'es6.promise',
//           'es7.promise.finally',
//           'es6.symbol'
//         ]
//         // 'useBuiltIns' : 'usage',
//         // 'corejs' : 3
//       }
//     ]
//   ],
//
//   'plugins' : [
//     // '@vue/babel-plugin-transform-vue-jsx',
//     '@babel/plugin-transform-runtime'
//   ],
//   'env' : {
//     'development' : {
//       'plugins' : ['dynamic-import-node']
//     }
//   }
// }
