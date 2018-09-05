
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

function verifiUserToRegister(user){
    var ret = 0;

    //console.log("User name: " + user.register_name);
    if(user.register_name !== "" && user.register_data_register !== "" && user.register_password !== "" && user.register_age !== ""){
        console.log("Info correct");

        //First, we check the name
        if(correctLength(user.register_name, 4) && correctLength(user.register_password, 6) && correctDate(user.register_age)){
            console.log("size correct")

            //Now, we check the data for the register
            if(correctEmail(user.register_data_register)){
                console.log("email correct");
                ret = 10;
            }else{
                console.log("email incorrect: " + user.register_data_register);
                correctNumberPhone(user.register_data_register)? ret = 11: ret = 2;
                //ret = 3;
            }
        }else{
            console.log("size incorrect");
            ret = 1;
        }


    }else{
        console.log("Info incorrect");
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
function verifiUserToLogin(user){
    var ret = 0;

    //console.log("User name: " + user.register_name);
    if(user.login_data !== "" && user.login_password !== ""){

        //First, we check the name
        if(correctLength(user.login_data, 6) && correctLength(user.login_password, 6)){
            
            //Now, we check the data for the register
            if(correctEmail(user.login_data)){  
                ret = 10;

            }else{
                correctNumberPhone(user.login_data)? ret = 11: ret = 2;
                //ret = 3;
            }
        }else{
            ret = 1;
        }


    }// else -> info empty

    return ret;

    
}










/**
 * Functions own this file
 */



 /**
  * 1. Function for check the size of a text
  */
 function correctLength(text, minLength){
    var ret = false;


    if(text.length >= minLength){
        ret = true;
    }
    //alert(minimo + " - Talla menor bless: " + cadena.length);
    return ret;
 }


/**
 * 2. Function for to see if data is correct email
 */
function correctEmail(posibleEmail){
    var ret = false;
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(posibleEmail) ){
        ret = false;
    }else{
        ret = true;
    }
    return ret;
}


/**
 * 3. Function for to see if data is Correct number phone
 */
function correctNumberPhone(posibleNumber){

    var ret = false;

    var expr=/^([0-9]+){9}$/;//<--- con esto vamos a validar el numero
    var expr2=/\s/;//<--- con esto vamos a validar que no tenga espacios en blanco
 
    if(!expr2.test(posibleNumber)){
        if(expr.test(posibleNumber)){
            ret = true;
        }
    }


    return ret;
}

/**
 * 4. Function for check if date is Correct
 */
function correctDate(date){
    var ret = false;

    var fechaf = date.split("-");
    var day = fechaf[2];
    var month = fechaf[1];
    var year = fechaf[0];
    year2 = parseInt(year);
    
    if(year2 < 2000 && year2 > 1900){
        ret = true;
    }

    console.log("       Fecha: " + ret)
    return ret;
}




module.exports = {verifiUserToRegister, verifiUserToLogin};