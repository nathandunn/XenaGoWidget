import React from 'react'
import PureComponent from './PureComponent';
import XenaGoViewer from './XenaGoViewer';
import DefaultPathWays from "../data/genesets/tgac";
import PathwayEditor from "./pathwayEditor/PathwayEditor";
import {AppStorageHandler} from "../service/AppStorageHandler";
import NavigationBar from "./NavigationBar";
import {GeneSetSelector} from "./GeneSetSelector";
import {
    calculateAllPathways, calculateDiffs,
} from '../functions/DataFunctions';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import FaArrowRight from 'react-icons/lib/fa/arrow-right';
import BaseStyle from '../css/base.css';
import {LabelTop} from "./LabelTop";
import VerticalGeneSetScoresView from "./VerticalGeneSetScoresView";
import {ColorEditor} from "./ColorEditor";
import {Dialog} from "react-toolbox";
import {fetchCombinedCohorts} from "../functions/FetchFunctions";

let Rx = require('ucsc-xena-client/dist/rx');

let xenaQuery = require('ucsc-xena-client/dist/xenaQuery');
let {sparseDataMatchPartialField, refGene} = xenaQuery;
import CrossHairH from "./CrossHairH";
import CrossHairV from "./CrossHairV";
import {fetchCohortData} from "../functions/CohortFunctions";
import {isEqual} from "underscore";



export const XENA_VIEW = 'xena';
export const PATHWAYS_VIEW = 'pathways';
const VIEWER_HEIGHT = 500;

const VERTICAL_SELECTOR_WIDTH = 220;
const VERTICAL_GENESET_DETAIL_WIDTH = 180;
const VERTICAL_GENESET_SUPPRESS_WIDTH = 20;
const ARROW_WIDTH = 20;
const BORDER_OFFSET = 2;

export const MIN_FILTER = 2;


export const LABEL_A = 'A';
export const LABEL_B = 'B';

export const MIN_GENE_WIDTH_PX = 80;// 8 or less
export const MAX_GENE_WIDTH = 85;
export const MAX_GENE_LAYOUT_WIDTH_PX = 12 * MAX_GENE_WIDTH; // 85 genes

const LOAD_STATE = {
    UNLOADED: 'unloaded',
    LOADING: 'loading',
    LOADED: 'loaded',
};

let currentLoadState = LOAD_STATE.UNLOADED ;

/**
 * refactor that from index
 */
export default class XenaGeneSetApp extends PureComponent {


    constructor(props) {
        super(props);

        // let pathways = this.getActiveApp().pathway;
        const pathways = AppStorageHandler.getPathways();
        const apps = AppStorageHandler.getAppData(pathways);
        const cohortData = fetchCohortData();

        this.state = {
            apps,
            selectedCohortA:undefined,
            selectedCohortB:undefined,
            view: XENA_VIEW,
            cohortData,
            loading:LOAD_STATE.UNLOADED,
            // view: PATHWAYS_VIEW,
            showColorEditor: false,
            showDetailLayer: true,
            showClusterSort: false,
            showDiffLayer: true,
            pathwaySet: {
                name: 'Default Pathway',
                pathways,
                selected: true
            },
            hoveredPathways: [],
            selectedPathway: undefined,
            geneData: [{}, {}],
            pathwayData: [{}, {}],
            showPathwayDetails: false,
            geneHits: [],
            selectedGene: undefined,
            reference: refGene['hg38'],
            limit: 25,
            highlightedGene: undefined,
            collapsed: true,
            mousing: false,
            x:-1,
            y:-1,
            geneStateColors: {
                highDomain: 100,
                midDomain: 0,
                lowDomain: -100,
                lowColor: '#0000ff',
                midColor: '#ffffff',
                highColor: '#ff0000',
                gamma: 1.0,
                geneGamma: 1.0,
                linkDomains: true,
                shadingValue: 10,
            }
        };
        // this.setState({
        //     apps: apps
        // });
    }

