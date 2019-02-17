<template>
  <transition name="fade">
    <question-form-field>
      <template v-slot:label>{{ title }}</template>
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <slot></slot>
          </div>
        </div>
        <div class="control">
          <question-form-add-modal
            v-show="showModal"
            :for-unit="forUnit"
            @close="showModal = false"
            @on-submit="onSubmit"
          />
          <button type="button" class="button" @click="showModal = true">
            Добавить
          </button>
        </div>
      </div>
    </question-form-field>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
import QuestionFormField from './QuestionFormField'
import QuestionFormAddModal from './QuestionFormAddModal'

export default {
  name: 'QuestionFormFieldSelect',
  components: {
    QuestionFormField,
    QuestionFormAddModal
  },
  props: {
    forUnit: Boolean,
    title: String,
    onSubmit: Function
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>
