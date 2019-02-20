<template>
  <div id="app">
    <TheHeading />
    <NotificationContainer />
    <div class="container" style="width: 700px">
      <div class="box">
        <QuestionForm />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeading from '@/components/TheHeading.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'

export default {
  name: 'App',
  components: {
    QuestionForm,
    TheHeading,
    NotificationContainer
  }
}
</script>
