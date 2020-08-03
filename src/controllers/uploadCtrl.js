/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */
const userRepository = require('../repositories/users.repo');
const path = require('path');
const fs = require('fs');

//Controller to export
const UploadCtrl = {};

UploadCtrl.profile = async (req, res) => {
  if (!req.files)
    return res.status(400).send({ message: 'No file was selected' });
  const { file } = req.files;

  if (!file)
    return res
      .status(400)
      .send({ message: 'Files does not contains the expected property' });

  const { _id } = req.user;
  let name_file = _id + '.' + file.path.split('.').pop();
  fs.copyFileSync(
    file.path,
    `${path.join('src', 'assets', 'img', 'perfil', '/')}${name_file}`
  );

  let update = await userRepository.changeImageProfile(_id, name_file);

  if(update){
    return res
      .send({ message: 'The image was update successfully' });
  }else{
    return res
      .status(500)
      .send({ message: 'The image was not updated successfully, please try again' });
  }
  
};

module.exports = UploadCtrl;
