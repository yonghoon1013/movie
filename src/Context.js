import axios from 'axios';
import { children, createContext, useEffect, useReducer } from 'react'
import React, { useState } from 'react';
export const MyContext = createContext();

export default function Context({ children }) {

    const [dataNum, setNum] = useState(1);

    const themoviedb = axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        params: { api_key: 'f89a6c1f22aca3858a4ae7aef10de967' }
    })

    let db = {
        cStr1: ['movie', 'tv'],
        cStr_2: ['upcoming', 'popular', 'top_rated'],
        img_origin: 'https://image.tmdb.org/t/p/original/',
        img_poster: 'https://image.tmdb.org/t/p/w500/',
        db_All : async function(){
            //전체
                const res = await Promise.all([
                    themoviedb.get(`/${db.cStr1[0]}/${db.cStr_2[0]}`),
                    themoviedb.get(`/${db.cStr1[0]}/${db.cStr_2[1]}`),
                    themoviedb.get(`/${db.cStr1[1]}/${db.cStr_2[1]}`),
                    themoviedb.get(`/${db.cStr1[1]}/${db.cStr_2[2]}`),
                ]);
    
                return {
                    movieUpcoming: res[0].data.results,
                    moviePopular: res[1].data.results,
                    tvPopular: res[2].data.results,
                    tvTopRated: res[3].data.results,
                }
            },
            db_Movie : async function(){
                return await themoviedb.get(`/${db.cStr1[0]}/${db.cStr_2[1]}`,{params:{page:dataNum}});
            },
            db_Tv : async function(){
                return await themoviedb.get(`/${db.cStr1[1]}/${db.cStr_2[1]}`,{params:{page:dataNum}});
            },
            db_Search: async function (category, searchQuery) {
                return await themoviedb.get(`/search/${category}?query=${searchQuery}`, { params: { page: dataNum } });
            }
    };




    return (
        <MyContext.Provider value={{db,dataNum, setNum}}>
            {children}
        </MyContext.Provider>
    );
}
