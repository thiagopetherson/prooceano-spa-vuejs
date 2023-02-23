import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useNotify from 'src/composables/notifications/UseNotify' // Importando o composable da notificação
import { useAuthStore } from 'stores/auth'
import { LocalStorage } from 'quasar'

export default function useAuthUser () {
  const { notifyError, notifySuccess } = useNotify()
  const router = useRouter()
  const $q = useQuasar()
  const storeAuth = useAuthStore()
  
  let token = ''
  const register = async ({ name, email, password }) => {
    
    await api.post('register', {
      name: name,
      email: email,
      password: password
    })
    .then(response => {
      notifySuccess('Usuário cadastrado com sucesso')
      router.push({ name: 'login' })
    })
    .catch(error => {   
      errorMessage(error)     
    })  

  } 

  const login = async ({ email, password }) => {

    await api.post('login', {     
      email: email,
      password: password
    })
    .then(response => {      
      notifySuccess('Usuário logado com sucesso', 3000)      
      storeAuth.setUser(response.data.user)
      storeAuth.setToken(response.data.token)
      router.push({ name: 'home' })
    })
    .catch(error => {   
      errorMessage(error)
    })

  }
  
  const logout = async () => {   
    token = LocalStorage.getItem('token')

    await api.get('logout', { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {
      storeAuth.logoutUser()
      notifySuccess('Usuário deslogado com sucesso')
      router.push({ name: 'login' })
    })
    .catch(error => {  
      console.log(error.response) 
      errorMessage(error)
    })
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

  // Método para resetar a senha
  const recoveryPassword = async (email) => {
    $q.loading.show({ message: 'Sua solicitação está em progresso...' })
    
    await api.post('reset-password', {     
      email: email
    })
    .then(response => {
      notifySuccess(`Senha redefinida com sucesso! Foi enviada uma nova senha para: ${email}`, 10000)
      router.push({ name: 'login' })
    })
    .catch(error => {   
      errorMessage(error)     
    })
    .finally(() => {
      $q.loading.hide()
    })
  }

  return {
    register,
    login,
    logout,
    recoveryPassword,
  }
}