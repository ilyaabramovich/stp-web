<template>
  <div class="field">
    <label class="label">{{ title }}</label>
    <div class="control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionFormField',
  props: {
    title: String
  }
}
</script>
