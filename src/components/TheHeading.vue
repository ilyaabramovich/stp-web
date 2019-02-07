<template>
  <section class="section">
    <header class="containter">
      <h1 class="title is-1 has-text-centered">{{title}}</h1>
    </header>
  </section>
</template>

<script>
export default {
  name: "TheHeading",
  props: {
    title: String
  }
};
</script>

