/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

//Controller to export
const WorkerCtrl = {}

WorkerCtrl.test = async (req, res) =>{

    res.json({
        status: "Llego al test",
    })

}

WorkerCtrl.update = async (req, res) =>{
    console.log(req.body)
    console.log(req.user)
    res.json({
        status: "Llego al test",
    })

}


module.exports = WorkerCtrl
