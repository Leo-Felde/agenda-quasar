<template>
  <div>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="usuarios"
      :columns="columns"
      :loading="loading"
      row-key="field"
      @row-click="editarUsuario"
    >
      <template #top>
        <span class="text-h6 q-my-auto">Usuários</span>

        <q-space />

        <q-btn
          color="primary"
          icon-right="add"
          @click="novoUsuario"
        >
          Novo usuário
        </q-btn>
      </template>
    </q-table>
    <FormDialogoUsuario
      v-model="showDialog"
      :usuario="usuarioSelecionado"
      @atualizar="listarUsuarios"
    />
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'

import { showError } from '~/plugins/notify'
import { formatDate } from '~/utils/formatacao'

import UsuariosAPI from '~/api/usuarios'
const columns = [
  { field: 'nome', label: 'Nome', align: 'left', sortable: true },
  { field: 'username', label: 'Nome de usuário', align: 'center', sortable: true },
  { field: 'cpf', label: 'Cpf', sortable: true },
  { field: 'email', label: 'E-mail', sortable: true },
  { field: 'telefone', label: 'Telefone' },
  { field: 'dataNascimento', label: 'Data de nascimento' }
]

export default {

  setup () {
    const usuarios = ref([])
    const usuarioSelecionado = ref({})
    const loading = ref(false)
    const showDialog = ref(false)

    onMounted(() => {
      listarUsuarios()
    })

    const editarUsuario = (event, usuario) => {
      console.log(usuario)
      usuarioSelecionado.value = usuario
      showDialog.value = true
    }

    const novoUsuario = () => {
      usuarioSelecionado.value = {}
      showDialog.value = true
    }

    const listarUsuarios = async () => {
      loading.value = true

      try {
        const param = { termo: ''}
        const resp = await UsuariosAPI.pesquisar(param)

        usuarios.value = resp.data.map(usuario => {
          const usuarioFormatado = { ...usuario } // Create a shallow copy of the object
          usuarioFormatado.dataNascimento = formatDate(usuario.dataNascimento)
          return usuarioFormatado
        })
      } catch (error) {
        console.error(error)
        showError('Erro ao listar os usuários')
      } finally {
        loading.value = false
      }
    }
    
    return {
      columns,
      showDialog,
      loading,
      usuarios,
      usuarioSelecionado,
      editarUsuario,
      novoUsuario,
      listarUsuarios
    }
  }
}
</script>