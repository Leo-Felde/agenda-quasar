<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="250"
    bordered
  >
    <q-scroll-area class="fit">
      <q-list>
        <template
          v-for="(item, index) in menuList"
          :key="`navdrawer-item-${index}`"
        >
          <q-item
            v-ripple
            clickable
            :active="item.label === 'Outbox'"
            :to="item.to"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const drawer = ref(props.modelValue)
    const menuList = ref([
      {
        icon: 'contact_mail',
        label: 'Contatos',
        to: '/'
      },
      {
        icon: 'badge',
        label: 'Meu cadastro',
        to: '/meu-cadastro'
      },
      {
        icon: 'portrait',
        label: 'Usuários',
        to: '/usuarios'
      },
      {
        icon: 'people_alt',
        label: 'Pessoas',
        to: '/pessoas'
      },
    ])

    onMounted(() => {
      drawer.value = props.modelValue
    })

    watch(drawer, () => {
      emit('update:modelValue', drawer.value)
    })

    watch(() => props.modelValue, () => {
      drawer.value = props.modelValue
    })

    return {
      drawer,
      menuList
    }
  }
}
</script>

<style>

</style>