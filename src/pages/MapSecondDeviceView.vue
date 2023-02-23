<template>
  <q-page class="flex flex-center">
      <MapComponent v-if="!loading" :markers="markers" :polyline="true" device="Baleia" />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import MapComponent from 'src/components/maps/MapComponent.vue'
import useDeviceLocationApi from 'src/composables/requests/UseDeviceLocationApi'
// import { echo } from 'boot/laravel-echo'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'MapSecondDeviceView',
  components: {
    MapComponent
  },
  setup () {
    const markers = ref([])
    const loading = ref(true)
    const { getLocationByDevice } = useDeviceLocationApi()

    // Métodos
    const handleList = async () => {
      markers.value = await getLocationByDevice(2)     
      loading.value = false
    }

    onMounted(() => {
      /* Aqui o websockets rodaria
      // Se conectando a um canal       
      echo.channel(`refreshSecondDeviceLocation`).listen('.RefreshSecondDeviceLocation', async (data) => { // primeiro param canal, segundo evento
        console.log('evento funcionou')
        loading.value = true
        handleList()
      })
      */

      handleList() 
    })

    return {
      markers,
      loading
    }
  }  
})
</script>