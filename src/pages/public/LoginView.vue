<template>
  <q-page padding>
    <div class="row justify-center q-mt-xl">
      <q-form class="col-xs-10 col-sm-10 col-md-4 q-mt-xl" @submit.prevent="handleLogin"> 
        <p class="col-12 text-h5 text-center q-pb-lg">Login</p>       
        <div class="q-gutter-y-md">
          <q-input type="email" label="Email" :rules="[val => (val && val.length > 0) || 'Email is required']" lazy-rules v-model="form.email" />
          <q-input type="password" label="Password" :rules="[val => (val && val.length > 0) || 'Password is required']" lazy-rules v-model="form.password" />
          <q-btn type="submit" label="Login" color="primary" class="full-width q-pa-sm" outline />
          <q-btn to="/register" label="Registre-se" color="primary" class="full-width q-pa-sm" size="sm" flat />
          <q-btn :to="{name: 'password-recovery'}" label="Esqueceu a senha ?" color="primary" class="full-width" size="sm" flat />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/requests/UseAuthUser'

export default defineComponent({
  name: 'LoginView',
  setup () {    
    const { login } = useAuthUser()

    // Propriedades 
    const form = ref({     
      email: '',
      password: ''
    })

    // Métodos
    const handleLogin = async () => {
      await login(form.value) 
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
