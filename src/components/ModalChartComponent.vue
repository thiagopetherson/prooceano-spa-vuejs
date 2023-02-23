<template>
  <div class="q-pa-md q-gutter-sm">   

    <q-dialog v-model="showModal">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Informações</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <apex-area :markers="markers" />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Fechar" v-close-popup @click="storeModals.setModalGraph(false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>  
   
  </div>
</template>

<script>

import { defineComponent, defineAsyncComponent, ref, computed } from 'vue'
import { useModalsStore } from 'stores/modals'

const ApexArea = defineAsyncComponent(() =>
  import('components/charts/ApexArea.vue')
)

export default defineComponent({
  name:"ModalChartComponent",
  components: { ApexArea },
  props: {
    markers: { // Marcadores
      type: Array,
      required: true,
      default: () => []
    }
  },
  props: ['markers'],
  setup (props) {
    const storeModals = useModalsStore()

    const showModal = computed(() => {
      return storeModals.getModalGraph
    })
    
    return {
      markers: props.markers,
      storeModals,
      showModal
    }
  }

})
</script>