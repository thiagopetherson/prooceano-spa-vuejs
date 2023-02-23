<template>
  <q-page padding>
    <div class="row justify-center">
      <p class="col-12 text-h5 text-center">Registro</p>
      <q-form class="col-xs-12 col-sm-10 col-md-4" @submit.prevent="handleRegister">        
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
import useAuthUser from 'src/composables/requests/UseAuthUser' // Importando o composable da autenticação

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

    // Retornando para o componente
    return {
      form,
      handleRegister
    }
  }
})
</script>