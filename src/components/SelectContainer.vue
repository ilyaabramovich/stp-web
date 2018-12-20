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
                <select-container v-if="forUnit" title="Сложность" :hasAddon="false">
                  <select v-model="difficulty">
                    <option disabled value>Выберите сложность</option>
                    <option
                      :key="difficulty.id"
                      v-for="difficulty in difficulties"
                      :value="difficulty.id"
                    >{{ difficulty.name }}</option>
                  </select>
                </select-container>
                <textarea-container v-if="forUnit" title="Подсказка">
                  <textarea
                    v-model="hint"
                    placeholder="Введите подсказку к заданию"
                    class="textarea"
                    cols="30"
                    rows="5"
                  ></textarea>
                </textarea-container>
              </section>
              <footer class="modal-card-foot">
                <button
                  :disabled="forUnit?!(name&&difficulty&&hint):!(name)"
                  class="button is-success"
                  type="button"
                  @click="handleSubmit"
                >Добавить</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextareaContainer from "./TextareaContainer";

export default {
  name: "SelectContainer",
  props: {
    hasAddon: Boolean,
    title: String,
    onSubmit: Function,
    id: String,
    difficulties: Array
  },
  data() {
    return {
      isActive: false,
      name: "",
      difficulty: "",
      hint: ""
    };
  },
  components: {
    TextareaContainer
  },
  computed: {
    forUnit: function() {
      return this.title === "Задание";
    }
  },
  methods: {
    show() {
      this.isActive = true;
    },
    handleSubmit: function() {
      if (!this.forUnit) {
        this.onSubmit(this.name);
        this.name = "";
      } else {
        this.onSubmit(this.name, this.difficulty, this.hint);
        this.name = "";
        this.difficulty = "";
        this.hint = "";
      }
      this.hide();
    },
    hide() {
      this.isActive = false;
    }
  }
};
</script>
