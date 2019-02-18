<template>
  <section class="section">
    <header class="containter">
      <h1 class="title has-text-centered">
        <slot>Добавление вопроса</slot>
      </h1>
    </header>
  </section>
</template>

<script>
export default {
  name: 'TheHeading',
  props: { title: { type: String, default: '' } }
}
</script>
