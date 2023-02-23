import { useQuasar } from 'quasar'

export default function useNotify () {
  const $q = useQuasar()

  const notifySuccess = (message, timeout = 5000) => {
    $q.notify({
      position: 'top-right',
      timeout: timeout,
      type: 'positive',
      message: message || 'All right !'
    })
  }

  const notifyError = (message, timeout = 5000) => {
    $q.notify({
      position: 'top-right',
      timeout: timeout,
      type: 'negative',
      message: message || 'Failed !'
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}