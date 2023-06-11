import MyPage from './components/MyPage.vue';
import NewsList from './components/NewsList.vue';
import LoginPage from './components/LoginPage.vue';
import JoinPage from './components/JoinPage.vue';
import NewsPage from  './components/NewsPage.vue';
import CollectionPage from  './components/CollectionPage.vue';
import NewsListPQ from './components/NewsListPQ.vue';
import NewsListIT from './components/NewsListIT.vue';
import NewsListHA from './components/NewsListHA.vue';
import NewsListFA from './components/NewsListFA.vue';
import NewsListD from './components/NewsListD.vue';
import NewsListMM from './components/NewsListMM.vue';
import NewsListBookmark from './components/NewsListBookmark.vue';
import NewsListScrap from './components/NewsListScrap.vue';
import NewsListRecent from './components/NewsListRecent.vue';

import { createRouter, createWebHistory } from 'vue-router';
import authService from './authService';

const requireAuth = (to, from, next) => {
  if (authService.isAuthenticated()) {
    next();
  } else {
    next('/login');
    alert('해당 페이지에 접근 권한이 없습니다. 로그인창으로 넘어갑니다');
  }
};

const routes = [
  { path: '/', redirect: '/newslist' },
  {
    path: '/mypage',
    component: MyPage,
    beforeEnter: requireAuth
  },
  {
    path: '/newslistbookmark',
    component: NewsListBookmark,
    beforeEnter: requireAuth
  },
  {
    path: '/collection',
    component: CollectionPage,
    beforeEnter: requireAuth,
    children: [
      {
        path: '/collection/newslistbookmark',
        component: NewsListBookmark,
        beforeEnter: requireAuth
      },
      {
        path: '/collection/newslistrecent',
        component: NewsListRecent
      },
      {
        path: '/collection/newslistscrap',
        component: NewsListScrap
      }
    ]
  },
  
  {
    path: '/newslist',
    component: NewsList,
    props: true
  },
  {
    path: '/newslistMM',
    component: NewsListMM
  },
  {
    path: '/newslistFA',
    component: NewsListFA
  },
  {
    path: '/newslistPQ',
    component: NewsListPQ
  },
  {
    path: '/newslistIT',
    component: NewsListIT
  },
  {
    path: '/newslistHA',
    component: NewsListHA
  },
  {
    path: '/newslistD',
    component: NewsListD
  },
  {
    path: '/newslistrecent',
    component: NewsListRecent
  },
  {
    path: '/newslistscrap',
    component: NewsListScrap
  },
  {
    path: '/newspage/:newsId',
    component: NewsPage,
    props: true
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/join',
    component: JoinPage
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authService.isAuthenticated()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;