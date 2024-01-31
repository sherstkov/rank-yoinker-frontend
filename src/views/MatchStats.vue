<script setup lang="ts">
import useWebSocket from "@/composables/useWebSocket";
import PlayerCard from "@/components/PlayerCard.vue";
import AlreadyPlayedItem from "@/components/AlreadyPlayedItem.vue";
import TheLoader from "@/components/common/TheLoader.vue";

const { gameData, redTeam, blueTeam, loadingStatus } = useWebSocket();
</script>

<template>
  <section class="teams">
    <article>
      <h2
        v-show="gameData.gameState !== `Menus`"
        class="teams__title--attacking"
      >
        Attacking
      </h2>
      <ul class="player-list">
        <li v-for="player in redTeam" :key="player.uuid">
          <player-card :player="player" :is-red-team="true" />
        </li>
      </ul>
    </article>
    <header class="game-state">
      <h1 v-if="gameData.players.length > 0" class="game-state__title">
        {{ `${gameData.gameState} — ${gameData.server}` }}
      </h1>
      <p
        v-else-if="loadingStatus.status !== `active`"
        class="game-state__title"
      >
        <TheLoader />
      </p>
      <div
        class="game-state__loading"
        v-show="loadingStatus.status === `active`"
      >
        <TheLoader />
        <p>
          Loading players [{{ loadingStatus.loadedPlayers }}/{{
            loadingStatus.totalPlayers
          }}]
        </p>
      </div>
      <ul
        v-show="loadingStatus.status === `idle`"
        class="game-state__already-played"
      >
        <li v-for="player in gameData.already_played_with" :key="player.agent">
          <AlreadyPlayedItem :alreadyPlayedWith="player" />
        </li>
      </ul>
    </header>
    <article>
      <h2
        v-show="gameData.gameState !== `Menus`"
        class="teams__title--defending"
      >
        Defending
      </h2>
      <ul class="player-list">
        <li v-for="player in blueTeam" :key="player.uuid">
          <PlayerCard :player="player" :is-red-team="false" />
        </li>
      </ul>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.teams {
  display: grid;
  grid-template-columns: minmax(32em, 1fr) minmax(12em, 1fr) minmax(32em, 1fr);
  gap: 1rem;

  &__title--attacking {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--pink-flamingo);
    margin-bottom: 1rem;
  }

  &__title--defending {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--mint-fresh);
    margin-bottom: 1rem;
  }
}

@media (max-width: 1200px) {
  .teams {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .teams > :nth-child(2) {
    order: -1;
  }
}

.player-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.game-state {
  &__title {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  &__already-played {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>
