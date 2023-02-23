<template>
  <q-page padding>
    <div class="row justify-center">     
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
        <p class="col-12 text-h4 text-center">
          {{ isUpdate ? 'Editar Localização' : 'Criar Localização' }}
        </p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input label="Name" :rules="[val => (val && val.length > 0) || 'O nome é obrigatório']" lazy-rules v-model="form.name" />
          <q-input label="Latitude" :rules="[val => (val && val.length > 0) || 'A latitude é obrigatória']" lazy-rules v-model="form.latitude" />
          <q-input label="Longitude" :rules="[val => (val && val.length > 0) || 'A longitude é obrigatória']" lazy-rules v-model="form.longitude" />
          <q-btn type="submit" label="Salvar" :color="quasar.dark.isActive ? 'light' : 'primary'" class="full-width q-pa-sm" outline />          
        </div>
      </q-form>     
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import useLocationApi from 'src/composables/requests/UseLocationApi'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
name: 'LocationFormView',
setup () {
  const quasar = useQuasar()
  const router = useRouter()
  const route = useRoute()
  const { show, store, update } = useLocationApi()

  // Propriedades Computadas
  const isUpdate = computed(() => route.params.id)

  // Variáveis comuns
  let location = {}

  // Propriedades 
  const form = ref({
    name: '',
    latitude: '',
    longitude: ''
  })

  // Métodos
  const handleSubmit = async () => {   
   
    if (isUpdate.value)
      await update(form.value, isUpdate.value)     
    else
      await store(form.value)
 
  }

  const handleShowLocation = async (id) => {  
    location = await show(id)   
    form.value = location  
  }

  // Life Cycle
  onMounted(() => {      
    if (isUpdate.value) {
      handleShowLocation(isUpdate.value)
    }
  })

  return {
    quasar,
    form,
    handleSubmit,
    isUpdate
  }
}
})
</script>