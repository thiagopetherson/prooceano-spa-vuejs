<template>
  <q-page class="flex flex-center">
      <MapComponent v-if="!loading" :markers="markers" :polyline="true" device="Atlas" />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import MapComponent from 'src/components/maps/MapComponent.vue'
import useDeviceLocationApi from 'src/composables/requests/UseDeviceLocationApi'
import { echo } from 'boot/laravel-echo'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'MapFirstDeviceView',
  components: {
    MapComponent
  },
  setup () {
    const markers = ref([])
    const loading = ref(true)
    const { getLocationByDevice } = useDeviceLocationApi()

    // Métodos
    const handleList = async () => {
      markers.value = await getLocationByDevice(1)   
      loading.value = false
    }

    // Life Cycle

    onMounted(() => {
      /*
      // Se conectando a um canal       
      echo.channel(`refreshFirstDeviceLocation`).listen('.RefreshFirstDeviceLocation', async (data) => {      
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