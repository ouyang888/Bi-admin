export const Sdata  = [
  {
    path: '/s', 
    name: 's',
    component: () => import(/* webpackChunkName: "s" */ '../views/s.vue'),
    meta:{
      title: 'BI智慧数据大屏'
    }
  },
  {
    path: '/productCoAll',  //产司汇总页面
    name: 'productCoAll',
    component: () => import(/* webpackChunkName: "productCoAll" */ '../views/s.vue'),
    meta:{
      title: '产司汇总'
    }
  },
  {
    path: '/saleDir',  //销向汇总页面
    name: 'saleDir',
    component: () => import(/* webpackChunkName: "saleDir" */ '../views/s.vue'),
    meta:{
      title: '销向汇总'
    }
  },
  {
    path: '/productCo',  //品类汇总页面
    name: 'productCo',
    component: () => import(/* webpackChunkName: "productCo" */ '../views/s.vue')
  },
  {
    path: '/domestic',  //内销汇总页面
    name: 'domestic',
    component: () => import(/* webpackChunkName: "domestic" */ '../views/s.vue')
  },
  {
    path: '/exprot',  //外销汇总页面
    name: 'exprot',
    component: () => import(/* webpackChunkName: "exprot" */ '../views/s.vue')
  },
  {
    path: '/domesticOnLine',  //内销-线上汇总页
    name: 'domesticOnLine',
    component: () => import(/* webpackChunkName: "domesticOnLine" */ '../views/s.vue')
  },
  {
    path: '/domesticOffLine',  //内销-线下汇总页
    name: 'domesticOffLine',
    component: () => import(/* webpackChunkName: "domesticOffLine" */ '../views/s.vue')
  },
  {
    path: '/domesticProductCoOnline',  //内销-线上总产司页
    name: 'domesticProductCoOnline',
    component: () => import(/* webpackChunkName: "domesticProductCoOnline" */ '../views/s.vue')
  },
  {
    path: '/domesticProductCoOffline',  //内销-线下总产司页
    name: 'domesticProductCoOffline',
    component: () => import(/* webpackChunkName: "domesticProductCoOffline" */ '../views/s.vue')
  },
  {
    path: '/exprotAreaAll',  //外销-区域汇总页
    name: 'exprotAreaAll',
    component: () => import(/* webpackChunkName: "exprotAreaAll" */ '../views/s.vue')
  },
  {
    path: '/exprotProductCo',  //外销-产司页
    name: 'exprotProductCo',
    component: () => import(/* webpackChunkName: "exprotProductCo" */ '../views/s.vue')
  },
  {
    path: '/domesticOnLinePlatform',  //内销-线上-平台汇总页（按平台类型）
    name: 'domesticOnLinePlatform',
    component: () => import(/* webpackChunkName: "domesticOnLinePlatform" */ '../views/s.vue')
  },
  {
    path: '/domesticOffLinePlace',  //内销-线下-渠道汇总页（按渠道类型）
    name: 'domesticOffLinePlace',
    component: () => import(/* webpackChunkName: "domesticOffLinePlace" */ '../views/s.vue')
  },
  {
    path: '/domesticOnLinePlatformCo',  //内销-线上-平台负责人产司页
    name: 'domesticOnLinePlatformCo',
    component: () => import(/* webpackChunkName: "domesticOnLinePlatformCo" */ '../views/s.vue')
  },
  {
    path: '/domesticOffLinePlaceCo',  //内销-线下-渠道负责人产司页
    name: 'domesticOffLinePlaceCo',
    component: () => import(/* webpackChunkName: "domesticOffLinePlaceCo" */ '../views/s.vue')
  },
  {
    path: '/exprotArea',  //外销-区域页
    name: 'exprotArea',
    component: () => import(/* webpackChunkName: "exprotArea" */ '../views/s.vue')
  },
  {
    path: '/exprotAreaProductCo',  //外销-产司页
    name: 'exprotAreaProductCo',
    component: () => import(/* webpackChunkName: "exprotAreaProductCo" */ '../views/s.vue')
  },
  {
    path: '/domesticOnLineShop',  //内销-线上-单平台店铺负责人页
    name: 'domesticOnLineShop',
    component: () => import(/* webpackChunkName: "domesticOnLineShop" */ '../views/s.vue')
  },
  {
    path: '/domesticOffLineChannel',  //内销-线下-单渠道负责人页
    name: 'domesticOffLineChannel',
    component: () => import(/* webpackChunkName: "domesticOffLineChannel" */ '../views/s.vue')
  },
  {
    path: '/domesticOnLineSales',  //内销-线上-业务员页
    name: 'domesticOnLineSales',
    component: () => import(/* webpackChunkName: "domesticOnLineSales" */ '../views/s.vue')
  },
  {
    path: '/domesticOffLineSales',  //内销-线下-业务员页
    name: 'domesticOffLineSales',
    component: () => import(/* webpackChunkName: "domesticOffLineSales" */ '../views/s.vue')
  },
  {
    path: '/exprotSales',  //外销-业务员页
    name: 'exprotSales',
    component: () => import(/* webpackChunkName: "exprotSales" */ '../views/s.vue')
  },
  {
    path: '/domesticOnLineShopCo',  //内销-线上-单平台单店铺负责人产司页
    name: 'domesticOnLineShopCo',
    component: () => import(/* webpackChunkName: "exprotSales" */ '../views/s.vue')
  },
  {
    path: '/exprotSalesProductCo',  // 外销-业务员-产司页
    name: 'exprotSalesProductCo',
    component: () => import(/* webpackChunkName: "exprotSales" */ '../views/s.vue')
  },
]