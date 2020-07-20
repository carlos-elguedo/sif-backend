/**
 * incorrect:
 * ret: 0-> Info empty
 * ret: 1-> the data no meet the size minumum
 * ret: 2-> Email or number phone not valid
 *
 * succes
 * ret: 10-> info correct, register with email
 * ret: 11-> info correct, register with number phone
 *
 */

const CONSTANTS = require('../constants')

function verifiUserToRegister(user) {
  var ret = 0;

  //console.log("User name: " + user);
  if (
    user.register_name !== '' &&
    user.register_data_register !== '' &&
    user.register_password !== '' &&
    user.register_age !== ''
  ) {
    //console.log("Info correct", user.register_using);

    //First, we check the info
    if (
      correctLength(user.register_name, 4) &&
      correctLength(user.register_password, 6) &&
      correctDate(user.register_age) &&
      correctUserType(user.register_type)
    ) {
      // console.log("size correct")
      let register_with = user.register_using ? user.register_using : 0;
      //Now, we check the data for the register
      switch (+register_with) {
        case 0:
          //console.log('Cheking email')
          correctEmail(user.register_data_register) ? (ret = 10) : (ret = 2);
          break;
        case 1:
          //console.log('Cheking phone')
          correctNumberPhone(user.register_data_register)
            ? (ret = 11)
            : (ret = 2);
          break;
        default:
          break;
      }
    } else {
      // console.log("size incorrect");
      // console.log(correctLength(user.register_name, 4))
      // console.log(correctLength(user.register_password, 6))
      // console.log(correctDate(user.register_age))
      // console.log(correctUserType(user.register_type))

      ret = 1;
    }
  } else {
    console.log('Info incorrect');
    ret = 0;
  }

  return ret;
}

/**
 * ret: 0-> Info empty
 * ret: 1-> the data no meet the size minumum
 * ret: 2-> Email or number phone not valid
 *
 * ret: 10-> Info correct with email
 * ret: 10-> Info correct with number phone
 *
 * @param {*} user
 */
function verifiUserToLogin(user) {
  var ret = 0;

  //console.log("User name: " + user.register_name);
  if (user.login_data !== '' && user.login_password !== '') {
    //First, we check the name
    if (
      correctLength(user.login_data, 6) &&
      correctLength(user.login_password, 6)
    ) {
      //Now, we check the data for the register
      if (correctEmail(user.login_data)) {
        ret = 10;
      } else {
        correctNumberPhone(user.login_data) ? (ret = 11) : (ret = 2);
        //ret = 3;
      }
    } else {
      ret = 1;
    }
  } // else -> info empty

  return ret;
}

function verifyUserWorkerToUpdate(data) {
  let ret = {
    correct: false,
    message: 'Los datos estan vacios',
    type: 'error',
    toUpdate: []
  };



  const {
    codeCategorieSelect,
    codeProfessionSelect,
    edit_first_name,
    edit_last_name,
    edit_email,
    edit_phone,
    edit_area_code,
    edit_address,
  } = data;

  //1. Validate empty values
  if (
    codeCategorieSelect !== '' ||
    codeProfessionSelect !== '' ||
    edit_first_name !== '' ||
    edit_last_name !== '' ||
    edit_email !== '' ||
    edit_phone !== '' ||
    edit_area_code !== '' ||
    edit_address !== ''
  ) {
    //2. Correct Length
    if (edit_first_name && !correctLength(edit_first_name, 4)) {
      ret.message = 'El nombre debe contener al menos 4 caracteres';
      ret.type = 'warning';
      return ret;
    }

    if (edit_last_name && !correctLength(edit_last_name, 4)) {
      ret.message = 'El apellido debe contener al menos 4 caracteres';
      ret.type = 'warning';
      return ret;
    }

    if (edit_email && !correctEmail(edit_email)) {
      ret.message = 'El correo electronico no es correcto';
      ret.type = 'warning';
      return ret;
    }

    if (edit_phone && !correctNumberPhone(edit_phone)) {
      ret.message = 'El numero telefonico no es correcto';
      ret.type = 'warning';
      return ret;
    }

    if (edit_area_code && !correctAreaCodePhone(edit_area_code)) {
      ret.message = 'El Codigo de area ingresado no es correcto';
      ret.type = 'warning';
      return ret;
    }

    if (edit_address && !correctLength(edit_address, 6)) {
      ret.message = 'La direccion ingresada es muy corta';
      ret.type = 'warning';
      return ret;
    }

    //Validate profession and categorie

    if(edit_first_name)ret.toUpdate.push(CONSTANTS.props_to_update.first_name);
    if(edit_last_name)ret.toUpdate.push(CONSTANTS.props_to_update.last_name);
    if(edit_email)ret.toUpdate.push(CONSTANTS.props_to_update.email);
    if(edit_phone)ret.toUpdate.push(CONSTANTS.props_to_update.phone);
    if(edit_area_code)ret.toUpdate.push(CONSTANTS.props_to_update.area_code);
    if(edit_address)ret.toUpdate.push(CONSTANTS.props_to_update.address);

    //if(codeCategorieSelect)ret.toUpdate.push(CONSTANTS.props_to_update.categorie);
    if(codeCategorieSelect && codeProfessionSelect)ret.toUpdate.push(CONSTANTS.props_to_update.profession);

    ret.message = 'Correcto';
    ret.correct = true;
    ret.type = '';
  }

  return ret;
}

/**
 * Functions own this file
 */

/**
 * 1. Function for check the size of a text
 */
function correctLength(text, minLength) {
  var ret = false;

  if (text.length >= minLength) {
    ret = true;
  }
  //alert(minimo + " - Talla menor bless: " + cadena.length);
  return ret;
}

/**
 * 2. Function for to see if data is correct email
 */
function correctEmail(posibleEmail) {
  var ret = false;
  expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!expr.test(posibleEmail)) {
    ret = false;
  } else {
    ret = true;
  }
  //console.log('Email correcto: ', ret);
  return ret;
}

/**
 * 3. Function for to see if data is Correct number phone
 */
function correctNumberPhone(posibleNumber) {
  var ret = false;

  var expr = /^([0-9]+){9}$/; //<--- con esto vamos a validar el numero
  var expr2 = /\s/; //<--- con esto vamos a validar que no tenga espacios en blanco

  if (!expr2.test(posibleNumber)) {
    if (expr.test(posibleNumber)) {
      ret = true;
    }
  }

  return ret;
}

/**
 * 4. Function for check if date is Correct
 */
function correctDate(date) {
  var ret = false;

  var fechaf = date.split('-');
  var day = fechaf[2];
  var month = fechaf[1];
  var year = fechaf[0];
  year2 = parseInt(year);

  if (year2 < 2000 && year2 > 1900) {
    ret = true;
  }

  // console.log("Fecha: " + ret)
  return ret;
}

/**
 * Correct Type user
 */
function correctUserType(userType) {
  var ret = false;
  userType === 1 || userType === 2 || userType === '1' || userType === '2'
    ? (ret = true)
    : (ret = false);
  return ret;
}

module.exports = {
  verifiUserToRegister,
  verifiUserToLogin,
  verifyUserWorkerToUpdate,
};
