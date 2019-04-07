import React, {Component} from 'react';
import { Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions'

class StreamCreate extends Component {
    renderError({error, touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
       return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off"/>
            {this.renderError(meta)}
        </div>
       ); 
    }

    onSubmit = (formValues) => {
        console.log(this.props);
        this.props.createStream(formValues);
    }

    render(){
        return (
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >
                <Field name="title" component={this.renderInput} label="Saisissez un titre"/>
                <Field name="description" component={this.renderInput} label="Saisissez une description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }    
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title){
        errors.title = 'Vous devez saisir un titre';
    }

    if(!formValues.description){
        errors.description = 'Vous devez saisir une description';
    }

    return errors;
};

const formWrapped = (reduxForm({
    form:'streamCreate',
    validate:validate
})(StreamCreate));

export default connect(null, {createStream})(formWrapped);