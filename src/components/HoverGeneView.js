import React from 'react';
import PureComponent from './PureComponent';
import PropTypes from 'prop-types';
import {Chip} from 'react-toolbox';
import BaseStyle from '../css/base.css';
import {ScoreBadge} from './ScoreBadge';
import {interpolateGeneExpression, interpolateGeneExpressionFont} from '../functions/DrawFunctions';
import {VIEW_ENUM} from '../data/ViewEnum';

export default class HoverGeneView extends PureComponent {

    /**
     * This returns the number of affected versus the total number versus a single gene
     * @param data
     * @returns {string}
     */
    getRatio = data => {
      let returnString = data.expression.samplesAffected + '/' + data.expression.total;
      returnString += '  (';
      returnString += ((Number.parseFloat(data.expression.samplesAffected ) / Number.parseFloat(data.expression.total)) * 100.0).toFixed(0);
      returnString += '%)';
      return returnString;
    };

    getAffectedPathway = data => {
      let returnString = data.expression.allGeneAffected + '/' + (data.expression.total * data.pathway.gene.length);
      returnString += '  (';
      returnString += ((Number.parseFloat(data.expression.allGeneAffected) / Number.parseFloat(data.expression.total * data.pathway.gene.length)) * 100.0).toFixed(0);
      returnString += '%)';
      return returnString;

    };
    getScore = (data, cohortIndex,filter) => {
      switch (filter) {
      case VIEW_ENUM.GENE_EXPRESSION:
        return cohortIndex === 0 ? Number.parseFloat(data.pathway.firstGeneExpressionPathwayActivity).toFixed(2) : Number.parseFloat(data.pathway.secondGeneExpressionPathwayActivity).toFixed(2) ;
      case VIEW_ENUM.PARADIGM:
        return cohortIndex === 0 ? Number.parseFloat(data.pathway.firstParadigmPathwayActivity).toFixed(2) : Number.parseFloat(data.pathway.secondParadigmPathwayActivity).toFixed(2) ;
      default:
        return Number.parseFloat(cohortIndex === 0 ? data.pathway.firstChiSquared : data.pathway.secondChiSquared).toFixed(1);
      }
    };

