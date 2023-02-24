<template>
  <q-layout :view="!quasar.platform.is.desktop ? 'Lhh Lpr lFr' : 'lHr Lpr lFr'">
    <q-header elevated>
      <q-toolbar :class="quasar.dark.isActive ? `bg-dark` : `bg-primary`">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Prooceano App
        </q-toolbar-title>

        <!--<DarkModeToggleComponent />-->
        <div v-if="quasar.platform.is.desktop">
          <q-btn flat icon="person" disable>
            {{ storeAuth.getUser.name.slice(0, storeAuth.getUser.name.indexOf(' ')) }}
          </q-btn>
        </div>

        <div>          
          <router-link to="/home">
            <q-btn icon="home">
              Home
            </q-btn>
          </router-link>
        </div>        

        <div>
          <q-btn icon="logout" @click="handleLogout">
            Sair
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
          class="text-h6 text-bold"
          color="primary"
        >
          Essencial Menu
        </q-item-label>

        <EssentialLinkComponent
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
import useAuthUser from 'src/composables/requests/UseAuthUser'
import DarkModeToggleComponent from 'src/components/DarkModeToggleComponent.vue'
import { defineComponent, ref } from 'vue'
import EssentialLinkComponent from 'src/components/EssentialLinkComponent.vue'

const linksList = [
  {
    title: 'Favoritos',
    caption: 'Marcações dos Usuários',
    icon: 'map',
    routeName: 'map'
  },
  {
    title: 'Dispositivo Atlas',
    caption: 'Equipamento Medidor de Temperatura',
    icon: 'wifi',
    routeName: 'map-first-device'
  },
  {
    title: 'Dispositivo Baleia',
    caption: 'Equipamento Medidor de Salinidade',
    icon: 'wifi',
    routeName: 'map-second-device'
  },  
  {
    title: 'Localidades',
    caption: 'Cadastro e Listagem de Localizações',
    icon: 'location_on',
    routeName: 'locations'
  },   
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLinkComponent,
    DarkModeToggleComponent
  },

  setup () {
    const quasar = useQuasar()
    const storeAuth = useAuthStore()
    const { logout } = useAuthUser()

    const leftDrawerOpen = ref(false)

    const handleLogout = async () => {
      quasar.dialog({title: 'Logout', message: 'Tem certeza que deseja sair ?', cancel: true, persistent: true})
      .onOk(async () => {
        await logout()        
      })
    }

    return {
      quasar,
      storeAuth,
      handleLogout,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style scoped>
.q-toolbar a {
  text-decoration: none;
  color: #fff;
}
</style>
