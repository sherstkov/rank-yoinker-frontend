<template>
  <div class="round-event">
    <button :disabled="currentEvent === 0" @click="prevEvent">Prev</button>
    <p class="round-event__count">{{ currentEvent + 1 }}</p>
    <button
      :disabled="currentEvent >= $props.roundInfo.length - 1"
      @click="nextEvent"
    >
      Next
    </button>
    <p>{{ currentTime() }}</p>
  </div>
  <canvas id="gameCanvas" ref="gameCanvas"></canvas>
</template>

<script lang="ts">
import { ref, watchEffect } from "vue";
import { formatRoundTime } from "@/utils";
import type { PlayerReplayInfo, Round } from "@/types/player";

export default {
  name: "MapCanvas",
  props: {
    roundInfo: {
      type: Array as () => Round[],
      required: true,
    },
    mapImage: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    //one of the event that happend in this round
    const currentEvent = ref(0);

    const gameCanvas = ref<HTMLCanvasElement>();

    watchEffect(() => {
      const currentEventValue = currentEvent.value;
      const playerCoords = props.roundInfo[currentEventValue].playerLocations;
      const mapImageSrc = props.mapImage;

      const ctx = gameCanvas.value?.getContext("2d");
      if (ctx) {
        const mapImage = new Image();
        mapImage.src = mapImageSrc;
        mapImage.onload = () => {
          ctx.canvas.width = mapImage.width;
          ctx.canvas.height = mapImage.height;
          draw(ctx, mapImage, playerCoords);
        };
      }
    });

    const draw = (
      ctx: CanvasRenderingContext2D,
      mapImage: HTMLImageElement,
      playerLocations: PlayerReplayInfo[]
    ) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(mapImage, 0, 0);

      playerLocations.forEach((player) => {
        const characterImage = new Image();
        characterImage.src = player.subjectInfo.agentImage;
        characterImage.onload = () => {
          const circleRadius = 20;
          const lineLength = 40;
          const offsetX = 10;
          const offsetY = 5;

          //getting color of circle
          let fillColor = "rgba(0, 0, 0, 0.2)";
          let imageOpacity = 1;
          let drawLine = true;
          if (player.subjectInfo.team === "Red") {
            fillColor = "rgba(248, 71, 104, 0.8)";
          } else if (player.subjectInfo.team === "Blue") {
            fillColor = "rgba(61, 237, 196, 0.8)";
          } else {
            fillColor = "rgba(0, 0, 0, 0.2)"; //grey if no team is assigned
            imageOpacity = 0.5;
            drawLine = false;
          }

          //drawing cirlce
          ctx.save();
          ctx.translate(player.coords.x + offsetX, player.coords.y + offsetY);
          ctx.beginPath();
          ctx.arc(0, 0, circleRadius, 0, Math.PI * 2, true);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.closePath();
          ctx.clip();

          //drawing image
          ctx.globalAlpha = imageOpacity;
          ctx.drawImage(
            characterImage,
            -circleRadius,
            -circleRadius,
            circleRadius * 2,
            circleRadius * 2
          );
          ctx.globalAlpha = 1;
          ctx.restore();

          //drawing line
          if (drawLine) {
            ctx.save();
            ctx.translate(player.coords.x + offsetX, player.coords.y + offsetY);
            ctx.rotate(player.viewRadians || 0);

            ctx.beginPath();
            ctx.moveTo(0, -circleRadius);
            ctx.lineTo(0, -(circleRadius + lineLength));
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.restore();
          }
        };
      });
    };

    const nextEvent = () => {
      if (currentEvent.value < props.roundInfo.length - 1) {
        currentEvent.value++;
      }
    };

    const prevEvent = () => {
      if (currentEvent.value > 0) {
        currentEvent.value--;
      }
    };

    const currentTime = () => {
      return formatRoundTime(props.roundInfo[currentEvent.value].eventTime);
    };

    return { gameCanvas, nextEvent, prevEvent, currentEvent, currentTime };
  },
};
</script>

<style lang="scss" scoped>
.round-event {
  display: flex;
  place-items: center;
  gap: 1rem;

  &__count {
    font-size: 1.25rem;
    font-weight: 600;
  }
}
</style>
