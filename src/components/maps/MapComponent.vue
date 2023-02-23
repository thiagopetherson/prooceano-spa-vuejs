<template>
  <div id="map-container">
    <div id="map-container-item" /> <!-- Essa é a div que terá o map -->
    <ModalChartComponent :markers="markers"/>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue'
import { useModalsStore } from 'stores/modals'
import ModalChartComponent from 'components/ModalChartComponent.vue'
import 'leaflet/dist/leaflet.css' // Importando o CSS do Leaflet
import L from 'leaflet' // Importando do Leaflet

export default defineComponent({
  name: 'MapComponent',
  components: { ModalChartComponent },
  props: {
    markers: { // Marcadores
      type: Array,
      required: false,
      default: () => [] // Por default é array vazio
    },
    latitude: {
      default: -26.8560346
    },
    longitude: {
      default: -49.239189
    },
    polyline: {
      default: false
    },
    device: {
      default: ''
    }
  },
  setup(props) {    

    const storeModals = useModalsStore()

    // Variables
    let map = null    

    // Métodos
    const createMapLayer  = () => {
           
      // Criando o mapa na div que criamos (2° param, do setView, é o zoom)
      map = L.map('map-container-item').setView([props.latitude, props.longitude], 5)
                 
      // Essa parte abaixo já é padronizado da doc
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {       
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)// nessa parte aqui está adicionando no map que criamos
           
      // Verificando se a props dos marcadores é maior que zero
      if (props.markers.length > 0)
        setMarkers() // Faz o tratamento e chama a função que adiciona os marcadores no mapa
    }

    const setMarkers = () => {      
     
      let arrayLength = props.markers.length
      let count = 1
      let coords = []

      // Percorrendo o array de marcadores e criando os pontos
      props.markers.map((marker) => { 
        let name = ""
        if (!marker.name)
          name = props.device
        else
          name = marker.name
        
        
        // Adicionando os marcadores no mapa (O bindPopup é a descrição do marcados)
        let mkr = L.marker([marker.latitude, marker.longitude]).on('click', markerOnClick).addTo(map).bindPopup(name)
        coords.push([marker.latitude, marker.longitude])

        function markerOnClick(e)
        {         
          if (!props.polyline)
            return false
          storeModals.setModalGraph(true)
        }     

        // Só deixar o último marcador aparente
        if (count < arrayLength && props.polyline === true)
          map.removeLayer(mkr)

        count++
      })
      
      // Verificando se esse mapa precisa de ligação entre os marcadores
      if (props.polyline) {
        let polyline = L.polyline(coords, {color: 'red', weight: 2, fill: false, fillOpacity: 0.1}).addTo(map);
        map.fitBounds(polyline.getBounds())
      }
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
      storeModals
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
