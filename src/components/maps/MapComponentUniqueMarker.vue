<template>
  <div id="map-container">
    <div id="map-container-item" /> <!-- Essa é a div que terá o map -->    
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css' // Importando o CSS do Leaflet
import L from 'leaflet' // Importando do Leaflet

export default defineComponent({
  name: 'MapComponent',
  props: {
    markers: { // Marcadores
      type: Array,
      required: false,
      default: () => [] // Por default é array vazio
    },
    latitude: {
      default: 0, //-26.8560346
    },
    longitude: {
      default: 0, //-49.239189
    }
  },
  setup(props) {
    let map = null

    // Métodos
    const createMapLayer  = () => {
           
      // Criando o mapa na div que criamos
      map = L.map('map-container-item').setView([props.latitude, props.longitude], 5) // 1º parâmetro é a latitude e longitude. 2º param é o zoom do mapa
                 
      // Essa parte abaixo já é padronizado da doc
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {       
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)// nessa parte aqui está adicionando no map que criamos
           
      // Verificando se a props dos marcadores é maior que zero
      if (props.markers.length > 0)
        setMarkers() // Faz o tratamento e chama a função que adiciona os marcadores no mapa
    }

    const setMarkers = () => { 

       // Percorrendo o array de marcadores e criando os pontos
      props.markers.map((marker) => { 
        // Adicionando os marcadores no mapa (O bindPopup é a descrição do marcados)
        let mkr = L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(marker.name)
      })      
      
    }

    onMounted(() => {
      // Chamando a função na montagem do componente
      createMapLayer()
    })

    onBeforeMount(() => {
      // Eliminando o map antes do componente ser montado
      if (map)
        map.remove()
    })

    return {
      markers: props.markers,
    }
  },
})
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 100%;
}

#map-container-item {
  width: 100vw;
  height: calc(100vh - 50px); /* esse cálculo é para tirar os 50px do toolbar da aplicação */
}

</style>