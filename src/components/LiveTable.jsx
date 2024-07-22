import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLiveCryptoData, setCryptoName, setStatus } from '../liveDataSlice';
import '../index.css';

function LiveTable() {
    const liveData = useSelector((state) => state.liveCryptoData.liveCryptoData);
    const cryptoName = useSelector((state) => state.liveCryptoData.cryptoName);
    const status = useSelector((state) => state.liveCryptoData.status);
    const dispatch = useDispatch();
    const isMountRef = useRef(false);

    useEffect(() =>{
        if(!isMountRef.current) {
            isMountRef.current = true;
            fetch(`/api/getLiveData`, {
                method: "GET",
                headers: {
                    accept: 'application/json'
                }
            }).then(async(response) => {
                const data = await response.json();
            })
        }
    }, [])

    useEffect(() =>{
            let interval = setInterval(() => {
                if(cryptoName){
                    fetch(`/api/getCryptoLiveData`, {
                        method: "POST",
                        body: JSON.stringify({
                            coin: cryptoName
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(async(response) => {
                        const data = await response.json();
                        dispatch(setLiveCryptoData(data?.result?.response))
                        dispatch(setStatus(true))
                    })
                }
            }, 5000) 
        return () => {
            clearInterval(interval);
        }
    }, [cryptoName])

    return (
        <div>
            <h2>Live Crypto Table</h2>
            <label>Select crypto: </label>
            <select name="crypto" className='dropdown' onChange={(e) => {
                dispatch(setCryptoName(e.target.value))
                dispatch(setStatus(false))
            }}>
                <option>Select</option>
                <option value={"BTC"}>Bitcoin</option>
                <option value={"ETH"}>Ethereum</option>
                <option value={"XRP"}>XRP</option>
                <option value={"LTC"}>Litecoin</option>
                <option value={"BCH"}>Bitcoin Cash</option>
            </select>
            {(liveData?.length > 0 && status) ? 
             <table>
                    <thead>
                        <tr>
                        <th>Price</th>
                        <th>Market Rank</th>
                        <th>Market Cap</th>
                        <th>24 Hours High</th>
                        <th>24 Hours Low</th>
                        <th>Total Volume</th>
                        <th>Circulating Supply</th>
                        <th>Total Supply</th>
                        </tr>
                    </thead>
                    <tbody>
                    {liveData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{data?.currentPrice}</td>
                                <td>{data?.marketRank}</td>
                                <td>{data?.marketCap}</td>
                                <td>{data?.high_24hours}</td>
                                <td>{data?.low_24hours}</td>
                                <td>{data?.totalVolume}</td>
                                <td>{data?.circulationSupply}</td>
                                <td>{data?.totalSupply}</td>
                            </tr>
                        )
                    })}
                    </tbody>
            </table> 
            : <div>Loading...</div>}
        </div>
    );
}

export default LiveTable;