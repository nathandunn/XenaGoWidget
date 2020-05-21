import React from 'react'
import PureComponent from '../PureComponent'
// import {GeneSetLegend} from './GeneSetLegend'
// import {VIEW_ENUM} from '../../data/ViewEnum'
import PropTypes from 'prop-types'
import {VERTICAL_GENESET_DETAIL_WIDTH} from '../XenaGeneSetApp'
// import {GeneLegendLabel} from './GeneLegendLabel'
// import BaseStyle from '../../css/base.css'


export class DiffScaleLegend extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      showScale : props.showScale
    }
  }

  render() {
    if(!this.props.showScale){
      return (
        <tr style={{height: 20}} >
          <td colSpan={3} style={{height: 20}}/>
        </tr>
      )
    }
    return (
      <tr style={{height: 20}} >
        <td colSpan={1}>
          <svg style={{width: '100%', height: 20, borderColor: 'black', borderWidth: 1 }}>
            <polyline
              fill={'none'}
              points={`0,0 0,20 0,15 ${VERTICAL_GENESET_DETAIL_WIDTH},15  ${VERTICAL_GENESET_DETAIL_WIDTH},0   ${VERTICAL_GENESET_DETAIL_WIDTH},20`}
              stroke={'black'}
              strokeWidth={1}
            />
            <text
              fontSize={'smaller'}
              x={10}
              y={10}
            >
              {this.props.maxValue}
            </text>
            <text
              fontSize={'smaller'}
              x={VERTICAL_GENESET_DETAIL_WIDTH - 20}
              y={10}
            >
              {this.props.minValue}
            </text>
          </svg>
        </td>
        <td colSpan={1} style={{height: 20}}>
          <pre style={{display: 'inline',paddingLeft: 10,paddingBottom: 0,paddingTop: 0, margin: 0, height: 20}}>Gene Diff Scale</pre>
          <input checked={this.state.showScale} style={{display: 'inline'}} type='checkbox'/> Show
        </td>
        <td colSpan={1}>
          <svg style={{width: '100%', height: 20, borderColor: 'black', borderWidth: 1 }}>
            <polyline
              fill={'none'}
              points={`0,0 0,20 0,15 ${VERTICAL_GENESET_DETAIL_WIDTH},15  ${VERTICAL_GENESET_DETAIL_WIDTH},0   ${VERTICAL_GENESET_DETAIL_WIDTH},20`}
              stroke={'black'}
              strokeWidth={1}
            />
            <text
              fontSize={'smaller'}
              x={10}
              y={10}
            >
              {-this.props.minValue}
            </text>
            <text
              fontSize={'smaller'}
              x={VERTICAL_GENESET_DETAIL_WIDTH - 30}
              y={10}
            >
              {-this.props.maxValue}
            </text>
          </svg>
        </td>
      </tr>
    )
  }
}
DiffScaleLegend.propTypes = {
  maxValue: PropTypes.any.isRequired,
  minValue: PropTypes.any.isRequired,
  showScale: PropTypes.any,
}