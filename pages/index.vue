<template>
  <div>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="contatos"
      :columns="columns"
      :loading="loading"
      row-key="field"
      @row-click="editarContato"
    >
      <template #top>
        <span class="text-h6 q-my-auto">Contatos</span>

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
            <q-avatar
              size="48px"
              class="cursor-pointer"
            >
              <img :src="`https://d2ph5fj80uercy.cloudfront.net/04/cat${props.row.id * 195}.jpg`">
            </q-avatar>
            {{ props.row.pessoa.nome }}
          </div>
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
    <!-- <FormDialogoContato
      v-model="showDialog"
      :contato="contatoSelecionado"
    /> -->
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

import ContatosAPI from '~/api/contatos'
const columns = [
  { name: 'nome', field: 'pessoa.nome', label: 'Nome', align: 'left', sortable: true },
  { field: 'tipoContato', label: 'Forma de contato', align: 'center', sortable: true },
  { field: 'telefone', label: 'Telefone', sortable: true },
  { field: 'email', label: 'E-mail', sortable: true },
  { name: 'endereco', field: 'pessoa.endereco', label: 'Endereço' },
]

export default {

  setup () {
    const contatos = ref([])
    const contatoSelecionado = ref({})
    const loading = ref(false)
    const showDialog = ref(false)
    
    const $q = useQuasar()

    onMounted(() => {
      listarContatos()
    })

    const editarContato = (event, contato) => {
      contatoSelecionado.value = contato
      showDialog.value = true
    }

    const novoContato = () => {
      contatoSelecionado.value = {}
      showDialog.value = true
    }

    const listarContatos = async () => {
      loading.value = true

      try {
        const param = { termo: ''}
        const resp = await ContatosAPI.pesquisar(param)

        contatos.value = resp.data
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Erro ao listar os contatos',
          position: 'top-right',
          color: 'red'
        })
      } finally {
        loading.value = false
      }
    }
    
    return {
      columns,
      showDialog,
      loading,
      contatos,
      contatoSelecionado,
      editarContato,
      novoContato
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