    queryGenes = (geneQuery) => {
        let {reference: {host, name}, limit} = this.state;
        if (geneQuery.trim().length === 0) {
            this.setState({
                geneHits: []
            });
            return;
        }
        let subscriber = sparseDataMatchPartialField(host, 'name2', name, geneQuery, limit);
        subscriber.subscribe(matches => {
                this.setState({
                    geneHits: matches
                })
            }
        )
    };


    handleUpload = (file) => {
        AppStorageHandler.storePathways(file);
        this.setState({
            pathwaySet: {
                name: 'Default Pathway',
                pathways: file,
                selected: true
            }
        })
    };

    handleReset = () => {
        AppStorageHandler.storePathways(DefaultPathWays);
        this.setState({
            pathwaySet: {
                name: 'Default Pathway',
                pathways: DefaultPathWays,
                selected: true
            }
        })
    };

    handleCombinedCohortData = (input) => {
        let {
            pathways,
            geneList,
            cohortData,

            samplesA,
            mutationsA,
            copyNumberA,
            genomeBackgroundMutationA,
            genomeBackgroundCopyNumberA,
            cohortA,
            selectedObjectA,
            samplesB,
            mutationsB,
            copyNumberB,
            genomeBackgroundMutationB,
            genomeBackgroundCopyNumberB,
            cohortB,
            selectedObjectB,
        } = input;

        // TODO: calculate Diff!
        // TODO: update Xena Go Viewers

        let pathwayDataA = {
            geneList,
            pathways,
            cohortData,
            cohort: cohortA,
            filter: AppStorageHandler.getFilterState(0),

            copyNumber: copyNumberA,
            expression: mutationsA,
            samples: samplesA,
            genomeBackgroundMutation: genomeBackgroundMutationA,
            genomeBackgroundCopyNumber: genomeBackgroundCopyNumberA,
            selectedObject: selectedObjectA
        };


        let pathwayDataB = {
            geneList,
            pathways,
            cohortData,
            cohort: cohortB,
            filter: AppStorageHandler.getFilterState(1),

            copyNumber: copyNumberB,
            expression: mutationsB,
            samples: samplesB,
            genomeBackgroundMutation: genomeBackgroundMutationB,
            genomeBackgroundCopyNumber: genomeBackgroundCopyNumberB,
            selectedObject: selectedObjectB
        };

        // console.log('input data',pathwayDataA,pathwayDataB,JSON.stringify(pathways))
        pathways = calculateAllPathways(pathwayDataA,pathwayDataB);
        // console.log('output data',JSON.stringify(pathways),pathways)
        // pathways = calculateDiffs(pathways,pathways);
        // console.log('output diffs ',JSON.stringify(pathways),pathways)



        pathwayDataA.pathways = pathways ;
        pathwayDataB.pathways = pathways ;

        AppStorageHandler.storePathways(pathways);



        let selection = AppStorageHandler.getPathwaySelection();


        currentLoadState = LOAD_STATE.LOADED;
        this.setState({
            pathwaySelection: selection,
            geneList,
            cohortData,
            pathways,
            pathwayDataA,
            pathwayDataB,
            selectedObjectA,
            selectedObjectB,
            loading: LOAD_STATE.LOADED,
            processing: false,
        });

        // TODO: replace with setting the proper state that gets inherited by XenaGoViewer
        // console.log('ref loaded',selection)
        // if (selection.pathway) {
        //     let refLoaded = this.refs['xena-go-app-0'] && this.refs['xena-go-app-1'];
        //     if(refLoaded){
        //         // console.log('XGSA handledCombined',JSON.stringify(selection.selectedPathway),JSON.stringify(selection))
        //         for (let index = 0; index < this.state.apps.length; index++) {
        //             let ref = this.refs['xena-go-app-' + index];
        //             ref.setPathwayState(selection.selectedPathway, selection);
        //         }
        //     }
        //     else{
        //         console.log('ref NOT loaded')
        //     }
        // }

        // if (this.state.selectedPathway.length > 0) {
        //     this.setPathwayState(this.state.selectedPathway, this.state.pathwayClickData)
        // }


    };

