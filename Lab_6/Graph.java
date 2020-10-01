import javax.swing.JFrame;

import com.mxgraph.swing.mxGraphComponent;
import com.mxgraph.view.mxGraph;

public class Graph extends JFrame {

    public Graph(int[][] matrix) {
        mxGraph graph = new mxGraph();
        Object defaultParent = graph.getDefaultParent();
        graph.getModel().beginUpdate();

        graph.getModel().endUpdate();
        mxGraphComponent graphComponent = new mxGraphComponent(graph);
        getContentPane().add(graphComponent);
        Object ids[] = new Object[matrix.length];

        for (int i = 1; i < matrix.length; i++)
            ids[i] = graph.insertVertex(defaultParent, null, i, 100 + (i * 100), 100, 50, 50, "strokeColor=red");

        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                if (matrix[i][j] != 0 && matrix[i][j] != 999)
                    graph.insertEdge(defaultParent, null, matrix[i][j], ids[i], ids[j]);
            }
        }

        graph.setCellsEditable(false);
        graph.setCellsMovable(true);
        graph.setCellsResizable(false);
        graph.setCellsSelectable(true);
        graph.setEnabled(false);
        graphComponent.setConnectable(false);
    }

}
