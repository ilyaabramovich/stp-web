<template>
  <div class="field">
    <label class="label">{{title}}</label>
    <div class="control">
      <div class="field has-addons">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <slot></slot>
          </div>
        </div>
        <p v-if="hasAddon" class="control">
          <Button variant="primary">Добавить</Button>
          <modal name="modal">
            <form>
              <div class="field">
                <div class="label"></div>
                <div class="control">
                  <input type="text" class="input">
                </div>
              </div>
            </form>
          </modal>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "SelectContainer",
  props: {
    hasAddon: Boolean,
    title: String
  },
  // created: function() {
  //   return this.fetchData();
  // },
  // data() {
  //   return {
  //     model: "",
  //     test: []
  //   };
  // },
  // methods: {
  //   fetchData: async function() {
  //     try {
  //       const res = await fetch("http://localhost:3000/questions", {
  //         method: "POST"
  //       });
  //       const people = await res.json();
  //       this.test = people;
  //     } catch (error) {
  //       // eslint-disable-next-line
  //       console.error(error);
  //     }
  //   }
  // },
  components: {
    Button
  }
};
</script>
