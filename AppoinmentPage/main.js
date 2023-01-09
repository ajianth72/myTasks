    function saveToLocalStorage(event){
        event.preventDefault();
        const name =event.target.username.value;
        const email =event.target.emailid.value;
        const phone =event.target.phoneno.value;

        localStorage.setItem('name',name);
        localStorage.setItem('email',email);
        localStorage.setItem('phone',phone);
        const obj = {
            name,
            email,
            phone
        }
        axios.post("https://crudcrud.com/api/76587ab4c082426496a3c32b535b01cd/appointmentdata",obj)
        .then((response)=>{
            showNewUsersOnScreen(response.data)
            console.log(response)

        })
        .catch((error)=>{
            console.log(error);

        })


        // localStorage.setItem('userDetails', JSON.stringify(obj));
    }

    function showNewUserOnScreen(user) {

        document.getElementById('email').value='';
        document.getElementById('name').value='';
    
        
        const parentNode = document.getElementById('listOfUsers');
        const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
            <button onclick=deleteUser('${user.email}')> Delete User </button> 
            <button onclick=editUser('${user.email}','${user.name}')> Edit User </button>
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
    
    function deleteUser(emailId){
        console.log(emailId)
        localStorage.removeItem(emailId);
        removeUserFromScreen(emailId);
    
    }   
    
    function removeUserFromScreen(emailId){
        const parentNode = document.getElementById('listOfUsers');
        const childNodeToBeDeleted = document.getElementById(emailId);
    
        parentNode.removeChild(childNodeToBeDeleted)
    }
    
    function editUser(emailId, name) {
        document.getElementById('email').value=emailId;
        document.getElementById('name').value=name;
    
        deleteUser(emailId)
    
    }
