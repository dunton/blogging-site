import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

	renderField(field) {

		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : '' }`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					placeholder={field.label}
					// contains a bunch of diff event handlers and props
					// ... communicates all props from object to input tag
					{...field.input}
				/>
				<div className="text-help">
					{field.meta.touched ? field.meta.error : ''}
				</div>
				 
			</div>
		)
	}

	// uses textarea instead of input field to allow for longer, better posts
	renderTextField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : '' }`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<textarea 
					className="form-control"
					id="contentField" 
					placeholder={field.label} 
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{field.meta.touched ? field.meta.error : ''}
				</div>
				 
			</div>
		)
	}

	onSubmit(values) {
		
		// call action creator
		this.props.createPost(values, () => {
			// sends back to root of application
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					name="title" // this name connects to the validate function !important
					label="Title For Post" // this how we pass label to renderField function
					component={this.renderField} // no parens because we dont want to call function till time is right
				/>
				<Field
					name="categories"
					label="Categories"
					component={this.renderField}
				/>	
				<Field
					name="content"
					label="Post Content"
					component={this.renderTextField}
				/>	
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		)
	}
}


function validate(values) {
	// console.log(values) -> { title: 'astrsoeit', categories: '', content: 'strsoetin'}
	// need to return object we create from the validate function
	const errors = {};

	// Validate the inputs from 'values'
	if (!values.title) {
		errors.title = "Enter a title!" // this string becomes {field.meta.error}
	}
	if (!values.categories) {
		errors.categories = "Enter some categories";
	}
	if (!values.content) {
		errors.content = "Enter some content please";
	}

	// if errors is empty, the form is fine to submit
	// if errors has *any* properties, redux form assumes form is invalid
	return errors;
}


export default reduxForm({
	validate,

	// string must be unique
	// helps communicate with reducer
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);
