<template>
  <div>
    <q-table
      class="sticky-header"
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
        <q-input
          v-if="!$q.screen.lt.md"
          v-model="search"
          class="q-ml-sm"
          dense
          rounded
          standout
          clearable
          placeholder="Pesquisar"
          @keyup.enter="listarUsuarios(true)"
          @clear="listarUsuarios()"
        >
          <template #append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="listarUsuarios(true)"
            />
          </template>
        </q-input>
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

import { showError } from '~/utils/notify'
import { formatDate } from '~/utils/formatacao'

import UsuariosAPI from '~/api/usuarios'
const columns = [
  { name: 'nome', field: 'nome', label: 'Nome', align: 'left', sortable: true },
  { name: 'username', field: 'username', label: 'Nome de usuário', align: 'center', sortable: true },
  { name: 'cpf', field: 'cpf', label: 'Cpf', sortable: true },
  { name: 'email', field: 'email', label: 'E-mail', sortable: true },
  { name: 'telefone', field: 'telefone', label: 'Telefone', sortable: true },
  { name: 'dataNascimento', field: 'dataNascimento', label: 'Data de nascimento', sortable: true }
]

export default {

  setup () {
    definePageMeta({
      middleware: ['admin']
    })
    
    const search = ref('')
    const usuarios = ref([])
    const usuarioSelecionado = ref({})
    const loading = ref(false)
    const showDialog = ref(false)

    onMounted(() => {
      listarUsuarios()
    })

    const editarUsuario = (event, usuario) => {
      usuarioSelecionado.value = usuario
      showDialog.value = true
    }

    const novoUsuario = () => {
      usuarioSelecionado.value = {}
      showDialog.value = true
    }

    const listarUsuarios = async (useSearch = false) => {
      loading.value = true

      try {
        const param = { termo: useSearch ? search.value || '' : ''}
        const resp = await UsuariosAPI.pesquisar(param)

        usuarios.value = resp.data.map(usuario => {
          const usuarioFormatado = { ...usuario } // Create a shallow copy of the object
          usuarioFormatado.dataNascimento = formatDate(usuario.dataNascimento)
          return usuarioFormatado
        })
      } catch (error) {
        console.error(error)
        showError('Não foi possível listar os usuários')
      } finally {
        loading.value = false
      }
    }
    
    return {
      columns,
      search,
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