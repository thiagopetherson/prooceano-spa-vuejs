<template>
  <q-page class="column flex-center">
    <h6 class="title">Desenvolvido com carinho, esforço e utilizando:</h6>
    <img
      v-if="quasar.platform.is.desktop" 
      alt="Prooceano Logo"
      src="~assets/vue-laravel.png"
      style="width: 600px; height: 325px"
    >
    <img
      v-else
      alt="Prooceano Logo"
      src="~assets/vue-laravel.png"
      style="width: 300px; height: 162.5px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'IndexPage',
  setup () {
    const quasar = useQuasar()

    return {
      quasar
    }
  }
})
</script>

<style scoped>
.title {
  text-align: center;
  color: #696969;
}
</style>
