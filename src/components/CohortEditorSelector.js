import PureComponent from './PureComponent';
import PropTypes from 'prop-types';
import React from 'react';
import BaseStyle from '../css/base.css';
import {Button} from 'react-toolbox';
import {fetchCohortData, getCohortDetails, getCohortsForView, getViewsForCohort} from '../functions/CohortFunctions';
import {intersection} from '../functions/MathFunctions';
import update from 'immutability-helper';

export class CohortEditorSelector extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      view: props.view,
      cohort: props.cohort,
      // cohort : props.cohort,
      // filter: props.filter,
    };
  }

  handleCohortChange = (event,cohortIndex) => {
    const selectedCohortName = event.target.value ;
    let cohortDetails = getCohortDetails({name: selectedCohortName});
    const newCohortState = update(this.state.cohort,{
      [cohortIndex]: { $set:cohortDetails}
    });
    this.setState({
      cohort: newCohortState
    });
  };

  handleChangeSubCohort = (event) => {
    console.log('handling sub cohorrt ',event.target.value);
    // this.props.onChange(event.target.value);
  };

  handleViewChange = (event) => {
    this.setState({view: [event.target.value,event.target.value]});
  };

  render(){

    const { cohort , onCancelCohortEdit, onChangeView, view} = this.props;
    const cohorts = getCohortsForView(view);
    const availableCohorts = fetchCohortData().filter( c => cohorts.indexOf(c.name)>=0 );
    const allowableViews = intersection(getViewsForCohort(cohort[0].name),getViewsForCohort(cohort[1].name));

    return (
      <div>
        <div className={BaseStyle.cohortEditorBox}>
          <Button icon='save' label='Save' onClick={onChangeView} primary raised/>
          <Button icon='cancel' label='Cancel' onClick={onCancelCohortEdit} raised/>
        </div>
        <table className={BaseStyle.cohortEditorBox}>
          <tbody>
            <tr>
              <td colSpan={2}>
              View:
                <select
                  onChange={this.handleViewChange}
                  value={this.state.view}
                >
                  {
                    Object.entries(allowableViews).map( f => {
                      return (
                        <option key={f[1]} value={f[1]}>{f[1]}</option>
                      );
                    })
                  }
                </select>
              </td>
            </tr>
            <tr>
              <th>
                <u>Cohort A</u>
                <br/>
                {this.state.cohort[0].name}
                <select
                  className={BaseStyle.softflow}
                  onChange={(event) => this.handleCohortChange(event,0)}
                  style={{marginLeft: 10, marginTop: 3, marginBottom: 3}}
                  value={this.state.cohort[0].name}
                >
                  {
                    availableCohorts.map(c => {
                      return (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      );
                    })
                  }
                </select>
              </th>
              <th>
                <u>Cohort B</u>
                <br/>
                {cohort[1].name}
                <select
                  className={BaseStyle.softflow}
                  onChange={(event) => this.handleCohortChange(event,1)}
                  style={{marginLeft: 10, marginTop: 3, marginBottom: 3}}
                  value={cohort[1].name}
                >
                  {
                    availableCohorts.map(c => {
                      return (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      );
                    })
                  }
                </select>
              </th>
            </tr>
            <tr className={BaseStyle.cohortEditorRow}>
              <td>
              Copy Right
              Vs All
              </td>
              <td>
              Swap
              </td>
              <td>
              Copy Left
              Vs All
              </td>
            </tr>
            <tr className={BaseStyle.cohortEditorRow}>
              <td valign='top'>
                <ul className={BaseStyle.subCohortList}>
                  {cohort[0].subCohorts.map( sc => {
                    return (
                      <li key={sc}>
                        <input type='checkbox' value={sc}/>
                        {sc}</li>
                    );
                  })  }
                </ul>
              </td>
              <td valign='top'>
                <ul className={BaseStyle.subCohortList}>
                  {cohort[1].subCohorts.map( sc => {
                    return (
                      <li key={sc}>
                        <input type='checkbox' value={sc}/>
                        {sc}</li>
                    );
                  })  }
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
CohortEditorSelector.propTypes = {
  cohort: PropTypes.any.isRequired,
  onCancelCohortEdit: PropTypes.any.isRequired,
  onChangeCohorts: PropTypes.any.isRequired,
  onChangeView: PropTypes.any.isRequired,
  view: PropTypes.any.isRequired,
};