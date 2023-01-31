import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {server} from '../index';
import {RadioGroup,Radio, Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from "./ErrorComponent";
import CoinCard from './CoinCard';


const Coins = () => {
    
    const[coins,setCoins] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(false);
    const[page,setPage] = useState(1);
    const[currency,setCurrency] = useState("inr")

    const currencySymbol = currency==="inr" ? "₹" : currency==="eur"?"€":"$";

    // const changePage =(page)=>{
    //     // setPage(page);
    //     // setLoading(true);
    // };


    useEffect (() => {
        const fetchCoins = async() => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&per_page=10&page=${page}`);
                setCoins((prev)=>[...prev,...data]);
                setLoading(false);
                // console.log(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCoins();
    },[currency,page]);

    const handleScroll = () => {
        console.log("Height:",document.documentElement.scrollHeight);
        console.log("Top:",document.documentElement.scrollTop);
        console.log("Window:",window.innerHeight);

        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
            setPage(prev => prev+1);
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);
    },[]);

    if(error) 
        return <ErrorComponent message={"Error while fetching Coins"}/>;

    return (
        <Container maxW={'container.xl'}>
            {
                loading ? (<Loader/> )
                :( 
                <>
                <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                    <HStack spacing={"4"}>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                    </HStack>
                </RadioGroup>
                
                    <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
                        {
                            coins.map((i) => (
                                <CoinCard 
                                key={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol}/>
                            ))
                        }
                    </HStack>
                
                    {/* <HStack w={"full"} overflowX={"auto"} p={"8"}>
                        {
                            btns.map((item,index)=>(
                                <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)}>{index+1}</Button>
                            ))
                        }
                    </HStack> */}
                </>)
            }
        </Container>
    )
}

export default Coins
