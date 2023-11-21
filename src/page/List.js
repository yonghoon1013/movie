import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { MyContext } from '../Context';
import { Link } from 'react-router-dom';


// Import Swiper styles
import '../scss/List.scss'



function List() {

    const [searchQuery, setSearchQuery] = useState("");
    const { db, dataNum, setNum } = useContext(MyContext);
    const { catagory } = useParams();
    const [res, setRes] = useState([]);



    async function loadData() {
        let api;
        switch (catagory) {
            case "movie": api = await db.db_Movie(); break;
            case "tv": api = await db.db_Tv(); break;
        }
        dataNum != 1 ? setRes([...res,...api.data.results]) : setRes(api.data.results);

    }

    

    useEffect(() => {
        loadData()
    }, [dataNum, catagory])

    useEffect(() => {
        setNum(1)
    }, [catagory])
    
    const page = () => {
        setNum(dataNum + 1);
    }

    async function search(catagory, query) {
        const result = await db.db_Search(catagory, query); // db.Search 메서드를 사용하여 검색 결과 가져옴
        setRes(result.data.results); // 검색 결과를 상태에 설정
    }
    
    const handleSearch = (e) => {
        e.preventDefault();
        search(catagory,searchQuery)

    };



    return (
        <>

            <div className='container'>
                <h2>{catagory}</h2>
                <div className='search'>
                <form onSubmit={handleSearch}>
                <input type='text' name='search'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='검색어를 입력하세요'>

            </input>
                <input type='submit' value="검색"></input>
                </form>
            </div>
                <div className='img-list'>
                    <ul>
                        {res.map(item => (
                            <li key={item.id}>
                                <Link to={`/${catagory}/${item.id}`}>
                                    <figure>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt='Poster'></img>
                                        <figcaption>
                                            {item.title ? item.title : item.name}
                                        </figcaption>
                                    </figure>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
        <div className='more-btn'>
            <button onClick={page}>Load More</button>
        </div>
            </div>
        </>
    )
}

export default List