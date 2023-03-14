<template>
  <q-page class="flex" padding>
    <div class="row justify-center items-center full-width">      
      <q-form class="col-xs-10 col-sm-10 col-md-4" @submit.prevent="handleRegister">
        <p class="col-12 text-h5 text-center q-pb-lg">Registro</p>     
        <div class="q-gutter-y-md">
          <q-input label="Name" :rules="[val => (val && val.length > 0) || 'O nome é obrigatório']" lazy-rules v-model="form.name" />
          <q-input type="email" label="Email" :rules="[val => (val && val.length > 0) || 'O email é obrigatório']" lazy-rules v-model="form.email" />
          <q-input label="Password" :rules="[val => (val && val.length > 0) || 'O password é obrigatório']" lazy-rules v-model="form.password" />
          <q-btn type="submit" label="Cadastrar" color="primary" class="full-width q-pa-sm" outline />
          <q-btn :to="{name: 'login'}" label="Voltar para login" color="primary" class="full-width" size="sm" flat />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/requests/UseAuthUser'

export default defineComponent({
  name: 'RegisterView',
  setup () {    
    const { register } = useAuthUser()

    // Propriedades 
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    // Métodos
    const handleRegister = async () => {     
      await register(form.value)     
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>