import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		// save on network calls by wrapping in if statement
		if (!this.props.post) {
			const id = this.props.match.params.id;
			this.props.fetchPost(id);
		}
	}

	onDeleteClick() {
		const {id} = this.props.match.params;

		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}


	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>
		}

		
		return (
			<div>
				<Link to="/">Back to All Posts</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}
				>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps) {
	//console.log(posts[ownProps.match.params.id])
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);