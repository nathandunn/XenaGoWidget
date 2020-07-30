import React from 'react'
import PureComponent from './PureComponent'
import PropTypes from 'prop-types'
import {GeneSetSubCohortBox} from './GeneSetSubCohortBox'
import BaseStyle from '../css/base.css'
import HoverGeneView from './hover/HoverGeneView'
import SelectGeneView from './hover/SelectGeneView'
import {generateXenaLink} from '../functions/XenaLinkFunctions'
import {isViewGeneExpression} from '../functions/DataFunctions'

export class GeneSetInformationColumn extends PureComponent {

  constructor(props) {
    super(props)
  }


  canShowHover() {
    const {geneHoverData,cohortIndex} = this.props
    if(!geneHoverData || geneHoverData.length !== 2) return false
    // if they both are tissue 'Header' then show
    if(geneHoverData[0].tissue === geneHoverData[1].tissue && geneHoverData[1].tissue === 'Header') {
      return true
    }
    // or if the selected cohort is NOT
    return geneHoverData[cohortIndex].tissue !== 'Header'
  }

  // ?columns=%5B%7B%22name%22%3A%22tcga_Kallisto_tpm%22%2C%22host%22%3A%22https%3A%2F%2Ftoil.xenahubs.net%22%2C%22fields%22%3A%22TP53%20FOXM1%22%7D%5D\">Example 1</a>"


  render() {

    const cohortColor = this.props.cohortColor[this.props.cohortIndex]

    if (this.props.geneDataStats && this.props.geneDataStats[this.props.cohortIndex].samples) {
      const externalLink = generateXenaLink(this.props)
      return (
        <div
          className={BaseStyle.geneSetDetailBox}
          style={{
            backgroundColor: cohortColor,
            marginTop: 70,
            marginLeft: this.props.cohortIndex === 0 ? 0 : 182 + 182  + 222 + 250 + 30
          }}
        >
          {
            (isViewGeneExpression(this.props.view)  ||
            (!isViewGeneExpression(this.props.view) && this.props.open)) &&
          <div className={BaseStyle.ssInfoBox}>
            <a
              href={externalLink}
              rel="noopener noreferrer"
              target='_blank'
              title={externalLink}>Open in Xena</a>
          </div>
          }
          <GeneSetSubCohortBox
            cohortIndex={this.props.cohortIndex}
            geneDataStats={this.props.geneDataStats}
            onEditCohorts={this.props.onEditCohorts}
            subCohortCounts={this.props.subCohortCounts}
          />
          {this.props.open &&
          <SelectGeneView
            data={this.props.geneDataStats[this.props.cohortIndex]}
          />
          }
          {
            this.canShowHover() &&
            <HoverGeneView
              cohortIndex={this.props.cohortIndex}
              data={this.props.geneHoverData ? this.props.geneHoverData[this.props.cohortIndex] : null}
              view={this.props.view}
            />
          }
        </div>
      )
    }
    return <div/>
  }

}

GeneSetInformationColumn.propTypes = {
  cohort: PropTypes.any.isRequired,
  cohortColor: PropTypes.any.isRequired,
  cohortIndex: PropTypes.any.isRequired,
  geneDataStats: PropTypes.any,
  geneHoverData: PropTypes.any,
  onEditCohorts: PropTypes.any.isRequired,
  open: PropTypes.any.isRequired,
  pathwayData: PropTypes.any.isRequired,
  subCohortCounts: PropTypes.any.isRequired,
  view: PropTypes.any.isRequired,

}
