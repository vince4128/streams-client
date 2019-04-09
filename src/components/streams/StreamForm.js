import React, {Component} from 'react';
import { Field, reduxForm} from 'redux-form';

class StreamForm extends Component {
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
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Saisissez un titre"
                />
                <Field 
                    name="description" 
                    component={this.renderInput} 
                    label="Saisissez une description"
                />
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

/* WRAPPED FORM EXAMPLE
const formWrapped = (reduxForm({
    form:'streamCreate',
    validate:validate
})(StreamForm));

export default connect(null, {createStream})(formWrapped);
*/

export default reduxForm({
    form:'streamForm',
    validate
})(StreamForm);