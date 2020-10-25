<template>
  <div class="diagram-wrapper">
    <div id="palette" class="palette"></div>
    <div id="diagram" class="diagram"></div>
  </div>
</template>

<script lang="ts">
import * as go from "gojs";
import { defineComponent } from "vue";

import { Diagram } from "./diagram/Diagram";
import { Palette } from "./diagram/Palette";

interface DiagramViewData {
  diagram: Diagram | null;
  diagramData: { key: string; color: string }[];
  palette: Palette | null;
  paletteData: { key: string; color: string }[];
}

export default defineComponent({
  name: "DiagramView",
  props: {},
  data() {
    return {
      diagram: null,
      diagramData: [{ key: "P", color: "pink" }],
      palette: null,
      paletteData: [
        { key: "C", color: "cyan" },
        { key: "LC", color: "lightcyan" },
        { key: "A", color: "aquamarine" },
        { key: "T", color: "turquoise" },
        { key: "PB", color: "powderblue" },
        { key: "LB", color: "lightblue" },
        { key: "LSB", color: "lightskyblue" },
        { key: "DSB", color: "deepskyblue" }
      ]
    } as DiagramViewData;
  },
  beforeUnmount() {
    this.diagram?.destroy();
    this.palette?.destroy();
  },
  mounted() {
    const $ = go.GraphObject.make;
    this.diagram = new Diagram("diagram", $, this.diagramData);
    this.palette = new Palette("palette", $, this.paletteData);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.diagram-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
}

.palette {
  display: inline-block;
  min-width: 100px;
  width: 19vw;
  height: 550px;
  border: 1px solid #777;
  margin-right: 5px;
}

.diagram {
  display: inline-block;
  width: 100%;
  height: 550px;
  border: 1px solid #777;
}
</style>
