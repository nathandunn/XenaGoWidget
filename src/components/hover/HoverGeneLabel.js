import React from 'react'
import PureComponent from '../PureComponent'
import PropTypes from 'prop-types'
import BaseStyle from '../../css/base.css'
import {
  interpolateCnvMutationColor,
  interpolateGeneExpression,
  interpolateGeneExpressionFont
} from '../../functions/DrawFunctions'
import {isViewGeneExpression} from '../../functions/DataFunctions'
import {getRatio} from '../../functions/HoverFunctions'
import {getMiddleGeneSetLabelForView} from '../legend/GeneSetGeneExpressionLegend'

export default class HoverGeneLabel extends PureComponent {

  getPercent(data){
    return data.pathway.samplesAffected / data.pathway.total * 100.0
  }

  render() {
    let {data, view} = this.props
    return (
      <div>
        <div className={BaseStyle.pathwayChip}>
          <div className={BaseStyle.boxHeader}>Hovering over </div>
          <div><b>Gene</b> {data.pathway.gene[0].replace(/_/g,' ')}</div>
          <br/>
          { isViewGeneExpression(view) &&
          <div
            className={BaseStyle.scoreBox}
            style={{
              color: interpolateGeneExpressionFont(data.pathway.geneExpressionMean),
              backgroundColor: interpolateGeneExpression(data.pathway.geneExpressionMean)
            }}
          >
            {getMiddleGeneSetLabelForView(view)}&nbsp;&nbsp;
            {data.pathway.geneExpressionMean ? data.pathway.geneExpressionMean.toPrecision(2) : 0}
          </div>
          }
          { !isViewGeneExpression(view) && data.pathway && data.pathway.samplesAffected!==undefined &&
          <div
            className={BaseStyle.scoreBoxBlock}
            style={{
              color: 'black',
              marginTop: 5,
              backgroundColor: interpolateCnvMutationColor(this.getPercent(data) )
            }}
          >
            <strong>Samples Affected</strong><br/> {getRatio(data.pathway)}
          </div>
          }
        </div>
      </div>
    )
  }
}

HoverGeneLabel.propTypes = {
  data: PropTypes.any.isRequired,
  view: PropTypes.any.isRequired,
}
