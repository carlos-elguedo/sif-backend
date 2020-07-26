/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

//Controller to export
const UploadCtrl = {};

UploadCtrl.profile = async (req, res) => {
  console.log('Llego en el body', req.files);
  res.json({
    status: 'Llego al test upload profile'
  });
};

module.exports = UploadCtrl;
