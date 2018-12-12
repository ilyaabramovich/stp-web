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
        <div v-if="hasAddon" class="control">
          <button type="button" class="button is-info" @click="show">Добавить</button>
          <div class="modal" :class="{'is-active':isActive}">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <button class="delete" aria-label="close" @click="hide"></button>
              </header>
              <section class="modal-card-body">
                <!-- Content ... -->
                <div class="field">
                  <div class="label">Введите имя</div>
                  <div class="control">
                    <input v-model="name" type="text" class="input">
                  </div>
                </div>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-success" type="button" @click="handleSubmit">Добавить</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectContainer",
  props: {
    hasAddon: Boolean,
    title: String,
    onSubmit: Function,
    id: String
  },
  data() {
    return {
      isActive: false,
      name: ""
    };
  },
  methods: {
    show() {
      this.isActive = true;
    },
    handleSubmit: function() {
      this.onSubmit(this.name);
      this.name = "";
      this.hide();
    },
    hide() {
      this.isActive = false;
    }
  }
};
</script>
