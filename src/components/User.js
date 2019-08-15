const User = (function () {
    let name = "";
    let user_id = 0;
    let is_admin = false;

    const getName = function() {
      
        if (typeof (Storage) !== "undefined") {
          let temp = localStorage.getItem('full_name');
          if (temp != null) {
            name = temp; 
          }
        }
  
        return name;    // Or pull this from cookie/localStorage
      };

    const setName = function(n) {
        if (n!==null) {
          name = n;     
          // Also set this in cookie/localStorage
          if (typeof (Storage) !== "undefined") {
            localStorage.setItem('name', name);
          }
        }
    };

    const getUserId = function() {
        if (typeof (Storage) !== "undefined") {
          let temp = localStorage.getItem('user_id');
          if (temp != null) {
            user_id = temp; //playerA or playerB
          }
        }
          return user_id;    // Or pull this from cookie/localStorage
    };
      
    const setUserId = function(id) {
        user_id = id;     
          // Also set this in cookie/localStorage
          //console.log(user_id);
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem('user_id', user_id);
        }
    };
      
    const isAdmin = function() {
        if (typeof (Storage) !== "undefined") {
          let temp = localStorage.getItem('is_admin');
          if (temp != null ) {
            if (temp==="true" || temp === true) {
              is_admin = true;
            } else {
              is_admin = false;
            }
          }
        }
        return is_admin;    // Or pull this from cookie/localStorage
      };
      
    const setAdmin = function(ad) {
        is_admin = ad;     
          // Also set this in cookie/localStorage
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem('is_admin', is_admin);
        }
    };
      
      return {
        getUserId: getUserId,
        setUserId: setUserId,
        getName: getName,
        setName: setName,
        isAdmin: isAdmin,
        setAdmin: setAdmin
      }
    
  } )();

export default User;