    addGeneSet = (selectedPathway) => {
        let selectedPathwaySet = JSON.parse(JSON.stringify(this.state.pathwaySet));
        let newGeneSetObject = {
            goid: '',
            golabel: selectedPathway,
            gene: []
        };
        console.log('gene set to add',JSON.stringify(selectedPathway))
        console.log('input pathway set',JSON.stringify(selectedPathwaySet))
        selectedPathwaySet.pathways.unshift(newGeneSetObject);
        console.log('output pathway set',JSON.stringify(selectedPathwaySet))

        AppStorageHandler.storePathways(selectedPathwaySet.pathways);

        this.setState({
            pathwaySet: selectedPathwaySet
        });
    };

    addGene = (selectedPathway, selectedGene) => {

        // get geneset to alter
        let selectedPathwaySet = JSON.parse(JSON.stringify(this.state.pathwaySet));

        // get pathway to filter
        let pathwayIndex = selectedPathwaySet.pathways.findIndex(p => selectedPathway.golabel === p.golabel);
        let newSelectedPathway = selectedPathwaySet.pathways.find(p => selectedPathway.golabel === p.golabel);

        selectedPathwaySet.pathways = selectedPathwaySet.pathways.filter(p => selectedPathway.golabel !== p.golabel);

        // remove gene
        newSelectedPathway.gene.unshift(selectedGene);

        // add to the existing index
        selectedPathwaySet.pathways.splice(pathwayIndex, 0, newSelectedPathway);

        AppStorageHandler.storePathways(selectedPathwaySet.pathways);
        this.setState({
            pathwaySet: selectedPathwaySet,
        });

        // TODO: this could be done via a global variable, but specific to the PathwayEditor
        this.refs['pathway-editor'].selectedPathway(newSelectedPathway);
    };

    removeGene = (selectedPathway, selectedGene) => {
        let selectedPathwaySet = JSON.parse(JSON.stringify(this.state.pathwaySet));
        // get pathway to filter
        let pathwayIndex = selectedPathwaySet.pathways.findIndex(p => selectedPathway.golabel === p.golabel);
        let newSelectedPathway = selectedPathwaySet.pathways.find(p => selectedPathway.golabel === p.golabel);
        selectedPathwaySet.pathways = selectedPathwaySet.pathways.filter(p => selectedPathway.golabel !== p.golabel);

        // remove gene
        newSelectedPathway.gene = newSelectedPathway.gene.filter(g => g !== selectedGene);

        // add to the existing index
        selectedPathwaySet.pathways.splice(pathwayIndex, 0, newSelectedPathway);
        AppStorageHandler.storePathways(selectedPathwaySet.pathways);
        this.setState({
            pathwaySet: selectedPathwaySet,
        });

        // TODO: this could be done via a global variable, but specific to the PathwayEditor
        this.refs['pathway-editor'].selectedPathway(newSelectedPathway);
    };

    removeGeneSet = (selectedPathway) => {
        let selectedPathwaySet = JSON.parse(JSON.stringify(this.state.pathwaySet));
        // removes selected pathway
        selectedPathwaySet.pathways = selectedPathwaySet.pathways.filter(p => selectedPathway.golabel !== p.golabel)
        AppStorageHandler.storePathways(selectedPathwaySet.pathways);
        this.setState({
            pathwaySet: selectedPathwaySet,
            selectedPathway: undefined,
        });
    };

    getActiveApp() {
        return this.state.pathwaySet;
    }

    showPathways = () => {
        this.setState({
            view: PATHWAYS_VIEW
        })
    };

