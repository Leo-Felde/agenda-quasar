import { Dialog } from 'quasar'

export const confirmDialog = (title, message) => {
  return showDialog(title, message, true, { label: 'Confirmar', color: 'primary' })
}

export const showConfirmDelete = (title, message) => {
  return showDialog(title, message, true, { label: 'Excluir', color: 'red' })
}

export const showDiscardChanges = () => {
  return showDialog('Alterações pendentes', 'Deseja cancelar e descartar todas as alterações?', false, { label: 'Descartar', color: 'primary' })
}

export const showDialog = (title, message, persistent = false, ok = { label: 'ok', color: 'primary' }, cancel = { label: 'Cancelar', flat: true }) => {
  return new Promise(resolve => {
    Dialog.create({
      title: title,
      message: message,
      persistent: persistent,
      cancel: cancel,
      ok: ok
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
  })
}

export default showDialog
