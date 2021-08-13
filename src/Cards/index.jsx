import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useInfinteScroll } from '../CustomHooks/useInfiniteScroll';

import './cards.css'

export const Cards = () => {
    const [posts, setPosts] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const pageSize = 10;

    const [isLoading, setIsLoading] = useInfinteScroll(loadMoreData); //Initializing the custom hook with passing a function that triggers when user scrolls down

    useEffect(() => {
        axios.get(`http://jsonplaceholder.typicode.com/posts?_start=${pageCount}&_limit=${pageSize}`)
            .then(response => {
                setPageCount(pageCount + 1)
                setPosts(response.data)
            }).catch(error => console.error(error))
    },[])

    function loadMoreData ()  {
        axios.get(`http://jsonplaceholder.typicode.com/posts?_start=${pageCount * pageSize}&_limit=${pageSize}`).then(response => {
            setPosts([...posts, ...response.data])
            setPageCount(pageCount + 1);
            setIsLoading(false);
        }).catch(error => console.error(error))
    }

    return (
        <div className='container'>
            {
                posts.length ? 
                        posts.map((post, index) => {
                            return <div key={post.id} className='card'>
                                        <div>{index + 1}</div>
                                        <div className='title'><h4>Title</h4> <p>{post.title || '-'}</p></div>
                                        <div className='body'><h4>Body</h4><p>{post.body || '-'}</p></div>
                                    </div>
                            })
                : <div>Loading...</div>
            }
        </div>
    )
}