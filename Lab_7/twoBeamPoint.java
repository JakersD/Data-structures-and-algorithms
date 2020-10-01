import java.util.LinkedList;
import java.util.List;


public class twoBeamPoint {
    private int xStep;
    private int yStep;
    private Beam xBeam;
    private Beam yBeam;
    private Location loc;
    private static Map2D map;

    public static void setMap(Map2D map2D) {
        map = map2D;
    }

    public Beam getXBeam() {
        return xBeam;
    }

    public Beam getYBeam() {
        return yBeam;
    }


    public static class Beam {

        private List<Location> visited = new LinkedList<Location>();
        private List<Location> intersected = new LinkedList<Location>();
        private Location current;
        private boolean end = false;

        public Beam(Location loc)
        {
            current = new Location(loc.xCoord, loc.yCoord);
        }
        public void takeStep(int xStep, int yStep, int priority)
        {
            if (end)
                return;

            visited.add(new Location(current.xCoord, current.yCoord));

            if (priority == 1)
            {
                if (current.xCoord + xStep < 0 || current.xCoord + xStep > map.getWidth() - 1)
                {
                    end = true;
                    return;
                }
                if (map.getCellValue(current.xCoord + xStep, current.yCoord) != 0)
                {
                    if (current.yCoord + yStep <0 || current.yCoord + yStep > map.getHeight() - 1)
                    {
                        end = true;
                        return;
                    }
                    if (map.getCellValue(current.xCoord, current.yCoord + yStep) != 0)
                    {
                        end = true;
                        return;
                    }

                    current.yCoord += yStep;
                    return;
                }
                current.xCoord += xStep;
            }
            else
            {
                if (current.yCoord + yStep <0 || current.yCoord + yStep > map.getHeight() - 1)
                {
                    end = true;
                    return;
                }
                if (map.getCellValue(current.xCoord, current.yCoord + yStep) != 0)
                {
                    if (current.xCoord + xStep <0 || current.xCoord + xStep > map.getWidth() - 1)
                    {
                        end = true;
                        return;
                    }
                    if (map.getCellValue(current.xCoord + xStep, current.yCoord) != 0)
                    {
                        end = true;
                        return;
                    }

                    current.xCoord += xStep;
                    return;
                }

                current.yCoord += yStep;
            }

        }

        public List<Location> getVisited() {
            return visited;
        }

        public List<Location> getIntersected() {
            return intersected;
        }

        public void setIntersected(List<Location> list) {
            intersected = list;
        }

        public boolean stopped() {
            return end;
        }
    }

    public twoBeamPoint(Location loc)
    {
        this.loc = loc;
        xBeam = new Beam(loc);
        yBeam = new Beam(loc);
    }

    public void setLocation(Location loc) {
        this.loc = loc;
    }

    public Location getLocation() {
        return loc;
    }

    public void setXStep(int value) {
        xStep = value;
    }

    public void setYStep(int value) {
        yStep = value;
    }

    public int getXStep() {
        return xStep;
    }
    public int getYStep() {
        return yStep;
    }

    public void takeNextStep() {
        xBeam.takeStep(xStep, yStep, 1);
        yBeam.takeStep(xStep, yStep, 2);

    }
}
