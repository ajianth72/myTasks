function submitHandler(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const name = event.target.name.value;
    const category = event.target.category.value;
    
    const obj = {
        price,
        name,
        category
    }

    axios.post("https://crudcrud.com/api/76ec0b33448944c19301f4f24f74c23b/OnlineShopping",obj)
        .then((response) => {
            showNewUserOnScreen(response.data);
        })
 
        .catch((err) => {
            console.log(err)
        });
    
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/76ec0b33448944c19301f4f24f74c23b/OnlineShopping")
    .then((response) => {
        for (var i=0; i<response.data.length; i++) {
            showNewUserOnScreen(response.data[i])
        }
    })

    .catch((error) => {
        console.log(error)
    })
})


function showNewUserOnScreen(user) {

    document.getElementById('price').value='';
    document.getElementById('name').value='';


    if (user.category==="Electronics") {

        const parentNode = document.getElementById('Electronics');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id}','${user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;

    }

    else if (user.category==="Food") {
        const parentNode = document.getElementById('Food');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id}','${user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;
    }
    
    else {
        const parentNode = document.getElementById('SkinCare');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
            <button onclick=deleteUser('${user._id}','${user.category}')> Delete User </button> 
            </li>`
    
        parentNode.innerHTML = parentNode.innerHTML+childHTML;


    }
     
}

function deleteUser(userId,category){
    axios.delete(`https://crudcrud.com/api/76ec0b33448944c19301f4f24f74c23b/OnlineShopping/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId,category)
        })
        .catch((err) => {
            console.log(err)
        })

}   

function removeUserFromScreen(userId,category){
    if (category==="Electronics") {
        var parentNode = document.getElementById("Electronics");
    }

    else if (category==="Food") {
        var parentNode = document.getElementById("Food");
    }

    else {
        var parentNode = document.getElementById("SkinCare");
    }
    
    const childNodeToBeDeleted = document.getElementById(userId);
    parentNode.removeChild(childNodeToBeDeleted)

    
}

    