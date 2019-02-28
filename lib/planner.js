GRASSIST.planner = function() {
    var that = {};

    var plan = function(lawnmower, yard) {
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
        lawnmower.startRotor()
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                if (yard.patchType((lawnmower.position()[0] + 1), lawnmower.position()[1]) === "long_grass") {
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                } else {
                    lawnmower.turnLeft();
                }
                if (yard.freshlyCut()) {
                    break;
                }

            }
            while (lawnmower.heading() === "north") {
                if (((lawnmower.position()[1] + 1) < yard.size()[1]) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] + 1)) === "long_grass")) {
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                } else {
                    lawnmower.turnLeft();
                }
                if (yard.freshlyCut()) {
                    break;
                }
            }
            while (lawnmower.heading() === "west") {
                if (yard.patchType((lawnmower.position()[0] - 1), lawnmower.position()[1]) === "long_grass") {
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                } else {
                    lawnmower.turnLeft();
                }
                if (yard.freshlyCut()) {
                    break;
                }

            }
            while (lawnmower.heading() === "south") {

                if (((lawnmower.position()[1] - 1) > 0) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] - 1)) === "long_grass")) {
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                } else {
                    lawnmower.turnLeft();
                }
                if (yard.freshlyCut()) {
                    break;
                }
            }
        }

        lawnmower.stopRotor();
    };

    that.plan = plan;

    return that;
};