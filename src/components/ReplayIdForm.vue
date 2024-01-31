<template>
  <form @submit.prevent="submitForm">
    <label for="matchID">Match ID:</label>
    <input id="matchID" v-model="matchValue" type="text" required />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["sumbit-match"]);

const matchValue = defineModel<string>();

const submitForm = () => {
  emit("sumbit-match");
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  gap: 1rem;
  place-items: center;
  margin-bottom: 1rem;
}
</style>
