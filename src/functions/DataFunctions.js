

import mutationScores from '../data/mutationVector';
import {times, memoize, range} from 'underscore';


export function getCopyNumberValue(copyNumberValue) {
    return (!isNaN(copyNumberValue) && Math.abs(copyNumberValue) === 2) ? 1 : 0;
}

/**
 * https://github.com/nathandunn/XenaGoWidget/issues/5
 * https://github.com/ucscXena/ucsc-xena-client/blob/master/js/models/mutationVector.js#L67
 Can use the scores directly or just count everything that is 4-2, and lincRNA, Complex Substitution, RNA which are all 0.
 * @param effect
 * @param min
 * @returns {*}
 */
function getMutationScore(effect, min) {
    return (mutationScores[effect] >= min) ? 1 : 0;
    // return mutationScores[effect]
}

let getGenePathwayLookup = pathways => {
    let sets = pathways.map(p => new Set(p.gene)),
        idxs = range(sets.length);
    return memoize(gene => idxs.filter(i => sets[i].has(gene)));
};

/**
 * For each expression result, for each gene listed, for each column represented in the pathways, populate the appropriate samples
 *
 * @param expression
 * @param copyNumber
 * @param geneList
 * @param pathways
 * @param samples
 * @param filter
 * @param min
 * @returns {any[]}
 */
export function associateData(expression, copyNumber, geneList, pathways, samples, filter, min) {
    filter = filter.indexOf('All') === 0 ? '' : filter;
    let returnArray = times(pathways.length, () => times(samples.length, () => 0))
    let sampleIndex = new Map(samples.map((v, i) => [v, i]));
    let genePathwayLookup = getGenePathwayLookup(pathways);

    // TODO: we should lookup the pathways and THEN the data, as opposed to looking up and then filtering
    if (!filter || filter === 'Mutation') {
        for (let row of expression.rows) {
            let effectValue = getMutationScore(row.effect, min);
            let pathwayIndices = genePathwayLookup(row.gene);

            for (let index of pathwayIndices) {
                returnArray[index][sampleIndex.get(row.sample)] += effectValue;
            }
        }
    }


    if (!filter || filter === 'Copy Number') {

        // get list of genes in identified pathways
        for (let gene of geneList) {
            // if we have not processed that gene before, then process
            let geneIndex = geneList.indexOf(gene);

            let pathwayIndices = genePathwayLookup(gene);
            let sampleEntries = copyNumber[geneIndex]; // set of samples for this gene
            // we retrieve proper indices from the pathway to put back in the right place

            // get pathways this gene is involved in
            for (let index of pathwayIndices) {
                // process all samples
                for (let sampleEntryIndex in sampleEntries) {
                    let returnValue = getCopyNumberValue(sampleEntries[sampleEntryIndex]);
                    if (returnValue > 0) {
                        returnArray[index][sampleEntryIndex] += returnValue;
                    }
                }
            }
        }

    }

    return returnArray;
}
