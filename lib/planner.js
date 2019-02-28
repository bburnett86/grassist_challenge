GRASSIST.planner = function() {
    var that = {};

    var plan = function(lawnmower, yard) {
        while (yard.freshlyCut() != true) {
            if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
                lawnmower.startRotor()
            } else {
                lawnmower.moveForward().startRotor()
            }
            lawnmower.startRotor()
            while (lawnmower.heading() === "east") {
                switch (yard.patchType((lawnmower.position()[0] + 1), lawnmower.position()[1])) {
                    case "long_grass":
                    case "sidewalk":
                        lawnmower.moveForward();
                        if (lawnmower.rotorEnabled() == false) {
                            lawnmower.startRotor();
                        }
                        break;
                    case "mulch_gravel":
                        if (lawnmower.rotorEnabled() == true) {
                            lawnmower.stopRotor();
                        }
                        lawnmower.moveForward();
                        break;
                    case "plant_flower":
                    default:
                        lawnmower.turnLeft();
                }

            }
            while (lawnmower.heading() === "north") {
                if (((lawnmower.position()[1] + 1) < yard.size()[1]) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] + 1)) === "long_grass")) {
                    lawnmower.moveForward();
                    if (lawnmower.rotorEnabled() == false) {
                        lawnmower.startRotor();
                    }
                } else if (((lawnmower.position()[1] + 1) < yard.size()[1]) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] + 1)) === "mulch_gravel")) {
                    if (lawnmower.rotorEnabled() == true) {
                        lawnmower.stopRotor();
                    }
                    lawnmower.moveForward();
                } else {
                    lawnmower.turnLeft();
                }
            }
            while (lawnmower.heading() === "west") {
                switch (yard.patchType((lawnmower.position()[0] - 1), lawnmower.position()[1])) {
                    case "long_grass":
                    case "sidewalk":
                        lawnmower.moveForward();
                        if (lawnmower.rotorEnabled() == false) {
                            lawnmower.startRotor();
                        }
                        break;
                    case "mulch_gravel":
                        if (lawnmower.rotorEnabled() == true) {
                            lawnmower.stopRotor();
                        }
                        lawnmower.moveForward();
                        break;
                    case "plant_flower":
                    default:
                        lawnmower.turnLeft();
                }

            }
            while (lawnmower.heading() === "south") {
                debugger;
                if (((lawnmower.position()[1]) >= 1) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] - 1)) === "long_grass")) {
                    lawnmower.moveForward();
                    if (lawnmower.rotorEnabled() == false) {
                        lawnmower.startRotor();
                    }
                } else if (((lawnmower.position()[1]) >= 1) && (yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] - 1)) === "mulch_gravel")) {
                    if (lawnmower.rotorEnabled() == true) {
                        lawnmower.stopRotor();
                    }
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