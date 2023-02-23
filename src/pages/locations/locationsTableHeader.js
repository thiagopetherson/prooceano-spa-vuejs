import { ref } from 'vue'

const columnsLocation = [
  { name: 'id', label: 'Id', align: 'left', field: row => row.id, sortable: true },
  { name: 'name', label: 'Nome', align: 'left', field: row => row.name, sortable: true },
  { name: 'latitude', label: 'Latitude', align: 'left', field: row => row.latitude, sortable: true },
  { name: 'longitude', label: 'Longitude', align: 'left', field: row => row.longitude, sortable: true },
  { name: 'action', label: 'Ações', align: 'center', field: 'action' , sortable: false}
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 5
})

export {
  columnsLocation,
  initialPagination
}
