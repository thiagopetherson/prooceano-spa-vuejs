<template>
  <q-page padding>
    <div class="row">
      <q-table title="Localidades" :rows="locations" :columns="columnsLocation" row-key="id" class="col-12" :loading="loading">
        <template v-slot:top>
          <q-btn label="Novo" icon="add" color="primary" :to="{ name: 'form-location' }" />
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn color="info" icon="mdi-map-marker-outline" size="md" dense @click="handleViewMarker(props.row)" />            
            <q-btn color="green" icon="mdi-pencil-outline" size="md" dense @click="handleViewEdit(props.row)" />
            <q-btn color="negative" icon="mdi-delete-outline" size="md" dense @click="handleDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { useRouter } from 'vue-router'
import useLocationApi from 'src/composables/requests/UseLocationApi' // Importando o composable da requisição para as localizações
import { columnsLocation } from './locationsTableHeader'

export default defineComponent({
  name: 'LocationsView',
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const locations = ref([])
    const { index, destroy } = useLocationApi()
 
    // Métodos
    const handleList = async () => {
      showLoading()
      locations.value = await index() 
      hideLoading() 
    }    

    const handleViewEdit = async (location) => {
      router.push({ name: 'form-location', params: { id: location.id } })
    }

    const handleDelete = (location) => {

      $q.dialog({ title: "Confirma", message: 'Você confirma essa ação ?', cancel: true, persistent: true})
      .onOk(async () => {
        let response = await destroy(location.id)  
        if (response) handleList() 
      })
            
    }
 
    const handleViewMarker = (location) => {
      router.push({ name: 'map-location', query: { latitude: location.latitude, longitude: location.longitude, name: location.name } })
    }

    const showLoading = () => {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        message: 'Seus dados estão sendo carregados...',
        spinnerColor: 'white',
        spinnerSize: 140,
        backgroundColor: 'primary',
        messageColor: 'white'
      })
    }

    const hideLoading = () => {
      $q.loading.hide()    
    }
    
    // Life Cycle
    onMounted(() => {
      handleList() 
    })
   
    return {
      columnsLocation,
      locations,
      handleViewEdit,
      handleDelete,
      handleViewMarker,
    }
  }
})
</script>