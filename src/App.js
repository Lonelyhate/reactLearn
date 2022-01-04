import React, {useRef, useState, useMemo} from 'react';
import Counter from './components/Counter';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UL/button/MyButton';
import MyModal from './components/UL/MyModal/MyModal';
import './styles/app.css'
import {usePosts} from "./hooks/usePosts";
import axios from "axios";


function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'zzzz'},
        {id: 2, title: 'python 2', body: 'bbbb'},
        {id: 3, title: 'C++ 3', body: 'aaaa'}
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <button onClick={fetchPosts}>GET POSTS</button>
        <MyButton style={{marginTop: 30}} onClick={() => {
            setModal(true)
        }}>
            Создать пост
        </MyButton>
        <MyModal visable={modal} setVisable={setModal}>
            <PostForm create={createPost} />
        </MyModal>
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