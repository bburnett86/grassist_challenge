GRASSIST.planner = function() {
    var that = {};

    // Start Lawnmower
    var startLawnmower = function(lawnmower, yard) {
        furthestSouth(lawnmower, yard)
        if (yard.patchType(lawnmower.position()[0], lawnmower.position()[1]) === "long_grass") {
            lawnmower.startRotor()
        }
        lawnmower.addToSeen(lawnmower.position().join())
    }

    var furthestSouth = function(lawnmower, yard) {
        if (lawnmower.position()[1] - 1 > 0) {
            lawnmower.turnRight();
            while (southPatchType(lawnmower, yard) === "long_grass" || southPatchType(lawnmower, yard) === "short_grass" || southPatchType(lawnmower, yard) === "mulch_gravel" || southPatchType(lawnmower, yard) === "sidewalk") {
                southMovement(lawnmower, yard);
                lawnmower.removeFromSeen(lawnmower.position()[0] + "," + (lawnmower.position()[1] - 1));
            }
            southMovement(lawnmower, yard);
            lawnmower.removeFromSeen(lawnmower.position()[0] + "," + (lawnmower.position()[1]));
            lawnmower.turnLeft();
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

    // Tracking

    var lawnmowerSeen = function(lawnmower) {
        if (!lawnmower.seenAlready(lawnmower.position().join())) {
            lawnmower.addToSeen(lawnmower.position().join())
        }
    }

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
        lawnmowerSeen(lawnmower);
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
        lawnmowerSeen(lawnmower);
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
        lawnmowerSeen(lawnmower);
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

    var southMovement = function(lawnmower, yard) {
        lawnmowerSeen(lawnmower);
        switch (westPatchType(lawnmower, yard)) {
            case "long_grass":
                longGrassMovement(lawnmower);
                break;
            case "mulch_gravel":
                mulchGravelMovement(lawnmower);
                break;
            default:
                lawnmower.moveForward();
        }
    }

    //Advanced Movement
    var avoidFlowerEast = function(lawnmower, yard) {
        debugger;
        lawnmower.turnRight();
        while (eastPatchType(lawnmower, yard) === "plant_flower") {
            if (southPatchType(lawnmower, yard) === "plant_flower") {
                avoidFlowerSouth(lawnmower, yard);
                return
            } else {
                southMovement(lawnmower, yard);
            }
        }
        lawnmower.turnLeft();
        eastMovement(lawnmower, yard)
        while (northPatchType(lawnmower, yard) === "plant_flower") {
            if (eastPatchType(lawnmower, yard) === "plant_flower") {
                return;
            }
            eastMovement(lawnmower, yard);
        }
        lawnmower.turnLeft();
        while (northPatchType(lawnmower, yard) !== "long_grass") {
            northMovement(lawnmower, yard);
        }
        northMovement(lawnmower, yard)
        lawnmower.turnRight();
    };

    var avoidFlowerWest = function(lawnmower, yard) {
        debugger;
        lawnmower.turnLeft().turnLeft();
        while (eastPatchType(lawnmower, yard) !== undefined) {
            eastMovement(lawnmower, yard);
        }
        lawnmower.turnRight();
        while (lawnmower.seenAlready(lawnmower.position()[0].toString() + "," + (lawnmower.position()[1] - 1))) {
            southMovement(lawnmower, yard);
        }
        lawnmower.turnRight();
        while (westPatchType(lawnmower, yard) !== undefined) {
            westMovement(lawnmower, yard);
        }
        lawnmower.turnRight();
    };

    var avoidFlowerSouth = function(lawnmower, yard) {
        debugger;
        lawnmower.turnRight();
        while (southPatchType(lawnmower, yard) === "plant_flower") {
            westMovement(lawnmower, yard);
        }
        lawnmower.turnLeft();
        southMovement(lawnmower, yard);
        while (eastPatchType(lawnmower, yard) === "plant_flower") {
            southMovement(lawnmower, yard);
        }
        lawnmower.turnLeft()
        eastMovement(lawnmower, yard)
        while (northPatchType(lawnmower, yard) === "plant_flower") {
            eastMovement(lawnmower, yard)
        }
        lawnmower.turnLeft()
        while (northPatchType(lawnmower, yard) !== "long_grass") {
            if (northPatchType(lawnmower, yard) === "plant_flower") {
                avoidFlowerNorth(lawnmower, yard);
            } else {
                northMovement(lawnmower, yard);
            }
        }
    }

    var avoidFlowerNorth = function(lawnmower, yard) {
        debugger;
        lawnmower.turnRight();
        while (northPatchType(lawnmower, yard) === "plant_flower") {
            if (eastPatchType(lawnmower, yard) === "plant_flower") {
                return
            } else {
                eastMovement(lawnmower, yard);
            }
        }
        lawnmower.turnLeft();
        while (northPatchType(lawnmower, yard) !== "long_grass") {
            if (northPatchType(lawnmower, yard) === "plant_flower") {
                return;
            } else {
                northMovement(lawnmower, yard);
            }
        }
    }


    // Plan
    var plan = function(lawnmower, yard) {
        furthestSouth(lawnmower, yard);
        startLawnmower(lawnmower, yard);
        lawnmower.addToSeen(lawnmower.position().join());
        while (yard.freshlyCut() != true) {
            while (lawnmower.heading() === "east") {
                if (eastPatchType(lawnmower, yard) === "plant_flower") {
                    avoidFlowerEast(lawnmower, yard);
                } else {
                    eastMovement(lawnmower, yard);
                }
                if (yard.freshlyCut()) {
                    break;
                }
            }
            while (lawnmower.heading() === "west") {
                if (westPatchType(lawnmower, yard) === "plant_flower") {
                    avoidFlowerWest(lawnmower, yard);
                } else {
                    westMovement(lawnmower, yard);
                }
                if (yard.freshlyCut()) {
                    break;
                }

            }
            while (lawnmower.heading() === "north") {
                while (lawnmower.seenAlready(lawnmower.position()[0].toString() + "," + (lawnmower.position()[1] + 1).toString())) {
                    northMovement(lawnmower, yard);
                }
                northMovement(lawnmower, yard);
                if (yard.freshlyCut()) {
                    break;
                }
                lawnmower.turnRight();
            }
        }
        lawnmower.stopRotor();
    };

    that.seenArray = [];
    that.plan = plan;

    return that;
};