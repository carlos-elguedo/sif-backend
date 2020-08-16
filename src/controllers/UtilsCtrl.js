/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

//Controller to export
const UtilsCtrl = {};

UtilsCtrl.test = async (req, res) => {
  res.json({
    status: 'Llego al test'
  });
};

module.exports = UtilsCtrl;
