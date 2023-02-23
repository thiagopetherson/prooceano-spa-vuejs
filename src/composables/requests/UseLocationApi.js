import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/notifications/UseNotify' // Importando o composable da notificação
import { LocalStorage } from 'quasar'

export default function useLocationApi () {
  const { notifyError, notifySuccess } = useNotify()
  const router = useRouter()
  
  let token = ''
 
  // Métodos
  const index = async () => {
    token = LocalStorage.getItem('token')     
    let resp = ""    

    await api.get('locations', { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {   
      resp = response.data       
    })
    .catch(error => {   
      errorMessage(error)     
    })

    return resp
  }

  const show = async (id) => {
    token = LocalStorage.getItem('token')     
    let resp = ""

    await api.get(`locations/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {   
      resp = response.data
    })
    .catch(error => {   
      errorMessage(error)
      router.push({ name: 'locations'})  
    })  
     
    return resp
  }

  const store = async ({ name, latitude, longitude }) => {
    token = LocalStorage.getItem('token')
    
    let formData = new FormData()
    formData.append("name", name.trim())           
    formData.append("latitude", latitude.trim())
    formData.append("longitude", longitude.trim())    

    await api.post('locations', formData, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {
      notifySuccess('Localização cadastrada com sucesso')
      router.push({ name: 'locations'})     
    })
    .catch(error => {   
      errorMessage(error)     
    })  

  }

  const update = async ({ name, latitude, longitude }, id) => {
    token = LocalStorage.getItem('token')

    let formData = new FormData()
    formData.append("name", name.trim())           
    formData.append("latitude", latitude.trim())
    formData.append("longitude", longitude.trim())    

    await api.put(`locations/${id}`, 
      { name: name.trim(), latitude: latitude.trim(), longitude: longitude.trim() }, 
      { headers: {"Authorization" : `Bearer ${token}`} }
    )
    .then(response => {
      notifySuccess('Localização atualizada com sucesso')
      router.push({ name: 'locations'})       
    })
    .catch(error => {   
      errorMessage(error)     
    })  

  }

  const destroy = async (id) => {
    token = LocalStorage.getItem('token')     
    let resp
    await api.delete(`locations/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {   
      notifySuccess('Localização deletada com sucesso')
      resp = true
    })
    .catch(error => {
      errorMessage(error)
      resp = false  
    })

    return resp
  }

  const errorMessage = (error) => {
     if (error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach(key => {              
          notifyError(error.response.data.errors[key][0]) 
        });
      }

      if (error.response.data.erro)
        notifyError(error.response.data.erro)
  }  

  return {
    index,
    show,
    store,
    update,
    destroy
  }
}