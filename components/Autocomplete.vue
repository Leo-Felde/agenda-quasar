<template>
  <q-select
    v-model="itemSelecionado"
    :label="label"
    option-label="nome"
    use-input
    filled
    :options="options"
    :error="false"
    @input-value="$emit('search', $event)"
    @update:modelValue="selecionarItem"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhuma item encontrado
        </q-item-section>
      </q-item>
    </template>

    <template
      v-if="showAddBtn"
      #append
    >
      <slot name="appendInner" />
      <q-btn
        v-if="!$slots.appendInner"
        class="q-ml-sm add-btn"
        icon="add"
        color="primary"
        round
        dense
        @click.stop.prevent="$emit('click:append-inner')"
      />
    </template>
  </q-select>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => ([])
    },
    label: {
      type: String,
      default: 'autocomplete'
    },
    showAddBtn: Boolean,
  },

  emits: ['update:modelValue', 'search', 'click:append-inner'],
  setup (props, { emit }) {
    const options = ref([])
    const itemSelecionado = ref(null)
    
    watch(() => props.modelValue, () => {
      if (props.modelValue?.id) {
        if (!items.value.some(p => p.id === props.modelValue.id)) {
          options.value.push(props.modelValue)
          setTimeout(() => {
            itemSelecionado.value = props.modelValue
          }, 100)
        }
      }
    })

    watch(() => props.items, () => {
      options.value = props.items
    })

    onMounted(() => {
      if (props.items.length > 0) {
        options.value = props.items
      }

      if (props.modelValue) {
        options.value.push(props.modelValue)
        setTimeout(() => {
          itemSelecionado.value = props.modelValue
        }, 100)
      }
    })

    const selecionarItem = () => {
      emit('update:modelValue', itemSelecionado.value)
    }

    return {
      options,
      selecionarItem,
      itemSelecionado
    }
  }
}
</script>
