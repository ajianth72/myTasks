function saveToLocalStorage(event) {
    event.preventDefault();
    const Expenseamount = event.target.Expenseamount.value;
    const Description = event.target.Description.value;
    const Category = event.target.Category.value;

    const obj = {
        Expenseamount,
        Description,
        Category
    }
    localStorage.setItem(obj.Description,JSON.stringify (obj));
    showNewExpensesOnScreen(obj);
}

window.addEventListener('DOMContentLoaded', () => {

  const localStorageObj = localStorage;
  const localStorageKeys = Object.keys(localStorageObj)

  for(var i=0; i<localStorageKeys.length;i++){
    const key = localStorageKeys[i]
    const expensesDetailsString = localStorageObj[key];
    const expensesDetailsObj = JSON.parse(expensesDetailsString);
    showNewExpensesOnScreen(expensesDetailsObj)
  }
})

function showNewExpensesOnScreen(expense){
  document.getElementById('Description').value = '';
  document.getElementById('Expenseamount').value = '';
  document.getElementById('Category').value = '';
  console.log(localStorage.getItem(expense.Descriptions))
  if(localStorage.getItem(expense.Description) !== null){
    removeExpensesFromScreen(expense.Description)
  }

  const parentNode = document.getElementById('TotalExpenses');
  const childHtml = `<li id=${expense.Description}> ${expense.Expenseamount}-${expense.Description}-${expense.Category}
                          <button onclick = deleteExpenses('${expense.Description}')> Delete </button>
                          <button onclick = editExpensesDetails('${expense.Description}','${expense.Expenseamount}','${expense.Category}')>Edit </button>

                      </li> `

  parentNode.innerHTML=parentNode.innerHTML+childHtml;
}
//edit function

function editExpensesDetails(Descriptions,Expenseamount,Category){
  document.getElementById('Description').value = Descriptions;
  document.getElementById('Expenseamount').value = Expenseamount ;
  document.getElementById('Category').value = Category;

  deleteExpenses(Descriptions)

}

//delete function

function deleteExpenses(Descriptions){
  // console.log(Descriptions)
  localStorage.removeItem(Descriptions);
  removeExpensesFromScreen(Descriptions);
}

function removeExpensesFromScreen(Descriptions){
  const parentNode = document.getElementById('TotalExpenses');
  const childNodeToBeDeleted = document.getElementById(Descriptions);
  if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted)
  }
}
