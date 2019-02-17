<template>
  <div id="app">
    <TheHeading>Добавление вопроса</TheHeading>
    <QuestionForm />
  </div>
</template>

<script>
import TheHeading from './components/TheHeading.vue'
import QuestionForm from './components/QuestionForm.vue'

export default {
  name: 'app',
  components: {
    QuestionForm,
    TheHeading
  }
}
</script>

<style></style>