    showXena = () => {
        this.setState({
            view: XENA_VIEW
        })
    };

    editGeneSetColors = () => {
        // alert('configuring xena')
        this.handleColorToggle();
        // this.setState({
        //     view: XENA_VIEW
        // })
    };

    geneHighlight = (geneName) => {
        this.setState(
            {
                highlightedGene: geneName
            }
        );
    };

    geneHover = (geneHover) => {
        this.setState(
            {
                hoveredPathways: geneHover ? geneHover.pathway : {}
            }
        );
        // if (geneHover) {
        //     let myIndex = geneHover.cohortIndex;
        //     this.state.apps.forEach((app, index) => {
        //         if (index !== myIndex) {
        //             this.refs['xena-go-app-' + index].setGeneHover(geneHover.pathway);
        //         }
        //     });
        // }
    };


    globalPathwayHover = (pathwayHover) => {
        this.setState({
            hoveredPathways: pathwayHover
        });

        this.state.apps.forEach((app, index) => {
            if(pathwayHover){
                pathwayHover.samplesAffected = index === 0 ? pathwayHover.firstObserved : pathwayHover.secondObserved;
            }
            this.refs['xena-go-app-' + index].setPathwayHover(pathwayHover);
        });
    };

// populates back to the top
    shareGlobalGeneData = (geneData, cohortIndex) => {
        const isChange = (cohortIndex === 0 && geneData.length!==this.state.geneData[0].length) || (cohortIndex === 1 && geneData.length!==this.state.geneData[1].length);

        let geneData0 = cohortIndex === 0 ? geneData : this.state.geneData[0];
        let geneData1 = cohortIndex === 1 ? geneData : this.state.geneData[1];
        let finalGeneData = calculateDiffs(geneData0, geneData1);

        if(isChange){
            if(geneData0.length>0){
                this.geneHover({
                    pathway:geneData0[0],
                    cohortIndex
                });
            }
            if(geneData1.length>0){
                this.geneHover({
                    pathway:geneData1[0],
                    cohortIndex
                });
            }
        }
        this.setState({
            geneData: finalGeneData
        });
    };

    globalPathwaySelect = (pathwaySelection) => {

        if (pathwaySelection.gene.length === 0) {
            return;
        }
        let selectedPathways = [pathwaySelection.golabel];
        let pathwayClickData = {
            pathway: pathwaySelection
        };

        let newSelect = [pathwaySelection];
        this.setState({
            selectedPathway: newSelect
        });

        pathwaySelection.propagate = false;
        this.state.apps.forEach((app, index) => {
            this.refs['xena-go-app-' + index].setPathwayState(selectedPathways, pathwayClickData);
        });
    };

    getSelectedCohort(pathwayData) {
        if (this.state.cohortData) {
            return this.state.cohortData.find(c => c.name === pathwayData.cohort);
        }
    }


    hideGeneSetDetail = () => {
        this.setState({
            showPathwayDetails: false
        })
    };

    showGeneSetDetail = () => {
        this.setState({
            showPathwayDetails: true
        })
    };

    searchHandler = (geneQuery) => {
        this.queryGenes(geneQuery);
    };

    acceptGeneHandler = (geneName) => {
        if (this.state.view === XENA_VIEW) {
            this.geneHighlight(geneName);
        } else if (this.state.view === PATHWAYS_VIEW) {
            this.pathwayEditorGeneHandler(geneName)
        }
    };

    pathwayEditorGeneHandler = (geneName) => {
        this.refs['pathway-editor'].highlightGenes(geneName)
    };

    handleColorToggle = () => {
        this.setState({showColorEditor: !this.state.showColorEditor});
    };

    handleColorChange = (name, value) => {
        let newArray = JSON.parse(JSON.stringify(this.state.geneStateColors));
        newArray[name] = value;
        this.setState({
            geneStateColors: newArray
        })

    };

