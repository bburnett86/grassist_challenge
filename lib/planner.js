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

    var moveHere = function(lawnmower, yard) {
        if (lawnmower.heading() === "east") {
            switch (eastPatchType(lawnmower, yard)) {
                case "long_grass":
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                    break;
                case "sidewalk":
                    lawnmower.moveForward();
                    break;
                default:
                    lawnmower.turnLeft();
            }
        } else if (lawnmower.heading() === "north") {
            switch (northPatchType(lawnmower, yard)) {
                case "long_grass":
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                    break;
                case "sidewalk":
                    lawnmower.moveForward();
                    break;
                default:
                    lawnmower.turnLeft();
            }
        } else if (lawnmower.heading() === "south") {
            switch (southPatchType(lawnmower, yard)) {
                case "long_grass":
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                    break;
                case "sidewalk":
                    lawnmower.moveForward();
                    break;
                default:
                    lawnmower.turnLeft();
            }
        } else if (lawnmower.heading() === "west") {
            switch (westPatchType(lawnmower, yard)) {
                case "long_grass":
                    if (lawnmower.rotorEnabled() !== true) {
                        lawnmower.moveForward().startRotor()
                    } else {
                        lawnmower.moveForward();
                    }
                    break;
                case "sidewalk":
                    lawnmower.moveForward();
                    break;
                default:
                    lawnmower.turnLeft();
            }

        }

    };

    var plan = function(lawnmower, yard) {
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
        lawnmower.startRotor()
        while (yard.freshlyCut() != true) {

            while (lawnmower.heading() === "east") {
                moveHere(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
            }
            while (lawnmower.heading() === "north") {
                moveHere(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
            }
            while (lawnmower.heading() === "west") {
                moveHere(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
            }
            while (lawnmower.heading() === "south") {
                moveHere(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
            }
        }

        lawnmower.stopRotor();
    };

    that.moveHere = moveHere;
    that.avoidFlowers = avoidFlowers;
    that.southPatchType = southPatchType;
    that.northPatchType = northPatchType;
    that.westPatchType = westPatchType;
    that.eastPatchType = eastPatchType;
    that.plan = plan;

    return that;
};