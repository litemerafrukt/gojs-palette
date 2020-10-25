import * as go from "gojs";

export class Palette {
  private palette: go.Palette | null;

  constructor(
    paletteDivId: string,
    private $: typeof go.GraphObject.make,
    initialNodeData: go.ObjectData[]
  ) {
    this.palette = $(go.Palette, paletteDivId);
    this.palette.nodeTemplate = createNodeTemplate(this.$);

    this.palette.model.nodeDataArray = initialNodeData;
  }

  destroy() {
    this.palette = null;
  }
}

function createNodeTemplate($: typeof go.GraphObject.make) {
  return $(
    go.Node,
    "Horizontal",
    $(
      go.Shape,
      { width: 14, height: 14, fill: "white" },
      new go.Binding("fill", "color")
    ),
    $(go.TextBlock, new go.Binding("text", "color"))
  );
}
