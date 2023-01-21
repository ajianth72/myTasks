let total=0;
function saveToLocalStorage(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const name = event.target.name.value;

    const obj = {
        price,
        name,
    }

    async function postDetails() {
        
        try {
            const response = await axios.post("https://crudcrud.com/api/2d71730f5ead4d7d8e62c46c7bb60b49/OnlineShopping",obj)
            console.log(response)

            showNewUserOnScreen(obj);
        }

        catch(err) {
            console.log(err)
        }
    }

    postDetails()

}

window.addEventListener("DOMContentLoaded", () => {

    async function getDetails() {
        
        try {
            const response = await axios.get("https://crudcrud.com/api/2d71730f5ead4d7d8e62c46c7bb60b49/OnlineShopping")
            console.log(response)

            for (let i=0; i<response.data.length; i++) {
                showNewUserOnScreen(response.data[i])
            }
        }
        
        catch(err) {
            console.log(err)
        }
    }
    
    getDetails()
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

function deleteProduct(userId,price) {

    total-= price;
    showTotalPrice(userId,total)

    async function deleteDetails() {

        try {
            const response = await axios.delete(`https://crudcrud.com/api/2d71730f5ead4d7d8e62c46c7bb60b49/OnlineShopping/${userId}`)
            console.log(response)
            removeProductFromScreen(userId)
        }
        catch(error) {
            console.log(error)
        }
    }
    deleteDetails()

}   


function removeProductFromScreen(userId){

    const parentNode = document.getElementById("listOfProducts");
   
    const childNodeToBeDeleted = document.getElementById(userId);

    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
    
}
