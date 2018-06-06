import React from 'react'
import PureComponent from "../PureComponent";
import PathwayView from "./PathwayView";
import {Grid, Row, Col} from 'react-material-responsive-grid';
import {Button} from 'react-toolbox/lib/button';
import {Chip} from 'react-toolbox/lib/chip';
import GeneView from "./GeneView";
import PropTypes from 'prop-types';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';
import FaCloudDownload from 'react-icons/lib/fa/cloud-download';
import Fafresh from 'react-icons/lib/fa/refresh';
import FaTrash from 'react-icons/lib/fa/trash';
import Input from 'react-toolbox/lib/input';
import PathwaySetsView from "./PathwaySetsView";
import Autocomplete from 'react-toolbox/lib/autocomplete';

// import {sparseDataMatchPartialField, refGene} = require('../xenaQuery');
let xenaQuery = require('ucsc-xena-client/dist/xenaQuery');
let {sparseDataMatchPartialField, refGene} = xenaQuery;

export default class PathwayEditor extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedPathway: this.props.selectedPathway,
            newGene: [],
            newGeneSet: '',
            newView: '',
            geneOptions: [],
            geneQuery: '',
            reference: refGene['hg38'],
            limit: 25,
        }
    }


    render() {
        let selectedPathwayState = this.props.pathwaySets.find(f => f.selected === true);
        return (
            <Grid style={{marginTop: 20}}>
                <Row>
                    {/*<Col md={3}>*/}
                    {/*<Chip>Views</Chip>*/}
                    {/*</Col>*/}
                    <Col md={6}>
                        <Button onClick={ () => this.downloadView()}>
                            Download <FaCloudDownload/>
                        </Button>
                        <Button onClick={ () => this.uploadView()}>
                            Upload <FaCloudUpload/>
                        </Button>
                        <Button onClick={ () => this.resetView()}>
                            Reset <Fafresh/>
                        </Button>
                    </Col>
                    {/*<Col md={3}>*/}
                        {/*<Chip>Genes</Chip>*/}
                    {/*</Col>*/}
                </Row>
                <Row>
                    {/*<Col md={3}>*/}
                        {/*<Chip>Views</Chip>*/}
                    {/*</Col>*/}
                    <Col md={7}>
                        <Chip>Gene Sets</Chip>
                    </Col>
                    <Col md={3}>
                        <Chip>Genes</Chip>
                    </Col>
                </Row>
                {/*<Row>*/}
                {/*<Col md={3}>*/}
                {/*<Button raised primary><FaCloudUpload/></Button>*/}
                {/*<Button raised primary><FaCloudDownload/></Button>*/}
                {/*</Col>*/}
                {/*<Col md={6}>*/}
                {/*<Button raised primary><FaCloudUpload/></Button>*/}
                {/*<Button raised primary><FaCloudDownload/></Button>*/}
                {/*</Col>*/}
                {/*<Col md={3}>*/}
                {/*<Button raised primary><FaCloudUpload/></Button>*/}
                {/*<Button raised primary><FaCloudDownload/></Button>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                <Row>
                    {/*<Col md={2}>*/}
                    {/*<Input type='text' label='New View' name='newView' value={this.state.newView}*/}
                    {/*onChange={(newView) => this.setState({newView: newView})}*/}
                    {/*maxLength={16}/>*/}
                    {/*</Col>*/}
                    {/*<Col md={1}>*/}
                    {/*<Button style={{marginTop: 20}} raised primary*/}
                    {/*onClick={() => this.handleAddNewView(this.state.newView)}><FaPlusCircle/></Button>*/}
                    {/*</Col>*/}
                    <Col md={5}>
                        <Input type='text' label='New Gene Set' name='newGeneSet' value={this.state.newGeneSet}
                               onChange={(newGeneSet) => this.setState({newGeneSet: newGeneSet})}
                               maxLength={16}/>
                    </Col>
                    <Col md={2}>
                        <Button style={{marginTop: 20}} onClick={() => this.handleAddNewGeneSet(this.state.newGeneSet)}
                                raised
                                primary><FaPlusCircle/></Button>
                    </Col>
                    {this.state.selectedPathway &&
                    <Col md={2}>
                        <Autocomplete label='New Gene' source={this.state.geneOptions} value={this.state.newGene}
                                      onQueryChange={(geneQuery) => this.queryGenes(geneQuery)}
                                      onChange={(newGene) => {
                                          this.setState({newGene: newGene})
                                      }}
                        />
                        {/*<Input type='text' label='New Gene' name='newGene' value={this.state.newGene} maxLength={16}*/}
                        {/*onChange={(newGene) => this.setState({newGene: newGene})}*/}
                        {/*/>*/}
                    </Col>
                    }
                    {this.state.selectedPathway &&
                    <Col md={1}>
                        <Button style={{marginTop: 20}} raised primary
                                onClick={() => this.handleAddNewGene(this.state.selectedPathway, this.state.newGene)}><FaPlusCircle/></Button>
                    </Col>
                    }
                </Row>
                <Row>
                    {/*<Col md={3}>*/}
                    {/*<PathwaySetsView pathwaySets={this.props.pathwaySets}/>*/}
                    {/*</Col>*/}
                    <Col md={7}>
                        <PathwayView removePathwayHandler={this.removePathway}
                                     clickPathwayHandler={this.selectedPathway}
                                     selectedPathwaySet={selectedPathwayState}/>
                    </Col>
                    <Col md={3}>
                        {this.state.selectedPathway &&
                        <h3>
                            {this.state.selectedPathway.golabel}

                            {this.state.selectedPathway.goid &&
                            <div>({this.state.selectedPathway.goid})</div>
                            }
                        </h3>
                        }
                        <GeneView selectedPathway={this.state.selectedPathway} removeGeneHandler={this.removeGene}/>
                    </Col>
                </Row>
            </Grid>
        );
    }

    removeGene = (selectedPathway, selectedGene) => {
        this.props.removeGeneHandler(selectedPathway, selectedGene);
    };

    removePathway = (selectedPathway) => {
        this.props.removePathwayHandler(selectedPathway);

        this.setState({
            selectedPathway: undefined,
        });
    };

    selectedPathway = (selectedPathway) => {
        // get genes for selected pathway
        this.setState({
            selectedPathway: selectedPathway
        })
    };

    handleAddNewView(newView) {
        console.log('adding new view: ' + JSON.stringify(newView))
    }

    handleAddNewGeneSet(newGeneSet) {
        this.props.addGeneSetHandler(newGeneSet);
        //
        this.setState({
            newGeneSet: ''
        })
    }

    handleAddNewGene(newGeneSet, newGene) {
        newGene.map(g => {
            this.props.addGeneHandler(newGeneSet, g);
        });

        this.setState({
            newGene: []
        })
    }

    queryGenes(geneQuery) {
        let {reference: {host, name}, limit} = this.state;
        let subscriber = sparseDataMatchPartialField(host, 'name2', name, geneQuery, limit);
        subscriber.subscribe(matches => {
                this.setState({
                    geneOptions: matches
                })
            }
        )
    }

    downloadView() {
        alert('downloading active view')
    }

    uploadView() {
        alert('upload active view')
    }

    resetView() {
        alert('reseting to the default')
    }
}

PathwayEditor.propTypes = {
    addGeneSetHandler: PropTypes.any,
    addGeneHandler: PropTypes.any,
    removePathwayHandler: PropTypes.any,
    removeGeneHandler: PropTypes.any,
};
