GRASSIST.planner = function() {
    var that = {};

    var plan = function(lawnmower, yard) {
        lawnmower.startRotor()
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                if (yard.patchType((lawnmower.position()[0] + 1), lawnmower.position()[1]) === "long_grass") {
                    lawnmower.moveForward();
                } else {
                    lawnmower.turnLeft();
                }

            }
            while (lawnmower.heading() === "north") {
                if (((lawnmower.position()[1] + 1) < yard.size()[1]) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] + 1)) === "long_grass")) {
                    lawnmower.moveForward();
                } else {
                    lawnmower.turnLeft();
                }
            }
            while (lawnmower.heading() === "west") {
                if (yard.patchType((lawnmower.position()[0] - 1), lawnmower.position()[1]) === "long_grass") {
                    lawnmower.moveForward();
                } else {
                    lawnmower.turnLeft();
                }

            }
            while (lawnmower.heading() === "south") {

                if (((lawnmower.position()[1] - 1) > 0) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] - 1)) === "long_grass")) {
                    lawnmower.moveForward();
                } else {
                    lawnmower.turnLeft();
                }
            }
        }

        lawnmower.stopRotor();
    };

    that.plan = plan;

    return that;
};