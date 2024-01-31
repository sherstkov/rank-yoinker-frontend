<template>
  <section class="demo-replay">
    <ReplayIdForm
      @sumbit-match="submitReplayId"
      v-model="matchId"
      class="replay-form"
    />
    <GameMap :roundsData="replayData.roundsData" :map="replayData.map" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useWebSocket from "@/composables/useWebSocket";
import ReplayIdForm from "@/components/ReplayIdForm.vue";
import GameMap from "@/components/GameMap.vue";

const { sendReplayMessage, replayData } = useWebSocket();
const matchId = ref("");

const submitReplayId = () => {
  sendReplayMessage(matchId.value);
};
</script>

<style lang="scss" scoped>
.demo-replay {
  display: flex;
  place-items: flex-start;
  flex-direction: column;
}
</style>
