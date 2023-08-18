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
            <PessoaAvatar :id="props.row.id" />
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

import { showSuccess, showError } from '~/utils/notify'
import { showConfirmDelete } from '~/utils/promptDialog'

import PessoasAPI from '~/api/pessoas'
const columns = [
  { name: 'nome', field: 'nome', label: 'Nome', align: 'left', sortable: true },
  { name: 'cpf', field: 'cpf', label: 'Cpf', align: 'left', sortable: true },
  { name: 'endereco', field: 'endereco.bairro', label: 'Endereço', align: 'left', sortable: true },
  { name: 'actions', align: 'center', label: 'Ações'}
]

export default {

  setup () {
    const pessoas = ref([])
    const pessoaSelecionado = ref({endereco: {}})
    const loading = ref(false)
    const showDialog = ref(false)

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
      const confirm = await showConfirmDelete('Excluir pessoa', 'Deseja excluir essa pessoa? Isso não pode ser revertido')
      if (confirm) {
        try {
          // await PessoasAPI.excluir(pessoaSelecionada.value.id)
          showSuccess('Pessoa excluída com sucesso')
          listarPessoas()
        } catch (error) {
          showError('Não foi possível excluir a pessoa')
        } finally {
          loading.value = false
        }
      }
    }

    const listarPessoas = async () => {
      loading.value = true

      try {
        const param = { nome: ''}
        const resp = await PessoasAPI.pesquisar(param)

        pessoas.value = resp.data
      } catch (error) {
        console.error(error)
        showError('Não foi possível listar as pessoas')
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