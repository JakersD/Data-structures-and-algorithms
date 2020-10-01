import java.util.LinkedList;
import java.util.List;

public class TwoBeam {
    private static twoBeamPoint start;
    private static twoBeamPoint finish;
    private int alpha;
    private int beta;


    public TwoBeam(Location start, Location finish)
    {
        this.start = new twoBeamPoint(start);
        this.finish = new twoBeamPoint(finish);
        AandB();
        setDirections();
    }

    private void setDirections() {
        if (alpha == 0)
            start.setXStep(1);
        else
            start.setXStep(-1);
        if (beta == 0)
            start.setYStep(1);
        else
            start.setYStep(-1);
        finish.setXStep(start.getXStep() * -1);
        finish.setYStep(start.getYStep() * -1);
    }

    private void AandB() {
        if (start.getLocation().xCoord - finish.getLocation().xCoord >= 0)
            alpha = 1;
        else
            alpha = 0;
        if (start.getLocation().yCoord - finish.getLocation().yCoord >=0)
            beta = 1;
        else
            beta = 0;
    }

    public static List<Location> Path(Map2D map)
    {
        twoBeamPoint.setMap(map);
        while (!checkIntersect() && !invalid())
        {
            start.takeNextStep();
            finish.takeNextStep();
        }
        return getAllPoints();
    }

    private static boolean checkIntersect() {
        List<Location> startXBeam = start.getXBeam().getVisited();
        List<Location> startYBeam = start.getYBeam().getVisited();
        List<Location> finishXBeam = finish.getXBeam().getVisited();
        List<Location> finishYBeam = finish.getYBeam().getVisited();

        for (Location loc : startXBeam) {
            if (finishXBeam.contains(loc))
            {
                start.getXBeam().setIntersected(startXBeam.subList(0, startXBeam.indexOf(loc) + 1));
                finish.getXBeam().setIntersected(finishXBeam.subList(0, finishXBeam.indexOf(loc) + 1));
                return true;
            }
            if (finishYBeam.contains(loc))
            {
                start.getXBeam().setIntersected(startXBeam.subList(0, startXBeam.indexOf(loc) + 1));
                finish.getYBeam().setIntersected(finishYBeam.subList(0, finishYBeam.indexOf(loc) + 1));
                return true;
            }
        }
        for (Location loc : startYBeam) {
            if (finishXBeam.contains(loc))
            {
                start.getYBeam().setIntersected(startYBeam.subList(0, startYBeam.indexOf(loc) + 1));
                finish.getXBeam().setIntersected(finishXBeam.subList(0, finishXBeam.indexOf(loc) + 1));
                return true;
            }
            if (finishYBeam.contains(loc))
            {
                start.getYBeam().setIntersected(startYBeam.subList(0, startYBeam.indexOf(loc) + 1));
                finish.getYBeam().setIntersected(finishYBeam.subList(0, finishYBeam.indexOf(loc) + 1));
                return true;
            }
        }
        return false;
    }

    public List<Location> getAllIntersected()
    {
        List<Location> allPoints = new LinkedList<Location>(start.getXBeam().getIntersected());
        allPoints.addAll(start.getYBeam().getIntersected());
        allPoints.addAll(finish.getXBeam().getIntersected());
        allPoints.addAll(finish.getYBeam().getIntersected());
        return allPoints;
    }

    public twoBeamPoint getStart() {
        return start;
    }
    public twoBeamPoint getFinish() {
        return finish;
    }

    private static List<Location> getAllPoints() {
        List<Location> allPoints = new LinkedList<Location>(start.getXBeam().getVisited());
        allPoints.addAll(start.getYBeam().getVisited());
        allPoints.addAll(finish.getXBeam().getVisited());
        allPoints.addAll(finish.getYBeam().getVisited());
        return allPoints;
    }

    private static boolean invalid() {
        return start.getXBeam().stopped() && start.getYBeam().stopped()
                && finish.getXBeam().stopped() && finish.getYBeam().stopped();
    }
}
