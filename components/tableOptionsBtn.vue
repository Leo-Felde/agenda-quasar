<template>
  <q-btn
    icon="more_vert"
    flat
    round
    @click.stop.prevent=""
  >
    <q-menu>
      <q-list
        v-if="!$slots.default"
        style="min-width: 100px"
      >
        <q-item-label header>
          Ações
        </q-item-label>
        <q-item
          v-close-popup
          clickable
          class="row"
          @click="$emit('editar', row)"
        >
          <q-item-section>
            Editar
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="edit" />
          </q-item-section>
        </q-item>
        <q-item
          v-close-popup
          clickable
          @click="$emit('excluir', row)"
        >
          <q-item-section>
            excluir
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>
        </q-item>
      </q-list>
      <slot />
    </q-menu>
  </q-btn>
</template>

<script>
export default {

  props: {
    row: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['editar'],
  setup () {

  }
}
</script>

<style>

</style>