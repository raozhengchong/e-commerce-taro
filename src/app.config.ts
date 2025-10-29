export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/RegisterPage/index',
    'pages/catalog/categorylist/index',
    'pages/catalog/product-list/index',
    'pages/product/detail/index',
    'pages/catalog/category/[id]/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
