export function dice(wichtelArray) {
    let maxRounds = 1000;
    while (maxRounds > 0) {
        let finalWichtels = wichtelArray.map(w => ({
            index: w.index,
            name: w.name,
            gruppe: w.gruppe,
            isWichtelFor: null,
            hasWichtel: null
        }));
        // for each wichtel, find another wichtel that
        // makes him a present (hasWichtel):
        let allDone = true;
        // Shuffle array index order, to add more randomness:
        let indices = shuffleArray([...finalWichtels.keys()]);
        for (let i = 0; i < indices.length; i++) {
            let actWichtel = finalWichtels[indices[i]];
            let hisWichtel = findRandomFreeWichtelFor(
                actWichtel,
                finalWichtels
            );
            if (!hisWichtel) {
                allDone = false;
                break;
            }
            actWichtel.hasWichtel = hisWichtel.index;
            hisWichtel.isWichtelFor = actWichtel.index;
        }
        maxRounds--;
        if (allDone) {
            return finalWichtels;
        }
    }

    throw new Error("No possible arrangement found in 1000 rounds.");
}

/**
 * Finds a random free wichtel that is not yet a wichtel,
 * and that do not conflict with the given wichtel (that is, not in the same group)
 *
 * @param {Array} wichtel
 */
function findRandomFreeWichtelFor(wichtel, wichtels) {
    let possibleWichtels = wichtels.filter(
        w =>
            // not himself
            w !== wichtel &&
            // is not a wichtel for anyone
            w.isWichtelFor === null &&
            // is not in the same group as the given wichtel
            (!w.gruppe || w.gruppe !== wichtel.gruppe)
    );
    if (possibleWichtels.length > 0) {
        let randIndex = Math.min(
            possibleWichtels.length - 1,
            Math.floor(Math.random() * possibleWichtels.length)
        );
        return possibleWichtels[randIndex];
    } else {
        return null;
    }
}

function shuffleArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        let rndIndex = Math.round(Math.random() * (arr.length - 1));
        let tmp = arr[i];
        arr[i] = arr[rndIndex];
        arr[rndIndex] = tmp;
    }
    return arr;
}

export function saveState(state) {
    localStorage.setItem("wichtelomat.state", JSON.stringify(state));
}

export function loadState() {
    return JSON.parse(localStorage.getItem("wichtelomat.state") || {});
}

export function findWichtelByIndex(index, wichtels) {
    if (!wichtels) return null;
    for (let i = 0; i < wichtels.length; i++) {
        if (wichtels[i].index === index) {
            return wichtels[i];
        }
    }
    return null;
}
