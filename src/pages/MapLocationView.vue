<template>
  <q-page class="flex flex-center">
      <MapComponentUniqueMarker v-if="!loading" :latitude="markers[0].latitude" :longitude="markers[0].longitude" :markers="markers" />    
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import MapComponentUniqueMarker from 'src/components/maps/MapComponentUniqueMarker.vue'

export default defineComponent({
  name: 'MapLocationView',
  components: {
    MapComponentUniqueMarker
  },
  setup () {
    const route = useRoute()
    const markers = ref([])
    const loading = ref(true)

    // Propriedades Computadas
    const latitude = computed(() => route.query.latitude)
    const longitude = computed(() => route.query.longitude)
    const name = computed(() => route.query.name)


    // Métodos
    const handleList = async () => {     
      if( latitude && longitude && name ) {       
        markers.value  = [{
          latitude: latitude,
          longitude: longitude,
          name: name,
        }]           
      }
     
      loading.value = false
    }

    onMounted(() => {
      handleList() 
    })

    return {
      markers,
      loading
    }
  }  
})
</script>