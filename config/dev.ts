import type { UserConfigExport } from "@tarojs/cli"

console.log('zzz')

export default {
   logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport<'webpack5'>
