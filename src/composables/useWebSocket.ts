import { ref, Ref, onMounted } from "vue";
import type {
  PlayerInfo,
  IngameData,
  MatchStatsLoading,
  ReplayData,
} from "@/types/player";
import { WEBSOCKET_SERVER } from "@/constants";

type SendWebSocketMessage = {
  type: "replayMatch";
  matchID: string;
};

export default function useWebSocket() {
  const gameData: Ref<IngameData> = ref({
    players: [],
    already_played_with: [],
    gameState: "Menus",
    server: "",
  });

  const redTeam: Ref<PlayerInfo[]> = ref([]);
  const blueTeam: Ref<PlayerInfo[]> = ref([]);

  const loadingStatus: Ref<MatchStatsLoading> = ref({
    totalPlayers: 0,
    loadedPlayers: 0,
    status: "idle",
  });

  const replayData = ref<ReplayData>({
    roundsData: [],
    map: {
      image: "",
      name: "",
      startTime: 0,
    },
  });

  const wsConnection: Ref<WebSocket | null> = ref(null);

  onMounted(() => {
    console.log("Starting connection to WebSocket Server");
    wsConnection.value = new WebSocket(WEBSOCKET_SERVER);

    wsConnection.value.onmessage = (event) => {
      const json: IngameData | MatchStatsLoading | ReplayData = JSON.parse(
        event.data
      );
      if (json.type === "matchStats") {
        gameData.value = json;

        redTeam.value = gameData.value.players.filter(
          (p) => p.teamID === "Red"
        );
        blueTeam.value = gameData.value.players.filter(
          (p) => p.teamID === "Blue"
        );
      }

      if (json.type === "matchStatsLoading") {
        loadingStatus.value = json;
      }

      if (json.type === "replayMatch") {
        replayData.value = json;
      }
    };

    wsConnection.value.onopen = () => {
      console.log("Successfully connected to websocket server...");
    };
  });

  const sendMessage = (WSMessage: SendWebSocketMessage) => {
    if (
      wsConnection.value &&
      wsConnection.value.readyState === WebSocket.OPEN
    ) {
      wsConnection.value.send(JSON.stringify(WSMessage));
    } else {
      console.error("Cannot send message, WebSocket is not open");
    }
  };

  const sendReplayMessage = (message: string) => {
    const replayMessage: SendWebSocketMessage = {
      type: "replayMatch",
      matchID: message,
    };
    sendMessage(replayMessage);
  };

  return {
    gameData,
    redTeam,
    blueTeam,
    loadingStatus,
    replayData,
    sendReplayMessage,
  };
}
