<template>
  <q-page class="flex" padding>
    <div class="row justify-center items-center full-width">
      <q-form class="col-xs-10 col-sm-10 col-md-4" @submit.prevent="handleRecoveryPassword">
        <p class="col-12 text-h5 text-center q-pb-lg">Recuperação de Senha</p>
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <q-input type="email" label="Email" v-model="email" :rules="[val => (val && val.length > 0) || 'O email é obrigatório']" lazy-rules />
          <q-btn type="submit" label="Resetar a Senha" color="primary" class="full-width q-pa-sm" outline />
          <q-btn :to="{name: 'login'}" label="Voltar para login" color="primary" class="full-width" size="sm" flat/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/requests/UseAuthUser'
import useNotify from 'src/composables/notifications/UseNotify'

export default defineComponent({
  name: 'PasswordRecoveryView',
  setup () {
    const { recoveryPassword } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const email = ref('')

    const handleRecoveryPassword = async () => {
      await recoveryPassword(email.value)             
    }

    return {
      email,
      handleRecoveryPassword
    }
  }
})
</script>