    toggleShowDiffLayer = () => {
        this.setState({
            showDiffLayer: !this.state.showDiffLayer
        })
    };

    toggleShowDetailLayer = () => {
        this.setState({
            showDetailLayer: !this.state.showDetailLayer
        })
    };

    toggleShowClusterSort = () => {
        this.setState({
            showClusterSort: !this.state.showClusterSort
        })
    };

    callDownload = (cohortIndex) => {
        this.refs['xena-go-app-' + cohortIndex].callDownload();
    };

    setCollapsed = (collapsed) => {
        this.setState({
            collapsed: collapsed
        })
    };


    doRefetch(){

        switch (currentLoadState) {
            case LOAD_STATE.LOADING:
                return false ;
            case LOAD_STATE.UNLOADED:
                return true ;

                // TODO: this should be calculated below depending on the state of gene data and if the selected cohort changed
            case LOAD_STATE.LOADED:
                return false ;

        }

        if(isEqual(this.state.geneData,[{},{}])) return true ;
        if(isEqual(this.state.pathwayData,[{},{}])) return true ;

        const selectedCohortA = this.state.apps[0].selectedCohort;
        const selectedCohortB = this.state.apps[1].selectedCohort;
        const selectedSubCohortsA = this.state.apps[0].selectedSubCohorts;
        const selectedSubCohortsB = this.state.apps[1].selectedSubCohorts;

        if(!isEqual(selectedCohortA, selectedCohortB)) return true ;
        if(!isEqual(selectedSubCohortsA, selectedSubCohortsB)) return true ;

        return false;
    }

