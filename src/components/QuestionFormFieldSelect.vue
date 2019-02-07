<template>
  <question-form-field :title="title">
    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <slot></slot>
        </div>
      </div>
      <div v-if="hasAddon" class="control">
        <question-form-add-modal
          :disabled="forUnit?!(name&&difficulty&&hint):!(name)"
          :on-submit="handleSubmit"
        >
          <question-form-field title="Введите название">
            <input v-model="name" type="text" class="input">
          </question-form-field>
          <question-form-field-select v-if="forUnit" title="Сложность" :hasAddon="false">
            <select v-model="difficulty">
              <option disabled value>Выберите сложность</option>
              <option
                :key="difficulty.id"
                v-for="difficulty in difficulties"
                :value="difficulty.id"
              >{{ difficulty.name }}</option>
            </select>
          </question-form-field-select>
          <question-form-field v-if="forUnit" title="Подсказка">
            <textarea
              v-model="hint"
              placeholder="Введите подсказку к заданию"
              class="textarea"
              cols="30"
              rows="5"
            ></textarea>
          </question-form-field>
        </question-form-add-modal>
      </div>
    </div>
  </question-form-field>
</template>

<script>
import QuestionFormField from "./QuestionFormField";
import QuestionFormAddModal from "./QuestionFormAddModal";

export default {
  name: "QuestionFormFieldSelect",
  components: {
    QuestionFormField,
    QuestionFormAddModal
  },
  props: {
    hasAddon: Boolean,
    title: String,
    onSubmit: Function,
    id: String,
    difficulties: Array
  },
  data() {
    return {
      name: "",
      difficulty: "",
      hint: ""
    };
  },
  computed: {
    forUnit() {
      return this.title === "Задание";
    }
  },
  methods: {
    handleSubmit() {
      if (!this.forUnit) {
        this.onSubmit(this.name);
        this.name = "";
      } else {
        this.onSubmit(this.name, this.difficulty, this.hint);
        this.name = "";
        this.difficulty = "";
        this.hint = "";
      }
    }
  }
};
</script>
