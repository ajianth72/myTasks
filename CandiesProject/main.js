const url = "https://crudcrud.com/api/9e417a53d3a14456a2c3611bc0713454";
function submitHandler(event) {
    event.preventDefault();
    const name = event.target.candyName.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;

    const obj = {
        name,
        description,
        price,
        quantity
    }
    axios.post(`${url}/OnlineShopping`,obj)
        .then((response) => {
            console.log(response);
            showItemsOnScreen(response.data);
        })

        .catch((err) => {
            console.log(err)
        })
};

window.addEventListener("DOMContentLoaded", () => {
    axios.get(`${url}/OnlineShopping`)
    .then((response) => {
        console.log(response)

        for (var i=0; i<response.data.length; i++) {
            showItemsOnScreen(response.data[i])
        }
    })

    .catch((error) => {
        console.log(error)
    })
});

function showItemsOnScreen (item) {

    document.getElementById('candyName').value='';
    document.getElementById('description').value='';
    document.getElementById('price').value='';
    document.getElementById('quantity').value='';

    const parentNode = document.getElementById('listOfItems');
    const childHTML = 
        `<li id=${item._id}> ${item.name} - ${item.description} - ${item.price} Rs - <span id=quantity>${item.quantity}</span>
         <button onclick=buyOne('${item._id}','${item.quantity}')>Buy 1</button>
        <button onclick=buyTwo('${item._id}',${item.quantity})>Buy 2</button>
        <button onclick=buyThree('${item._id}',${item.quantity})>Buy 3</button>
                    </li>`

        parentNode.innerHTML = parentNode.innerHTML+childHTML;

        

};

function showQuantity(itemId,quantity) {
    axios.get(`${url}/OnlineShopping/${itemId}`)
        .then((response) => {
            console.log(response.data);
            
            response.data.quantity=quantity;
            showItemsOnScreen(response.data);

        })
        .catch((err) => {
            console.log(err)
        })
}



function buyOne(itemId,quantity) {
    if (quantity<1) {
        alert("Item Not Available");
    }
    quantity -=1;
    const element = document.getElementById(itemId);
    const parent = document.getElementById('listOfItems');
    parent.removeChild(element);
    showQuantity(itemId,quantity);
    

}

function buyTwo(itemId,quantity) {
    if (quantity<2) {
        alert("Item Not Available");
    }
    quantity -=2;
    const element = document.getElementById(itemId);
    const parent = document.getElementById('listOfItems');
    parent.removeChild(element);
    showQuantity(itemId,quantity);

}

function buyThree(itemId,quantity) {
    if (quantity<3) {
        alert("Item Not Available");
    }
    quantity -=3;
    const element = document.getElementById(itemId);
    const parent = document.getElementById('listOfItems');
    parent.removeChild(element);
    showQuantity(itemId,quantity);

}


