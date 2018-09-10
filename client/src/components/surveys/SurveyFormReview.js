import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

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
            <button className="yellow darken-3 btn-flat" onClick={props.onCancel}>
                back
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);