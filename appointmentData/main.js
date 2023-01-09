function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.mobile.value;
    //localStorage.setItem('name', name);
    //localStorage.setItem('email', email);

    const obj = {
        name,
        email,
        mobile
    }

    axios.post("https://crudcrud.com/api/99ef6f4b452e4c9b81147ed7c28dcaa0/AppointmentData",obj)
        .then((response) => {
            console.log(response)
        })
 
        .catch((err) => {
            console.log(err)
        })
    //localStorage.setItem(obj.email, JSON.stringify(obj));

    showNewUserOnScreen(obj);
}

function showNewUserOnScreen (user) {

    document.getElementById('email').value='';
    document.getElementById('name').value='';
    document.getElementById('mobile').value='';

    
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} - ${user.mobile}
        <button onclick=deleteUser('${user.email}')> Delete User </button> 
        <button onclick=editUser('${user.email}','${user.name}','${user.mobile}')> Edit User </button>
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

function editUser(emailId, name, mobile) {
    document.getElementById('email').value=emailId;
    document.getElementById('name').value=name;
    document.getElementById('mobile').value=mobile;

    deleteUser(emailId)

}
    