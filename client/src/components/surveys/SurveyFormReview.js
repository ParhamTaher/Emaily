import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

import formFields from './formFields';

const SurveyFormReview = (props) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
          <div key={name}>
            <label>{label}</label>
            <div>
              {props.formValues[name]}
            </div>
          </div>
        );
      });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {reviewFields}
            </div>
            <button className="yellow darken-3 white-text btn-flat" onClick={props.onCancel}>
                back
            </button>
            <button className="green white-text btn-flat right" onClick={() => props.submitSurvey(props.formValues, props.history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));