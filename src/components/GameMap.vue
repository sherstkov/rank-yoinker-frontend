<template>
  <article class="game-map">
    <section class="game-map__info">
      <h2>{{ map?.name }}</h2>
      <time v-if="map?.startTime">{{ formatTime(map.startTime) }}</time>
      <nav class="game-map__nav">
        <h3 class="visually-hidden">Rounds</h3>
        <ul class="rounds-list">
          <li v-for="(_, index) in roundsData" :key="index">
            <BasePanel
              color="mint-10"
              :style="{
                cursor: 'pointer',
                borderColor: currentRound === index ? 'white' : '',
              }"
              @click="handleRoundChange(index)"
              >Round {{ index + 1 }}</BasePanel
            >
          </li>
        </ul>
      </nav>
    </section>
    <figure v-if="map?.image">
      <MapCanvas :roundInfo="roundsData[currentRound]" :mapImage="map.image" />
    </figure>
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BasePanel from "@/components/common/BasePanel.vue";
import MapCanvas from "@/components/MapCanvas.vue";
import { formatTime } from "@/utils/";
import type { ReplayMapInfo, Round } from "@/types/player";

const { roundsData, map } = defineProps({
  roundsData: {
    type: Array as () => Round[][],
    required: true,
  },
  map: Object as () => ReplayMapInfo,
});

const currentRound = ref(0);

const handleRoundChange = (newRound: number) => {
  currentRound.value = newRound;
};
</script>

<style lang="scss" scoped>
.game-map {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;

  &__info {
    width: 300px;
  }
}

.rounds-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
}

.rounds-list li {
  flex: 1 1 50%;
  min-height: 30px;
}
</style>
