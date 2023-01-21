let total=0;
function saveToLocalStorage(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const name = event.target.name.value;

    const obj = {
        price,
        name,
    }

    axios.post("https://crudcrud.com/api/14b701cba8294db6903c4b344f9e4f34/OnlineShopping",obj)
        .then((response) => {
            console.log(response)
        })
 
        .catch((err) => {
            console.log(err)
        })

    showNewUserOnScreen(obj);

}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/14b701cba8294db6903c4b344f9e4f34/OnlineShopping")
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

    total+=parseInt(user.price);

    document.getElementById('price').value='';
    document.getElementById('name').value='';

    const parentNode = document.getElementById('listOfProducts');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.price}
        <button onclick=deleteProduct('${user._id}','${user.price}')> Delete Product </button> 
        </li>`

        parentNode.innerHTML = parentNode.innerHTML+childHTML;

    showTotalPrice(user._id,total)


}

function showTotalPrice(userId,total) {
    const ParentNode = document.getElementById('TotalPrice');
    const ChildHTML = `<h3 id=${userId}> Total Price of Products: Rs ${total}
        </h3>`

    ParentNode.innerHTML = ChildHTML;
}

function deleteProduct(userId,price){

    total-= price;
    showTotalPrice(userId,total)

    axios.delete(`https://crudcrud.com/api/14b701cba8294db6903c4b344f9e4f34/OnlineShopping/${userId}`)
        .then((response) => {
            removeProductFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })

    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);

}   

function removeProductFromScreen(userId){

    const parentNode = document.getElementById("listOfProducts");
   
    const childNodeToBeDeleted = document.getElementById(userId);

    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
    
}
