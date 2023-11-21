import React, { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../Context';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import '../scss/Home.scss'
import { Link } from 'react-router-dom';



function Home() {
    const [data, setData] = useState({
        movieUpcoming: [],
        moviePopular: [],
        tvPopular: [],
        tvTopRated: [],
    });

    const { db } = useContext(MyContext);

    async function fetchData() {
        try {
            const response = await db.db_All();

            setData(response);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])





    return (
        <>
            <div className="main-top">
                <Swiper className="mySwiper">
                    {data.moviePopular.map((item, k) => (
                        k <= 10 && (
                            <SwiperSlide key={item.id} className='box'>
                                <div className='bg'>
                                    <div className='txt-box'>
                                        <p className='title'>{item.original_title}</p>
                                        <p className='info'>{item.overview}</p>
                                        <Link className='btn-box' to={`/movie/${item.id}`}>
                                            <button>시청</button>
                                        </Link>
                                    </div>
                                    <div className='img-box'>
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt='Poster'></img>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    ))}
                </Swiper>
            </div>

            <div className='container'>
                <div className='con'>
                    <div className='top'>
                        <h2>moviePopular</h2>
                        <Link to={`/movie`}>
                        <button>View More</button>
                        </Link>
                    </div>
                    <div className='bottom'>
                    <Swiper className="mySwiper" spaceBetween={50} slidesPerView={6}>
                            <div>
                            {data.moviePopular.map(item => (
                            <SwiperSlide key={item.id}>
                                    <Link to={`/movie/${item.id}`}>
                                    <figure>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt='Poster'></img>
                                            <figcaption>
                                                {item.original_title}
                                            </figcaption>
                                    </figure>
                                    </Link>
                            </SwiperSlide>
                        ))}
                            </div>
                        </Swiper>
                    </div>
                </div>

                <div className='con'>
                    <div className='top'>
                        <h2>movieUpcoming</h2>
                        <Link to={`/movie`}>
                        <button>View More</button>
                        </Link>
                    </div>
                    <div className='bottom'>
                    <Swiper className="mySwiper" spaceBetween={50} slidesPerView={6}>
                            <div>
                            {data.movieUpcoming.map(item => (
                            <SwiperSlide key={item.id}>
                                    <Link to={`/movie/${item.id}`}>
                                    <figure>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt='Poster'></img>
                                            <figcaption>
                                                {item.original_title}
                                            </figcaption>
                                    </figure>
                                    </Link>
                            </SwiperSlide>
                        ))}
                            </div>
                        </Swiper>
                    </div>
                </div>

                <div className='con'>
                    <div className='top'>
                        <h2>tvPopular</h2>
                        <Link to={`/tv`}>
                        <button>View More</button>
                        </Link>
                    </div>
                    <div className='bottom'>
                    <Swiper className="mySwiper" spaceBetween={50} slidesPerView={6}>
                            <div>
                            {data.tvPopular.map(item => (
                            <SwiperSlide key={item.id}>
                                    <Link to={`/tv/${item.id}`}>
                                    <figure>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt='Poster'></img>
                                            <figcaption>
                                                {item.name}
                                            </figcaption>
                                    </figure>
                                    </Link>
                            </SwiperSlide>
                        ))}
                            </div>
                        </Swiper>
                    </div>
                </div>

                <div className='con'>
                    <div className='top'>
                        <h2>tvTopRated</h2>
                        <Link to={`/tv`}>
                        <button>View More</button>
                        </Link>
                    </div>
                    <div className='bottom'>
                    <Swiper className="mySwiper" spaceBetween={50} slidesPerView={6}>
                            <div>
                            {data.tvTopRated.map(item => (
                            <SwiperSlide key={item.id}>
                                    <Link to={`/tv/${item.id}`}>
                                    <figure>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt='Poster'></img>
                                            <figcaption>
                                                {item.name}
                                            </figcaption>
                                    </figure>
                                    </Link>
                            </SwiperSlide>
                        ))}
                            </div>
                        </Swiper>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Home