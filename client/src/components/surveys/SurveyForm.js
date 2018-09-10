import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </div>
        );
    }
}

function Validate(values) {
    const errors = {}

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });   

    return errors;
}

// destroyOnUnmount set to false allows redux form to persist the data on the form fields after submitting
export default reduxForm({
    validate: Validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);