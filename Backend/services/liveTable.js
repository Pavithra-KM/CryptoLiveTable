import axios from "axios";
const functions = {};

functions.insertLiveData = () => {
  return new Promise(async (resolve, reject) => {
        const coinIds = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'bitcoin-cash'];
        setInterval(async() => {
            for (const coinId of coinIds) {
                try {
                    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=CG-vcXreiWCNoF1XPuz6as7oejq`);
    
                    let data = response.data
                    let insertObj = {
                        'coinName': data.name,
                        'coinSymbol': data.symbol.toUpperCase(),
                        'marketRank': data.market_cap_rank,
                        'currentPrice': data.market_data.current_price.usd,
                        'marketCap': data.market_data.market_cap.usd,
                        'high_24hours': data.market_data.high_24h.usd,
                        'low_24hours': data.market_data.low_24h.usd,
                        'totalVolume': data.market_data.total_volume.usd,
                        'circulationSupply': data.market_data.circulating_supply,
                        'totalSupply': data.market_data.total_supply
                    }
                    pricesCollection.insertOne(insertObj, (err, response) => {
                        if (err) console.log(err) 
                        resolve({
                            status: "Success",
                          })
                    })
                    
                } catch (error) {
                    reject({
                        status: "Failed",
                        error: error
                      });
                }
            }
        }, 3000);
  })
}

functions.getCryptoLiveData = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            pricesCollection.find({coinSymbol: body.coin}).sort({_id: -1}).skip(0).limit(20).toArray((err, response) => {
                if (err) console.log(err);
                resolve({
                    status: "Success",
                    response: response
                  })
            })
              
          } catch (error) {
              reject({
                  status: "Failed",
                  error: error
                });
          }          
    })
  }

export default functions;