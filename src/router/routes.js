
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'login-default', component: () => import('src/pages/public/LoginView.vue') },
      { path: 'login', name: 'login', component: () => import('src/pages/public/LoginView.vue') },
      { path: 'register', name: 'register', component: () => import('src/pages/public/RegisterView.vue') },
      { path: 'password-recovery', name: 'password-recovery', component: () => import('src/pages/public/PasswordRecoveryView.vue') }
    ],
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'home', component: () => import('pages/HomeView.vue') },
      { path: 'map', name: 'map', component: () => import('pages/MapView.vue') },
      { path: 'map-first-device', name: 'map-first-device', component: () => import('src/pages/MapFirstDeviceView.vue') },
      { path: 'map-second-device', name: 'map-second-device', component: () => import('src/pages/MapSecondDeviceView.vue') },   
      { path: 'map-location', name: 'map-location', component: () => import('pages/MapLocationView.vue') },
      { path: 'locations', name: 'locations', component: () => import('src/pages/locations/LocationsView.vue') },
      { path: 'form-location/:id?', name: 'form-location', component: () => import('pages/locations/LocationFormView.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