    render() {
        let activeApp = this.getActiveApp();
        let pathways = activeApp.pathways;

        let leftPadding = this.state.showPathwayDetails ? VERTICAL_GENESET_DETAIL_WIDTH - ARROW_WIDTH : VERTICAL_GENESET_SUPPRESS_WIDTH;

        // TODO: returned should do rendering
        if(this.doRefetch()){
            currentLoadState = LOAD_STATE.LOADING;
            console.log('FETCHING');
            fetchCombinedCohorts(this.state.apps[0].selectedCohort,this.state.apps[1].selectedCohort,this.state.cohortData,pathways,this.handleCombinedCohortData);
        }


        // TODO: assess subCohortSelected from selectedCohorts.selectedSubCohorts . . . if it exists
        // fetchCombinedSubCohorts(this.state.apps[0].selectedCohort,this.state.apps[1].selectedCohort,this.state.cohortData)
        // TODO: remove componentDidUpdate


        // 2. based on cohortData, fetch cohorts with subCohorts
        console.log('pawthway set',JSON.stringify(this.state.pathwaySet))
        console.log('selected pawthway set',JSON.stringify(this.state.selectedPathway))



        // console.log('pathway data -- pathways',JSON.stringify(pathways))
        console.log('PW STATE in',JSON.stringify(this.state.pathwaySet))

        return (
            <div>

                <NavigationBar showPathways={this.showPathways}
                               showXena={this.showXena}
                               editGeneSetColors={this.editGeneSetColors}
                               view={this.state.view}
                               searchHandler={this.searchHandler}
                               geneOptions={this.state.geneHits}
                               acceptGeneHandler={this.acceptGeneHandler}
                               downloadRawHandler={this.callDownload}
                               toggleShowDiffLayer={this.toggleShowDiffLayer}
                               toggleShowDetailLayer={this.toggleShowDetailLayer}
                               toggleShowClusterSort={this.toggleShowClusterSort}
                               showDiffLayer={this.state.showDiffLayer}
                               showDetailLayer={this.state.showDetailLayer}
                               showClusterSort={this.state.showClusterSort}
                />

                {this.state.apps &&
                <div>
                    <ColorEditor active={this.state.showColorEditor}
                                 handleToggle={this.handleColorToggle}
                                 handleColorChange={this.handleColorChange}
                                 colorSettings={this.state.geneStateColors}
                    />
                    <Dialog
                        active={this.state.view === PATHWAYS_VIEW }
                        onEscKeyDown={this.showXena}
                        onOverlayClick={this.showXena}
                        title='Edit Pathways'
                    >
                        <PathwayEditor ref='pathway-editor'
                                       pathwaySet={this.state.pathwaySet}
                                       removeGeneHandler={this.removeGene}
                                       removeGeneSetHandler={this.removeGeneSet}
                                       addGeneSetHandler={this.addGeneSet}
                                       addGeneHandler={this.addGene}
                                       uploadHandler={this.handleUpload}
                                       resetHandler={this.handleReset}
                                       closeHandler={this.showXena}
                        />
                    </Dialog>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width={this.state.showPathwayDetails ? VERTICAL_GENESET_DETAIL_WIDTH : VERTICAL_GENESET_SUPPRESS_WIDTH}
                                        >
                                            {this.state.showPathwayDetails &&
                                            <div style={{paddingLeft: leftPadding}}>
                                                <FaArrowRight onClick={this.hideGeneSetDetail}
                                                              className={BaseStyle.mouseHover}/>
                                             </div>
                                            }
                                            {!this.state.showPathwayDetails &&
                                            <FaArrowLeft onClick={this.showGeneSetDetail}
                                                         className={BaseStyle.mouseHover}/>
                                            }
                                        </td>
                                        <td width={VERTICAL_SELECTOR_WIDTH - 20}>
                                            <LabelTop width={VERTICAL_SELECTOR_WIDTH - 20}/>
                                        </td>
                                        <td width={this.state.showPathwayDetails ? VERTICAL_GENESET_DETAIL_WIDTH : VERTICAL_GENESET_SUPPRESS_WIDTH}>
                                            {this.state.showPathwayDetails &&
                                            <FaArrowLeft onClick={this.hideGeneSetDetail}
                                                         className={BaseStyle.mouseHover}/>
                                            }
                                            {!this.state.showPathwayDetails &&
                                            <FaArrowRight onClick={this.showGeneSetDetail}
                                                          className={BaseStyle.mouseHover}/>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={this.state.showPathwayDetails ? VERTICAL_GENESET_DETAIL_WIDTH : VERTICAL_GENESET_SUPPRESS_WIDTH}>
                                            {this.state.showPathwayDetails &&
                                            <VerticalGeneSetScoresView
                                                data={this.state.pathwayDataA}
                                                cohortIndex={0}
                                                cohortLabel={LABEL_A}
                                                pathways={pathways}
                                                filter={this.state.apps[0].tissueExpressionFilter}
                                                width={VERTICAL_GENESET_DETAIL_WIDTH}
                                                labelHeight={18 + 2 * BORDER_OFFSET}
                                                selectedCohort={this.getSelectedCohort(this.state.pathwayDataA)}
                                                onClick={this.globalPathwaySelect}
                                                onHover={this.globalPathwayHover}
                                                onMouseOut={this.globalPathwayHover}
                                            />
                                            }
                                        </td>
                                        <td width={VERTICAL_SELECTOR_WIDTH - 20}>
                                            <GeneSetSelector pathways={pathways}
                                                             hoveredPathways={this.state.hoveredPathways}
                                                             selectedPathway={this.state.pathwaySelection}
                                                             highlightedGene={this.state.highlightedGene}
                                                             onClick={this.globalPathwaySelect}
                                                             onHover={this.globalPathwayHover}
                                                             onMouseOut={this.globalPathwayHover}
                                                             labelHeight={18}
                                                             topOffset={14}
                                                             width={VERTICAL_SELECTOR_WIDTH}
                                                             geneStateColors={this.state.geneStateColors}
                                            />
                                        </td>
                                        <td width={this.state.showPathwayDetails ? VERTICAL_GENESET_DETAIL_WIDTH : VERTICAL_GENESET_SUPPRESS_WIDTH}>
                                            {this.state.showPathwayDetails &&
                                            <VerticalGeneSetScoresView
                                                data={this.state.pathwayDataB}
                                                cohortIndex={1}
                                                cohortLabel={LABEL_B}
                                                filter={this.state.apps[1].tissueExpressionFilter}
                                                width={200}
                                                pathways={pathways}
                                                labelHeight={18 + 2 * BORDER_OFFSET}
                                                selectedCohort={this.getSelectedCohort(this.state.pathwayDataB)}
                                                onClick={this.globalPathwaySelect}
                                                onHover={this.globalPathwayHover}
                                                onMouseOut={this.globalPathwayHover}
                                            />
                                            }
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>

                            {this.state.loading===LOAD_STATE.LOADED &&
                                <td valign="top" className="map_wrapper"
                                onMouseMove={(ev) => {
                                // const x = ev.clientX - ev.currentTarget.getBoundingClientRect().left + 295;
                                const x = ev.clientX + 8;
                                const y = ev.clientY + 8;
                                this.setState({mousing: true, x, y});
                            }}
                                onMouseOut = {() => {
                                this.setState({mousing: false});
                            }}
                                >
                                <CrossHairH mousing={this.state.mousing} y={this.state.y}/>
                                <CrossHairV mousing={this.state.mousing} x={this.state.x} height={VIEWER_HEIGHT * 2}/>
                                <XenaGoViewer
                                    // reference
                                    cohortIndex={0}
                                    ref='xena-go-app-0'
                                    cohortLabel={LABEL_A}

                                    // view
                                    renderOffset={0}
                                    renderHeight={VIEWER_HEIGHT}
                                    // data
                                    appData={this.state.apps[0]}
                                    geneDataStats={this.state.geneData[0]}

                                    // maybe state?
                                    pathways={pathways}
                                    highlightedGene={this.state.highlightedGene}

                                    // new pathway data
                                    pathwayData={this.state.pathwayDataA}
                                    pathwaySelection={this.state.pathwaySelection}
                                    cohortData={this.state.cohortData}


                                   // functions
                                    geneHover={this.geneHover}
                                    shareGlobalGeneData={this.shareGlobalGeneData}
                                    setCollapsed={this.setCollapsed}

                                    // state
                                    colorSettings={this.state.geneStateColors}
                                    collapsed={this.state.collapsed}
                                    showDiffLayer={this.state.showDiffLayer}
                                    showDetailLayer={this.state.showDetailLayer}
                                    showClusterSort={this.state.showClusterSort}
                                />
                                <XenaGoViewer
                                    // reference
                                    cohortIndex={1}
                                    ref='xena-go-app-1'
                                    cohortLabel={LABEL_B}

                                    // view
                                    renderHeight={VIEWER_HEIGHT}
                                    renderOffset={VIEWER_HEIGHT - 3}

                                    // data
                                    appData={this.state.apps[1]}
                                    geneDataStats={this.state.geneData[1]}

                                    // maybe state?
                                    pathways={pathways}
                                    highlightedGene={this.state.highlightedGene}

                                    // new pathway data
                                    pathwayData={this.state.pathwayDataB}
                                    pathwaySelection={this.state.pathwaySelection}
                                    cohortData={this.state.cohortData}

                                    // functions
                                    geneHover={this.geneHover}
                                    shareGlobalGeneData={this.shareGlobalGeneData}
                                    setCollapsed={this.setCollapsed}

                                    // state
                                    colorSettings={this.state.geneStateColors}
                                    collapsed={this.state.collapsed}
                                    showDiffLayer={this.state.showDiffLayer}
                                    showDetailLayer={this.state.showDetailLayer}
                                    showClusterSort={this.state.showClusterSort}
                                />
                                </td>
                            }
                        </tr>
                        </tbody>
                    </table>
                </div>
                }
            </div>);
    }
}
