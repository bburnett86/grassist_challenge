GRASSIST.planner = function() {
    var that = {};

    // Start Lawnmower
    var startLawnmower = function(lawnmower, yard) {
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
    }

    // Surroundings
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

    // Basic Movement
    var longGrassMovement = function(lawnmower) {
        if (lawnmower.rotorEnabled() !== true) {
            lawnmower.moveForward().startRotor()
        } else {
            lawnmower.moveForward();
        }
    }

    var mulchGravelMovement = function(lawnmower) {
        if (lawnmower.rotorEnabled()) {
            lawnmower.stopRotor().moveForward()
        } else {
            lawnmower.moveForward();
        }
    }

    // Directional Movement

    var eastMovement = function(lawnmower, yard) {
        switch (eastPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            default:
                lawnmower.turnLeft().turnLeft();
        }
    }

    var northMovement = function(lawnmower, yard) {
        switch (northPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            default:
                lawnmower.turnRight();
        }
    }

    var westMovement = function(lawnmower, yard) {
        switch (westPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            case "short_grass":
            case "sidewalk":
                lawnmower.moveForward();
                break;
            default:
                lawnmower.turnRight();
        }
    }



    // Plan
    var plan = function(lawnmower, yard) {
        debugger;
        startLawnmower(lawnmower, yard);
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                eastMovement(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }

            }
            while (lawnmower.heading() === "north") {
                northMovement(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
                lawnmower.turnRight();
            }
            while (lawnmower.heading() === "west") {
                westMovement(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }

            }
            // while (lawnmower.heading() === "south") {
            //     switch (southPatchType(lawnmower, yard)) {
            //         case "long_grass":
            //             if (lawnmower.rotorEnabled() !== true) {
            //                 lawnmower.moveForward().startRotor()
            //             } else {
            //                 lawnmower.moveForward();
            //             }
            //             break;
            //         case "sidewalk":
            //             lawnmower.moveForward();
            //             break;
            //         default:
            //             lawnmower.turnLeft();
            //     }
            //     seenArray.push(lawnmower.position().join())
            //     if (yard.freshlyCut()) {
            //         break;
            //     }
            // }
        }

        lawnmower.stopRotor();
    };




    that.plan = plan;

    return that;
};