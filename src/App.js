import React, {useRef, useState} from 'react';
import Counter from './components/Counter';
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

    const [selectedSort, setSelectedSort] = useState('') 
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }
    
  return (
    <div className="App">
        <PostForm create={createPost} />
        <hr style={{margin: '15px 0'}}/>
        <div>
            <MySelect
            value={selectedSort}
            onChange={sortPosts}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
        {posts.length !== 0
           ? <PostList remove={removePost} posts={posts} title={'Посты про js'}/>
           : <h1 style={{textAlign: 'center'}} >Посты не были найдены</h1> 
        }
    </div>
  );
}

export default App;