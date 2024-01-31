<template>
  <div class="already-played-item">
    Played with {{ name }}. Last is {{ convertTime(time_diff) }} ago:
    <span>
      <a
        v-for="(matchID, index) in matchesIDs"
        :key="matchID"
        :href="`https://tracker.gg/valorant/match/${matchID}`"
        target="_blank"
        class="already-played-item__link"
        >{{ index + 1 }}</a
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { AlreadyPlayed } from "@/types/player";

const props = defineProps<{
  alreadyPlayedWith: AlreadyPlayed;
}>();

const { name, time_diff, matchesIDs } = toRefs(props.alreadyPlayedWith);

function convertTime(s: number): string {
  s = Math.floor(s); // Ensure s is an integer
  if (s < 60) {
    return `${s} second${s === 1 ? "" : "s"}`;
  } else if (s < 3600) {
    const minutes = Math.floor(s / 60);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else if (s < 86400) {
    const hours = Math.floor(s / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else {
    const days = Math.floor(s / 86400);
    return `${days} day${days === 1 ? "" : "s"}`;
  }
}
</script>

<style lang="scss" scoped>
.already-played-item__link {
  margin-right: 4px;
}
</style>
