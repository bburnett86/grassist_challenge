GRASSIST.planner = function() {
    var that = {};

    var eastPatchType = function(lawnmower, yard) {
        return yard.patchType((lawnmower.position()[0] + 1), lawnmower.position()[1])
    };
    var westPatchType = function(lawnmower, yard) {
        return yard.patchType((lawnmower.position()[0] - 1), lawnmower.position()[1])
    };
    var northPatchType = function(lawnmower, yard) {
        return (lawnmower.position()[1] + 1 < yard.size()[1] ? yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] + 1)) : undefined)
    };
    var southPatchType = function(lawnmower, yard) {
        return (lawnmower.position()[1] - 1 > 0 ? yard.patchType(lawnmower.position()[0], (lawnmower.position()[1] - 1)) : undefined)
    };

    var plan = function(lawnmower, yard) {
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
        lawnmower.startRotor()
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                if (eastPatchType(lawnmower, yard) === "long_grass") {
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
                if (northPatchType(lawnmower, yard) === "long_grass") {
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
                if (westPatchType(lawnmower, yard) === "long_grass") {
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
                if (southPatchType(lawnmower, yard) === "long_grass") {
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

    that.southPatchType = southPatchType;
    that.northPatchType = northPatchType;
    that.westPatchType = westPatchType;
    that.eastPatchType = eastPatchType;
    that.plan = plan;

    return that;
};