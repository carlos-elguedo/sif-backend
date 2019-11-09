
function getUserType(user){
    let redirect = ''
    switch(+user){
        case 1:
            redirect = 'client'	
            break;
        case 2:
            redirect = 'worker'	
            break;
        default:
            console.log('the user type is invalid')
    }
    return redirect
  };
  

module.exports = {getUserType};