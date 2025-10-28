export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/RegisterPage/index',
    'pages/catalog/categorylist/index',
    'pages/catalog/category/[id]/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
