import liveTableService from "../services/liveTable.js";

const functions = {};

functions.insertLiveData = async(req, res) => { 
    try {
       res.send({
            status: "Sucess",
            result: await liveTableService.insertLiveData()
        })
    } catch (error) {
        res.send({
            status: "Failed"
        })
    }
}

functions.getCryptoLiveData = async(req, res) => { 
    try {
       res.send({
            status: "Sucess",
            result: await liveTableService.getCryptoLiveData(req.body)
        })
    } catch (error) {
        res.send({
            status: "Failed"
        })
    }
}

export default functions;