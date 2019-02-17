<template>
  <div class="field">
    <label class="label">
      <slot name="label"></slot>
    </label>
    <div class="control">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionFormField'
}
</script>
