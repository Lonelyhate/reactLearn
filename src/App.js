import React, {useRef, useState, useMemo} from 'react';
import Counter from './components/Counter';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UL/button/MyButton';
import MyInput from './components/UL/input/MyInput';
import MySelect from './components/UL/select/MySelect';
import './styles/app.css'


function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'zzzz'},
        {id: 2, title: 'python 2', body: 'bbbb'},
        {id: 3, title: 'C++ 3', body: 'aaaa'}
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})

    function getSortedPosts() {
        
    }

    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
        
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <PostForm create={createPost} />
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про js'}/>
    </div>
  );
}

export default App;