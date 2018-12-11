<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <form>
          <label class="label" for="section">Раздел</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select id="section" v-model="selectedSection">
                  <option disabled value>Выберите раздел</option>
                  <option
                    :key="section.value"
                    v-for="section in sections"
                    :value="section.value"
                  >{{ section.title }}</option>
                </select>
              </div>
            </div>
            <div class="control">
              <button class="button is-primary" type="button">Добавить</button>
            </div>
          </div>
          <label class="label" for="chapter">Глава</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select id="chapter" v-model="selectedChapter">
                  <option disabled value>Выберите главу</option>
                  <option
                    :key="chapter.value"
                    v-for="chapter in chapters"
                    :value="chapter.value"
                  >{{ chapter.title }}</option>
                </select>
              </div>
            </div>
            <div class="control">
              <button class="button is-primary" type="button">Добавить</button>
            </div>
          </div>
          <label class="label" for="paragraph">Параграф</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select id="paragraph" v-model="selectedParagraph">
                  <option disabled value>Выберите параграф</option>
                  <option
                    :key="paragraph.value"
                    v-for="paragraph in paragraphs"
                    :value="paragraph.value"
                  >{{ paragraph.title }}</option>
                </select>
              </div>
            </div>
            <div class="control">
              <button class="button is-primary" type="button">Добавить</button>
            </div>
          </div>
          <div class="columns">
            <div class="column is-three-quarters">
              <label class="label" for="subsection">Тип задания</label>
              <div class="field has-addons">
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select id="subsection" v-model="selectedSubsection">
                      <option disabled value>Выберите тип задания</option>
                      <option
                        :key="subsection.value"
                        v-for="subsection in subsections"
                        :value="subsection.value"
                      >{{ subsection.title }}</option>
                    </select>
                  </div>
                </div>
                <div class="control">
                  <button class="button is-primary" type="button">Добавить</button>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label" for="difficulty">Сложность вопроса</label>
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select id="difficulty" v-model="selectedDifficulty">
                      <option disabled value>Выберите сложность</option>
                      <option
                        :key="difficulty.value"
                        v-for="difficulty in difficulties"
                        :value="difficulty.value"
                      >{{ difficulty.title }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="question">Вопрос</label>
            <div class="control">
              <textarea
                v-model="question"
                placeholder="Введите текст вопроса"
                class="textarea"
                id="question"
                cols="30"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button type="submit" class="button is-primary">Добавить вопрос</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Form",
  props: {
    questionTypes: Array,
    chapters: Array,
    sections: Array,
    subsections: Array,
    paragraphs: Array,
    difficulties: Array,
    selectedSubsection: String,
    selectedDifficulty: String,
    selectedChapter: String,
    selectedParagraph: String,
    selectedSection: String,
    question: String
  }
};
</script>

<style>
</style>
