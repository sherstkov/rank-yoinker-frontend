<template>
  <div class="base-panel" :class="colorClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "BasePanel",
  props: {
    // The color prop now accepts one of the predefined color names
    color: {
      type: String,
      default: "default",
      validator: function (value: string) {
        return ["default", "pink-10", "mint-10"].includes(value);
      },
    },
  },
  computed: {
    colorClass() {
      return `color-${this.color}`;
    },
  },
};
</script>

<style>
.base-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--black-opacity-20);
  height: 100%;
}

.color-default {
  background-color: var(--black-opacity-20);
}

.color-pink-10 {
  background-color: var(--pink-tint-10);
}

.color-mint-10 {
  background-color: var(--mint-tint-10);
}
</style>
