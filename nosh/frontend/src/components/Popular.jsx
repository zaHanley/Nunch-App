import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import axios from 'axios';


function Popular() {
    const [ popular, setPopular ] = useState([])
  

    // const getPopular = async () => {
        
    //     const check = localStorage.getItem('popular')
    //     if (check) {
    //         console.log('local: ', JSON.parse(check))
    //         setPopular(JSON.parse(check))
    //     } else {
    //         const api = await axios.get('/api/popular')
    //         const data = await api.json()
    //         localStorage.setItem('popular', JSON.stringify(data.recipes))
    //         console.log('api called: ', data.recipes)
    //         setPopular(data.recipes)
    //     }
        
    // }

    const getPopular = async () => {
        // const popularFromMemory = localStorage.getItem('popular')
        // if (popularFromMemory) {
        //     console.log('local :', JSON.parse(popularFromMemory))
        //     setPopular(JSON.parse(popularFromMemory))
        // } else {
            const response = await axios.get('/api/popular')
            console.log('api called: ', response.data.recipes)
            localStorage.setItem('popular', JSON.stringify(response.data.recipes))
            setPopular(response.data.recipes)
        // }
        
    }

    useEffect(() => {
        getPopular()
    }, [])
    
    

    const Gradient = styled.div`
        z-index: 3;
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))`
    
    const Wrapper = styled.div`
        margin: 4rem 0rem;
        `;
    const Card = styled.div`
        min-height: 25rem;
        min-width: 25rem;
        border-radius: 2rem;
        overflow: hidden;
        postition: relative;

        img{
            border-radius: 2rem;
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        p{
            position: absolute;
            z-index: 10;
            left: 50%;
            bottom: 0%;
            transform: translate(-50%, 0%);
            color: white;
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 1rem;
            height: 40%;
            display: flex;
            justify-content: center;
            alignt-items: center;
        }
        `

  return (
    <div>
        <h3>discover what's cooking</h3>
        {popular.length > 0 && ( 
        <Wrapper>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '1rem',
            }}>
            {popular.map((recipe) => {
                return (
                    
                    <SplideSlide key={recipe.id}>
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <Card>
                        <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title} />
                        <Gradient />
                    </Card>
                    </a>
                    </SplideSlide>
                );
            })}
            </Splide>
        </Wrapper> )} 
    </div>
    
  )

  
}

export default Popular