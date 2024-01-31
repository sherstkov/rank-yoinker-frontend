<template>
  <ul class="match-list">
    <li v-for="match in player.matches" :key="match.matchID">
      <div
        class="match-list__agent"
        :class="{ 'bg-won': match.isWon, 'bg-lost': !match.isWon }"
        @click="openPlayerMatch(match.matchID)"
      >
        <img
          :src="match.Agent.killfeedPortrait"
          :alt="match.Agent.displayName"
          :title="match.Agent.displayName"
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import type { PlayerInfo } from "@/types/player";

export default {
  props: {
    player: {
      type: Object as () => PlayerInfo,
      required: true,
    },
  },
  methods: {
    openPlayerMatch(matchID: string) {
      const url = `https://tracker.gg/valorant/match/${matchID}`;

      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.match-list {
  list-style: none;
  padding: 0;
  display: flex;

  &__agent {
    width: 70px;
    cursor: pointer;
  }

  .bg-won {
    background-color: var(--mint-fresh);
  }

  .bg-lost {
    background-color: var(--pink-flamingo);
  }
}
</style>