    render() {
      let {data, cohortIndex, filter} = this.props;
      if(data.pathway){
        console.log(data.pathway.gene[0]);
      }
      if (data.tissue) {
        return (
          <div>
            {data.tissue !== 'Header' &&
                    <div>
                      {data.pathway &&
                      <div className={BaseStyle.pathwayChip}>
                        <span><strong>Gene</strong> {data.pathway.gene[0].replace(/_/g,' ')}</span>
                      </div>
                      }
                      {data.expression != null &&
                        <div>
                          {data.expression.geneExpression!==0 &&
                          <div className={BaseStyle.pathwayChip}>
                            <span className={BaseStyle.geneExpression}>
                              <strong>ZScore</strong>
                              <div
                                style={{
                                  padding: 5, borderRadius: 5, marginLeft: 5,
                                  display: 'inline',color:interpolateGeneExpressionFont(data.expression.geneExpression),backgroundColor:interpolateGeneExpression(data.expression.geneExpression) }}
                              >
                                {data.expression.geneExpression.toPrecision(2)}
                              </div>
                            </span>
                          </div>
                          }
                          {data.selectCnv && data.expression.cnvHigh > 0 &&
                            <Chip>
                              <span
                                className={data.expression.cnvHigh === 0 ? '' : BaseStyle.cnvHighColor}
                              ><strong>CNV Amplification</strong>
                                <ScoreBadge score={data.expression.cnvHigh}/>
                              </span>
                            </Chip>
                          }
                          {data.selectCnv && data.expression.cnvLow > 0 &&
                            <Chip>
                              <span
                                className={data.expression.cnvLow === 0 ? '' : BaseStyle.cnvLowColor}
                              ><strong>CNV Deletion</strong>
                                <ScoreBadge score={data.expression.cnvLow}/>
                              </span>
                            </Chip>
                          }
                          {!data.selectCnv && data.expression.mutation2 > 0 &&
                            <Chip>
                              <span
                                className={data.expression.mutation2 === 0 ? '' : BaseStyle.mutation2Color}
                              > <strong>Missense / Inframe </strong>
                                <ScoreBadge score={data.expression.mutation2}/>
                              </span>
                            </Chip>
                          }
                          {!data.selectCnv && data.expression.mutation3 > 0 &&
                            <Chip>
                              <span
                                className={data.expression.mutation3 === 0 ? '' : BaseStyle.mutation3Color}
                              > <strong>Splice</strong>
                                <ScoreBadge score={data.expression.mutation3}/>
                              </span>
                            </Chip>
                          }
                          {!data.selectCnv && data.expression.mutation4 > 0 &&
                            <Chip>
                              <span
                                className={data.expression.mutation4 === 0 ? '' : BaseStyle.mutation4Color}
                              > <strong>Deleterious</strong>
                                <ScoreBadge score={data.expression.mutation4}/>
                              </span>
                            </Chip>
                          }
                        </div>
                      }
                      {data.tissue &&
                        <Chip>
                          <span style={{margin: 0}}>
                            <strong>Sample</strong>
                            <span>{data.tissue}</span>
                          </span>
                        </Chip>
                      }
                    </div>
            }
            {data.tissue === 'Header' && data.pathway && data.pathway.gene.length === 1 && data.expression
              && data.expression.total > 0 && data.expression.allGeneAffected===undefined && filter !== VIEW_ENUM.GENE_EXPRESSION && filter !== VIEW_ENUM.PARADIGM &&
                    <div>
                      <div className={BaseStyle.pathwayChip}>
                        <span><strong>Gene</strong> {data.pathway.gene[0].replace(/_/,' ')}</span>
                      </div>
                      <div className={BaseStyle.pathwayChip}>
                        <span><strong>Samples Affected</strong><br/> {this.getRatio(data)}</span>
                      </div>
                    </div>
            }
            {data.tissue === 'Header' && data.pathway && data.pathway.gene.length === 1 && data.pathway
            && data.pathway.geneExpressionMean !== undefined && ( filter === VIEW_ENUM.GENE_EXPRESSION || filter === VIEW_ENUM.PARADIGM )  &&
            <div>
              <div className={BaseStyle.pathwayChip}>
                <span><strong>Gene</strong> {data.pathway.gene[0].replace(/_/g,' ')}</span>
              </div>
              <div className={BaseStyle.pathwayChip}>
                <span><strong>Mean ZScore</strong>
                  <div
                    style={{
                      padding: 5, borderRadius: 5, marginLeft: 5,
                      display: 'inline',color:interpolateGeneExpressionFont(data.pathway.geneExpressionMean),backgroundColor:interpolateGeneExpression(data.pathway.geneExpressionMean) }}
                  >
                    {data.pathway.geneExpressionMean.toPrecision(2)}
                  </div>
                  <div style={{fontSize:'smaller',display: 'inline'}}>({data.expression.total})</div>
                </span>
              </div>
            </div>
            }
            {data.tissue === 'Header' && data.pathway && data.pathway.gene.length > 0 && data.expression && data.expression.allGeneAffected!==undefined &&
                    <div className={BaseStyle.pathwayChip}>
                      <span><strong>Pathway&nbsp;&nbsp;</strong>
                        {data.pathway.golabel.replace(/_/g,' ')}
                      </span>
                      {filter !== VIEW_ENUM.GENE_EXPRESSION && filter !== VIEW_ENUM.PARADIGM &&
                      <div>
                        <span><strong>Samples Affected</strong><br/> {this.getRatio(data)}</span>
                      </div>
                      }
                      {filter !== VIEW_ENUM.GENE_EXPRESSION && filter !== VIEW_ENUM.PARADIGM &&
                      <div>
                        <span><strong>Affected Area</strong><br/> {this.getAffectedPathway(data)}</span>
                      </div>
                      }
                      <div>
                        <span><strong>Score</strong> {this.getScore(data, cohortIndex,filter)}</span>
                      </div>

                    </div>
            }
          </div>
        );
      }
      else {
        return <div/>;
      }
    }
}

HoverGeneView.propTypes = {
  cohortIndex: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  filter: PropTypes.any.isRequired,
};
