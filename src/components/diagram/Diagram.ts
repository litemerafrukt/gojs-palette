import * as go from "gojs";

export class Diagram {
  private diagram: go.Diagram | null;

  constructor(
    diagramDivId: string,
    private $: typeof go.GraphObject.make,
    initialNodeData: go.ObjectData[]
  ) {
    this.diagram = $(go.Diagram, diagramDivId);
    this.diagram.nodeTemplate = createNodeTemplate(this.$);
    this.diagram.linkTemplate = createLinkTemplate(this.$);

    this.diagram.undoManager.isEnabled = true;
    this.diagram.toolManager.draggingTool.isGridSnapEnabled = true;

    this.diagram.model.nodeDataArray = initialNodeData;
  }

  destroy() {
    this.diagram = null;
  }
}

function createNodeTemplate($: typeof go.GraphObject.make) {
  return $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "Rectangle",
      { fill: "white" },
      new go.Binding("fill", "color"),
      {
        portId: "",
        fromLinkable: true,
        toLinkable: true,
        cursor: "pointer"
      }
    ),
    $(go.TextBlock, { margin: 5 }, new go.Binding("text", "key"))
  );
}

function createLinkTemplate($: typeof go.GraphObject.make) {
  return $(
    go.Link, // the whole link panel
    $(go.Shape) // the link shape, default black stroke
  );
}
