<template>
  <button :class="`button is-${variant}`" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: String
  }
};
</script>
