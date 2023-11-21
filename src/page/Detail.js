import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '../scss/Detail.scss'
import axios from 'axios';

function Detail() {

    let param = useParams();
    const [detailData,setDetailData] = useState({});

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/${param.catagory}/${param.id}?api_key=f89a6c1f22aca3858a4ae7aef10de967`)
            .then(res=>{
                setDetailData(res.data);
            })
            .catch(error => {
                console.error('API 요청 오류:', error);
            });
    },[])
    if(!detailData.id) return <></>;
    return (
        <>
            <div className='banner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${detailData.backdrop_path})` }}></div>
            <div className='movie-con'>
                <div className='left'>
                <img src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`}lt='Poster'></img>
                </div>
                <div className='right'>
                    <h2 className='title'>{detailData.title ? detailData.title : detailData.name}</h2>
                    <div className='genre-list'>
                        {
                            detailData.genres.map(v=>( <span key={v.id}>{v.name}</span>)) 
                        }
                    </div>
                    <p className='overview'>{detailData.overview}</p>
                </div>
            </div>
        </>
    )
}

export default Detail