<template>
  <div>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="pessoas"
      :columns="columns"
      :loading="loading"
      row-key="field"
      @row-click="(event, row) => editarPessoa(row)"
    >
      <template #top>
        <span class="text-h6 q-my-auto">Pessoas</span>

        <q-space />

        <q-btn
          color="primary"
          icon-right="add"
          @click="novoPessoa"
        >
          Novo pessoa
        </q-btn>
      </template>

      <template #body-cell-nome="props">
        <q-td :props="props">
          <div>
            <q-avatar
              size="48px"
              class="cursor-pointer"
            >
              <img :src="`https://d2ph5fj80uercy.cloudfront.net/04/cat${props.row.id * 237}.jpg`">
            </q-avatar>
            {{ props.row.nome }}
          </div>
        </q-td>
      </template>

      <template #body-cell-endereco="props">
        <q-td :props="props">
          <div>
            {{ props.row.endereco.bairro }}, {{ props.row.endereco.cidade }} - {{ props.row.endereco.estado }}
          </div>
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <tableOptionsBtn
            :row="props.row"
            @editar="editarPessoa"
            @excluir="excluirPessoa"
          />
        </q-td>
      </template>
    </q-table>
    <FormDialogoPessoa
      v-model="showDialog"
      :pessoa="pessoaSelecionado"
      @atualizar="listarPessoas"
    />
  </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

import PessoasAPI from '~/api/pessoas'
const columns = [
  { name: 'nome', field: 'pessoa.nome', label: 'Nome', align: 'left', sortable: true },
  { field: 'cpf', label: 'Cpf', align: 'left', sortable: true },
  { name: 'endereco', field: 'pessoa.endereco', align: 'left', label: 'Endereço' },
  { name: 'actions', align: 'center', label: 'Ações'}
]

export default {

  setup () {
    const pessoas = ref([])
    const pessoaSelecionado = ref({endereco: {}})
    const loading = ref(false)
    const showDialog = ref(false)
    
    const $q = useQuasar()

    onMounted(() => {
      listarPessoas()
    })

    const editarPessoa = (pessoa) => {
      pessoaSelecionado.value = pessoa
      showDialog.value = true
    }

    const novoPessoa = () => {
      pessoaSelecionado.value = {}
      showDialog.value = true
    }

    const excluirPessoa = async () => {
      $q.dialog({
        title: 'Excluir pessoa',
        message: 'Deseja excluir essa pessoa? Isso não pode ser revertido',
        persistent: true,
        cancel: {
          label: 'Cancelar',
          flat: true,
          color: 'black'
        },
        ok: {
          color: 'red',
          label: 'Excluir'
        },
      }).onOk(async () => {
        try {
          // await PessoasAPI.excluir(pessoaSelecionada.value.id)
          $q.notify({
            message: 'Pessoa excluída com sucesso',
            position: 'top-right',
            color: 'green'
          })
          listarPessoas()
        } catch (error) {
          $q.notify({
            message: 'Ocorreu um erro ao excluir a pessoa',
            position: 'top-right',
            color: 'red'
          })
        } finally {
          loading.value = false
        }
      })
    }

    const listarPessoas = async () => {
      loading.value = true

      try {
        const param = { nome: ''}
        const resp = await PessoasAPI.pesquisar(param)

        pessoas.value = resp.data
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Erro ao listar os pessoas',
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
      pessoas,
      pessoaSelecionado,
      editarPessoa,
      novoPessoa,
      excluirPessoa,
      listarPessoas
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