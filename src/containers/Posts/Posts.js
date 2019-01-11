import React, { Component } from 'react';
import axios from '../../axios';
import { Route } from 'react-router-dom';

import './Posts.css';
import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(res => {
                const posts = res.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Lam'
                    }
                })
                this.setState({ posts: updatedPosts });
                // console.log(res);
            })
            .catch(err => {
                console.log(err);
                // this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/posts/' + id});
    }

    render() {
        if (this.state.error) {
            return <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        }
        const posts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            );
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path="/posts/:id" exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;