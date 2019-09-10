
function getUserType(user){
    let redirect = ''
    switch(user){
        case '1', 1:
            redirect = 'client'	
            break;
        case '2', 2:
            redirect = 'worker'	
            break;
    }
    return redirect
  };
  

module.exports = {getUserType};