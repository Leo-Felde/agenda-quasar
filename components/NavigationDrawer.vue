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
            v-show="item.adminOnly ? userAdmin : true"
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
import { ref, onMounted, computed } from 'vue'

export default {
  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const drawer = ref(props.modelValue)

    const user = useCurrentUser()

    const userAdmin = computed(() => {
      return user.value.tipos.includes('ROLE_ADMIN')
    })

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
        to: '/usuarios',
        adminOnly: true
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
      userAdmin,
      menuList
    }
  }
}
</script>

<style>

</style>