<template>
  <section>
    <button type="button" class="button is-info" @click="show">Добавить</button>
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" aria-label="close" @click="hide"></button>
        </header>
        <section class="modal-card-body">
          <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <button
            :disabled="disabled"
            class="button is-success"
            type="button"
            @click="handleSubmit"
          >
            Добавить
          </button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'QuestionFormAddModal',
  props: {
    onSubmit: Function,
    disabled: Boolean
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    show() {
      this.isActive = true
    },
    handleSubmit() {
      this.onSubmit()
      this.hide()
    },
    hide() {
      this.isActive = false
    }
  }
}
</script>

<style></style>
