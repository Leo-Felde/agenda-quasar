<template>
  <div>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="lista"
      :columns="columns"
      :loading="loading"
      virtual-scroll
      row-key="field"
      @row-click="(event, row) => editarContato(row)"
    >
      <template #top>
        <span class="text-h6 q-my-auto">Contatos</span>

        <q-input
          v-if="!$q.screen.lt.md"
          v-model="search"
          class="q-ml-sm"
          rounded
          standout
          dense
          clearable
          placeholder="Pesquisar"
          @keyup.enter="listarTodos(true)"
          @clear="listarTodos()"
        >
          <template #append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="listarTodos(true)"
            />
          </template>
        </q-input>
        <q-space />

        <q-btn
          color="primary"
          icon-right="add"
          @click="novoContato"
        >
          Novo contato
        </q-btn>
      </template>

      <template #body-cell-nome="props">
        <q-td :props="props">
          <div>
            <PessoaAvatar
              :id="props.row.pessoa.id"
              :key="props.row.pessoa.id"
            />
            {{ props.row.pessoa.nome }}
            <q-icon
              v-if="props.row.favorito"
              name="star"
              color="yellow"
              size="sm"
            />
          </div>
        </q-td>
      </template>

      <template #body-cell-tipoContato="props">
        <q-td :props="props">
          <span v-if="isMobile">Forma de contato:</span>
          {{ props.row.tipoContato }}
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <tableOptionsBtn
            :row="props.row"
            :options="extraActions"
            @editar="editarContato"
            @excluir="excluirContato"
          >
            <template #item-favorite>
              <q-item
                v-close-popup
                clickable
                class="row"
                @click="toggleFavorito(props.row)"
              >
                <q-item-section>
                  {{ props.row.favorito ? 'Desfavoritar' : 'Favoritar' }}
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="star" />
                </q-item-section>
              </q-item>
            </template>
          </tableOptionsBtn>
        </q-td>
      </template>

      <template #body-cell-endereco="props">
        <q-td :props="props">
          <div>
            {{ props.row.pessoa.endereco.bairro }}, {{ props.row.pessoa.endereco.cidade }} - {{ props.row.pessoa.endereco.estado }}
          </div>
        </q-td>
      </template>
    </q-table>
    <FormDialogoContato
      v-model="showDialog"
      :contato="contatoSelecionado"
      @atualizar="listarTodos"
    />
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

import { showSuccess, showError } from '~/utils/notify'
import { confirmDialog } from '~/utils/promptDialog' 

import ContatosAPI from '~/api/contatos'
import FavoritosAPI from '~/api/favoritos'
const columns = [
  { name: 'nome', field: 'pessoa.nome', label: 'Nome', align: 'left', sortable: true },
  { name: 'tipoContato', field: 'tipoContato', label: 'Forma de contato', align: 'center', sortable: true },
  { name: 'telefone', field: 'telefone', label: 'Telefone', sortable: true },
  { name: 'email', field: 'email', label: 'E-mail', sortable: true },
  { name: 'endereco', field: 'pessoa.endereco', label: 'Endereço', sortable: true },
  { name: 'actions', align: 'center', label: 'Ações'}
]

const extraActions = [
  'favorite'
]

export default {

  setup () {
    const search = ref('')
    const contatos = ref([])
    const favoritos = ref([])
    const lista = ref([])
    const contatoSelecionado = ref({})
    const loading = ref(false)
    const showDialog = ref(false)

    const $q = useQuasar()

    const isMobile = computed(() => {
      return $q.platform.is.mobile
    })

    onMounted(() => {
      listarTodos()
    })

    const editarContato = (contato) => {
      contatoSelecionado.value = contato
      showDialog.value = true
    }

    const novoContato = () => {
      contatoSelecionado.value = {}
      showDialog.value = true
    }

    const excluirContato = async () => {
      const confirm = await showConfirmDelete('Excluir contato', 'Deseja excluir esse contato? Isso não pode ser revertido')
      if (confirm) {
        try {
          // await ContatosAPI.excluir(contatoSelecionada.value.id)
          showSuccess('Contato excluído com sucesso')
          listarContatos()
        } catch (error) {
          showError('Não foi possível excluir o contato')
        } finally {
          loading.value = false
        }
      }
    }

    const listarFavoritos = async () => {
      loading.value = true

      try {
        const resp = await FavoritosAPI.pesquisar()

        favoritos.value = new Set(resp.data.map(contato => contato.id)) // armazena apenas o id dos usuários favoritos
      } catch (error) {
        console.error(error)
        showError('Não foi possível listar os favoritos')
      } finally {
        loading.value = false
      }
    }

    const listarContatos = async (useSearch = false) => {
      loading.value = true

      try {
        const param = { termo: useSearch ? search.value || '' : ''}
        const resp = await ContatosAPI.pesquisar(param)

        contatos.value = resp.data
      } catch (error) {
        console.error(error)
        showError('Não foi possível listar os contatos')
      } finally {
        loading.value = false
      }
    }

    const listarTodos = async (useSearch = false) => {
      await listarContatos()
      if (useSearch) {
        await listarContatos(true)
        lista.value = contatos.value
      } else {
        await listarContatos()
        await listarFavoritos()
        lista.value = contatos.value.map(contato => ({
          ...contato,
          favorito: favoritos.value.has(contato.id)
        }))
      }
    }

    const toggleFavorito = async (contato) => {
      if (contato.favorito) {
        const confirm = await confirmDialog('Desfavoritar', 'Remover este contato dos favoritos?')
        if (!confirm) return
      }

      favoritar(contato)
    }

    const favoritar = async (contato) => {
      try {
        if (contato.favorito) {
          await FavoritosAPI.excluir(contato.id)
        } else {
          await FavoritosAPI.salvar(contato)
        }
        showSuccess(`Contato ${contato.favorito ? 'des' : ''}favoritado com sucesso`)
        listarTodos()
      } catch (error) {
        console.error(error)
        showError(`Não foi possível ${contato.favorito ? 'des' : ''}favoritar o contato`)
      }
    }

    
    return {
      columns,
      extraActions,
      search,
      showDialog,
      loading,
      lista,
      contatoSelecionado,
      isMobile,
      listarTodos,
      editarContato,
      novoContato,
      excluirContato,
      toggleFavorito
    }
  }
}
</script>

<style lang="sass" scoped>
.my-table-details 
  font-size: 0.85em
  font-style: italic
  max-width: 200px
  white-space: normal
  color: #555
  margin-top: 4px

</style>