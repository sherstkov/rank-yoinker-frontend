<template>
  <table>
    <thead>
      <tr>
        <th>Current</th>
        <th>Previous</th>
        <th>Peak</th>
        <th>RR</th>
        <th>K/D</th>
        <th>ADR</th>
        <th>Winrate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <img
            :src="player.rank.smallIcon"
            :alt="player.rank.tierName"
            :title="player.rank.tierName"
          />
        </td>
        <td>
          <img
            :src="player.previous_rank.smallIcon"
            :alt="player.previous_rank.tierName"
            :title="player.previous_rank.tierName"
          />
        </td>
        <td>
          <img
            :src="player.peakRank.smallIcon"
            :alt="player.peakRank.tierName"
            :title="player.peakRankAct"
          />
        </td>
        <td
          :class="{
            'text-dark-green': player.rr > 80,
            'text-dark-red': player.rr < 20,
            'text-neutral': player.rr >= 20 && player.rr <= 80,
          }"
        >
          {{ player.rr }}
        </td>
        <td
          :class="{
            'text-neutral': player.kd >= 0.8 && player.kd < 1.15,
            'text-light-green': player.kd >= 1.15 && player.kd <= 1.5,
            'text-dark-green': player.kd > 1.5,
            'text-light-red': player.kd >= 0.5 && player.kd < 0.8,
            'text-dark-red': player.kd < 0.5,
          }"
        >
          {{ player.kd }}
        </td>
        <td
          :class="{
            'text-dark-red': player.adr < 90,
            'text-light-red': player.adr >= 90 && player.adr < 125,
            'text-neutral': player.adr >= 125 && player.adr < 135,
            'text-light-green': player.adr >= 135 && player.adr < 155,
            'text-dark-green': player.adr >= 155,
          }"
        >
          {{ player.adr }}
        </td>
        <td>
          <p v-if="playerWinrateClass">
            <span :class="playerWinrateClass"> {{ player.wr }}% </span>
            ({{ player.games_played }})
          </p>
          <p v-else>
            {{ player.wr }}
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import type { PlayerInfo } from "@/types/player";

export default {
  name: "RankingTable",
  props: {
    player: {
      type: Object as () => PlayerInfo,
      required: true,
    },
  },
  computed: {
    playerWinrateClass() {
      const winrate = +this.$props.player.wr;
      if (Number.isInteger(winrate)) {
        if (winrate < 40) {
          return "text-dark-red";
        } else if (winrate >= 40 && winrate < 50) {
          return "text-light-red";
        } else if (winrate >= 50 && winrate < 55) {
          return "text-neutral";
        } else if (winrate >= 55 && winrate < 65) {
          return "text-light-green";
        } else if (winrate >= 65) {
          return "text-dark-green";
        }
      }
      return null;
    },
  },
};
</script>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}
thead th:nth-child(1),
thead th:nth-child(2),
thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4),
thead th:nth-child(5),
thead th:nth-child(6) {
  width: 10%;
}

thead th:nth-child(7) {
  width: 25%;
}

th,
td {
  & img {
    display: inline;
    padding: 6px;
  }
}

.text-neutral {
  color: var(--pale-lime);
}

.text-light-green {
  color: var(--aqua-breeze);
}

.text-dark-green {
  color: var(--mint-fresh);
}

.text-dark-red {
  color: var(--pink-flamingo);
}

.text-light-red {
  color: var(--blush-rose);
}
</style>
