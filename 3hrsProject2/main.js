function saveToLocalStorage(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const name = event.target.name.value;
    const category = event.target.category.value;
    //localStorage.setItem('name', name);
    //localStorage.setItem('email', email);

    const obj = {
        price,
        name,
        category
    }



    axios.post("https://crudcrud.com/api/df41dcf6b9c64321ab629b345c0b4206/OnlineShopping",obj)
        .then((response) => {
            console.log(response)
        })
 
        .catch((err) => {
            console.log(err)
        })
    //localStorage.setItem(obj.email, JSON.stringify(obj));

    showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/df41dcf6b9c64321ab629b345c0b4206/OnlineShopping")
    .then((response) => {
        console.log(response)

        for (var i=0; i<response.data.length; i++) {
            showNewUserOnScreen(response.data[i])
        }
    })

    .catch((error) => {
        console.log(error)
    })
})


function showNewUserOnScreen (user) {

    document.getElementById('price').value='';
    document.getElementById('name').value='';


    if (user.category==="Electronics") {

        const parentNode = document.getElementById('Electronics');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id,user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;

    }

    else if (user.category==="Food") {
        const parentNode = document.getElementById('Food');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id,user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
    
    else {
        const parentNode = document.getElementById('SkinCare');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id,user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;


    }
     
}

function deleteUser(userId,category){
    axios.delete(`https://crudcrud.com/api/df41dcf6b9c64321ab629b345c0b4206/OnlineShopping/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId,category)
        })
        .catch((err) => {
            console.log(err)
        })

    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);

}   

function removeUserFromScreen(userId,category){
    if (category==="Electronics") {
        const parentNode = document.getElementById("Electronics");
    }

    else if (category==="Food") {
        const parentNode = document.getElementById("Food");
    }

    else {
        const parentNode = document.getElementById("SkinCare");
    }
    
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
    
}

    