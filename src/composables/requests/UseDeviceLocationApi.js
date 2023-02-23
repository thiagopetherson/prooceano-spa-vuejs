import { api } from 'boot/axios'
import useNotify from 'src/composables/notifications/UseNotify'
import { LocalStorage } from 'quasar'

export default function useDeviceLocationApi () {
  const { notifyError, notifySuccess } = useNotify()  
  
  let token = ''
 
  const index = async () => {
    token = LocalStorage.getItem('token')     
    let resp = ""

    await api.get('device-locations', { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {   
      resp = response.data       
    })
    .catch(error => {   
      errorMessage(error)     
    })  

    return resp
  }

  const getLocationByDevice = async (id) => {
    console.log('chamou')
    token = LocalStorage.getItem('token')     
    let resp = ""

    await api.get(`get-location-by-device/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {   
      resp = response.data       
    })
    .catch(error => {   
      errorMessage(error)     
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
    getLocationByDevice,
  }
}