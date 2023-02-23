<template>
  <q-page class="flex flex-center">
      <MapComponent v-if="!loading" :markers="markers" />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import MapComponent from 'src/components/maps/MapComponent.vue'
import useLocationApi from 'src/composables/requests/UseLocationApi'
const { index } = useLocationApi()

export default defineComponent({
  name: 'MapView',
  components: {
    MapComponent
  },
  setup () {
    const markers = ref([])
    const loading = ref(true)

    // Métodos
    const handleList = async () => {
      markers.value = await index()
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