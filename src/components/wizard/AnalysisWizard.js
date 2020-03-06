import React from 'react'
import PureComponent from '../PureComponent'
import Wizard from '../../css/wizard.css'
import PropTypes from 'prop-types'
import {VIEW_ENUM} from '../../data/ViewEnum'


export class AnalysisWizard extends PureComponent {

  render () {
    const { cohort, onSelectAnalysis,subCohortSamples1,subCohortSamples2} = this.props

    const subCohort1Name = subCohortSamples1.split(':')[1]
    const subCohort1SampleSize = subCohortSamples1.split(':')[2].split(',').length
    const subCohort2Name = subCohortSamples2.split(':')[1]
    const subCohort2SampleSize = subCohortSamples2.split(':')[2].split(',').length

    return (
      <div className={Wizard.wizardBox}>
        <h3>Analyzing Cohort: <u>{cohort}</u></h3>
        <h4>
          Comparing subcohorts '{subCohort1Name}' ({subCohort1SampleSize} samples)
          to '{subCohort2Name}' ({subCohort2SampleSize} samples)
        </h4>
        {
          Object.values(VIEW_ENUM).map( v =>
            (<button key={v}
              className={Wizard.wizardAnalysisButton}
              onClick={() => onSelectAnalysis(v)}
            >{v}</button>)
          )
        }
      </div>
    )
  }
}
AnalysisWizard.propTypes = {
  cohort: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onSelectAnalysis: PropTypes.func.isRequired,
  subCohortSamples1: PropTypes.any.isRequired,
  subCohortSamples2: PropTypes.any.isRequired,
}
