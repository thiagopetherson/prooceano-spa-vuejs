<template>  
  <apexchart height="300" type="area" :options="options" :series="series"></apexchart>  
</template>

<script>
import { defineComponent, reactive, onBeforeMount } from 'vue'
import { formatDate } from 'src/utils/format'
import { getCssVar } from 'quasar'

export default defineComponent({
  name: 'ApexArea',
  props: ['markers'],
  setup (props) {
    
    // Variable
    const options = {
      title: {
        text: !props.markers[0].temperature ? 'Salinidade (‰)' : 'Temperatura (°)',
        align: 'left'
      },
      chart: {
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
        },
        height: 300,
        type: 'area'
      },
      colors: [getCssVar('primary'), getCssVar('secondary'), getCssVar('negative')],
      markers: {
        size: 4,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: []
      }
    }

    // Props
    const series = reactive([{
      name: !props.markers[0].temperature ? 'Salinidade' : 'Temperatura',
      data: []
    }])

    // Métodos
    const buildChart = () => {
      props.markers.map(organizeData)
    }

    const organizeData = (item) => {      
      if (item.temperature) 
        series[0].data.push(`${item.temperature}`)
      else
        series[0].data.push(`${item.salinity}`)

      options.xaxis.categories.push(`${formatDate(item.created_at)}`)
    }

    // Life Cycle
    onBeforeMount(() => {
      buildChart()
    })

    return {      
      series,
      options
    }
  }
})
</script>