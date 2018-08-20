import Vue from 'vue';
import Router from 'vue-router';


import Home from './views/Home.vue';
import Game from './views/GameGrid.vue';
import BoardSetup from './views/BoardSetup.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/gamegrid',
          name: 'gamegrid',
          component: Game,
        },
        {
          path: '/boardsetup',
          name: 'boardsetup',
          component: BoardSetup,
        },
      ],
    },
  ],
});
