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

export default showNotification
