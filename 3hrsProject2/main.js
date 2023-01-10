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



    axios.post("https://crudcrud.com/api/f9bf2d3cd62241abbd7811525e9e73f6/OnlineShopping",obj)
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
    axios.get("https://crudcrud.com/api/f9bf2d3cd62241abbd7811525e9e73f6/OnlineShopping")
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
            <button onclick=deleteUser('${user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;

    }

    else if (user.category==="Food") {
        const parentNode = document.getElementById('Food');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
    
    else {
        const parentNode = document.getElementById('SkinCare');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;


    }

        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id}')> Delete User </button> 
            </li>`
     
}

function deleteUser(category){
    axios.delete(`https://crudcrud.com/api/f9bf2d3cd62241abbd7811525e9e73f6/OnlineShopping/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })

    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);

}   

function removeUserFromScreen(category){
    console.log(userId.category)

    if (obj.category==="Electronics") {
        const parentNode = document.getElementById('Electronics');
        const childNodeToBeDeleted = document.getElementById(userId);
        if(childNodeToBeDeleted) {
            parentNode.removeChild(childNodeToBeDeleted)
        }

    }

    else if (obj.category==="Food") {
        const parentNode = document.getElementById('Food');
        const childNodeToBeDeleted = document.getElementById(userId);
        if(childNodeToBeDeleted) {
            parentNode.removeChild(childNodeToBeDeleted)
        }
    }

    else {
        const parentNode = document.getElementById('SkinCare');
        const childNodeToBeDeleted = document.getElementById(userId);
        if(childNodeToBeDeleted) {
            parentNode.removeChild(childNodeToBeDeleted)
        }
    }
    
}

    