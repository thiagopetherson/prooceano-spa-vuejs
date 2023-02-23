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
      default: () => []
    },
    latitude: {
      default: 0,
    },
    longitude: {
      default: 0,
    }
  },
  setup(props) {
    let map = null

    // Métodos
    const createMapLayer  = () => {
           
      // Criando o mapa na div que criamos (2° param, do setView, é o zoom)
      map = L.map('map-container-item').setView([props.latitude, props.longitude], 5)
                 
      // Essa parte abaixo já é padronizado da doc (o add(map) está adicionando o mapa que criamos)
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {       
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
           
      // Verificando se a props dos marcadores é maior que zero
      if (props.markers.length > 0)
        // Chama a função que adiciona os marcadores no mapa
        setMarkers() 
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