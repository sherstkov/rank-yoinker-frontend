<template>
  <article class="player-card">
    <div class="player-card__header">
      <div
        v-if="player.color !== 'N/a'"
        class="player-card__party-strip"
        :style="{ backgroundColor: player.color }"
      ></div>
      <figure
        class="player-card__avatar"
        :style="{
          backgroundImage: `url(${player.agent.displayIcon})`,
        }"
        :alt="player.agent.displayName"
        :title="player.agent.displayName"
      ></figure>
      <section class="player-card__stats">
        <ranking-table :player="player" />
      </section>
    </div>
    <div
      class="player-card__divider"
      :style="{
        backgroundColor: isRedTeam
          ? 'var(--pink-flamingo)'
          : 'var(--mint-fresh)',
      }"
    ></div>
    <div
      class="player-card__footer"
      :style="{
        backgroundColor: isRedTeam
          ? 'var(--pink-tint-10)'
          : 'var(--mint-tint-10)',
      }"
    >
      <div>
        <h3
          class="player-card__player-name"
          @click="openPlayerTracker"
          :title="player.name"
        >
          {{ getShortName }}
        </h3>
        <div
          class="player-card__player-level"
          :style="{
            backgroundColor: isRedTeam
              ? 'var(--deep-mahogany)'
              : 'var(--forest-shade)',
            border: isRedTeam
              ? '2px solid var(--blush-rose)'
              : '2px solid var(--aqua-breeze)',
          }"
        >
          <p>
            {{ player.level }}
          </p>
        </div>
      </div>
      <PlayerMatches :player="player" />
    </div>
  </article>
</template>

<script lang="ts">
import type { PlayerInfo } from "@/types/player";
import RankingTable from "./RankingTable.vue";
import PlayerMatches from "./PlayerMatches.vue";

export default {
  components: {
    RankingTable,
    PlayerMatches,
  },
  props: {
    player: {
      type: Object as () => PlayerInfo,
      required: true,
    },
    isRedTeam: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getShortName() {
      //get name without tag
      const nameWithoutTag = this.$props.player.name.split("#")[0];
      if (nameWithoutTag.length > 5) {
        return nameWithoutTag.substring(0, 5) + "...";
      }

      return nameWithoutTag;
    },
  },
  methods: {
    openPlayerTracker() {
      const url = `https://tracker.gg/valorant/profile/riot/${
        this.$props.player.name.split("#")[0]
      }%23${this.$props.player.name.split("#")[1]}`;

      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss">
.player-card {
  width: 100%;

  background-color: var(--black-opacity-20);
  color: white;

  display: flex;
  flex-direction: column;

  &__header {
    width: 100%;
    display: flex;
  }

  &__divider {
    height: 5px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;

    & > div:first-child {
      margin-left: 0.5em;
      gap: 1rem;
      display: flex;
      align-items: center;
    }
  }

  &__header {
    position: relative;
  }

  &__party-strip {
    width: 0.5rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  &__avatar {
    position: relative;
    z-index: 1;
    min-width: 7.25em;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__avatar {
    min-width: 7.25em;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__player-level {
    width: 32px;
    height: 24px;
    border-radius: 25px;
    font-size: 0.75rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__player-name {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
