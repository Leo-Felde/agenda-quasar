import { Notify } from 'quasar'

export const showSuccess = (message, options = {}) => {
  showNotification(message, 'positive', options)
}

export const showError = (message, options = {}) => {
  showNotification(message, 'negative', options)
}

export const showWarning = (message, options = {}) => {
  showNotification(message, 'warning', options)
}

export const showNotification = (message, type, options = {}) => {
  Notify.create({
    message: message,
    type: type,
    position: 'top-right',
    timeout: 3000,
    ...options
  })
}

export const showPersistentNotification = (message, type, options = {}) => {
  Notify.create({
    message: message,
    type: type,
    position: 'top-right',
    ...options,
    actions: [
      { icon: 'close',
        color: 'white',
        round: true,
        handler: () => { return true }
      }
    ]
  })
}

export default showNotification
