document.querySelectorAll("input[name='paymentMethod']").forEach((input) => {
    input.addEventListener("change", function() {
        document.querySelectorAll(".payment-description").forEach(desc => desc.style.display = "none");
        document.getElementById(this.id + "Desc").style.display = "block";
    });
});

// // Trigger initial selection display
// document.getElementById("bankTransferDesc").style.display = "block";

var userNameRege=document.getElementById('userNameRege');
var userEmailRege=document.getElementById('userEmailRege');
var LastName=document.getElementById('LastName');
var country=document.getElementById('country');
var streetName=document.getElementById('streetName');
var companyName=document.getElementById('companyName');
var apartment=document.getElementById('apartment');
var town=document.getElementById('town');
var phone=document.getElementById('phone');
var informationTextArea=document.getElementById('informationTextArea');


var userEmailAlert=document.getElementById('userEmailAlert');
var userNameAlert=document.getElementById('userNameAlert');
var userLastNameAlert=document.getElementById('userLastNameAlert');
var userStreetAlert=document.getElementById('userStreetAlert');
var userTownAlert=document.getElementById('userTownAlert');
var userPhoneAlert=document.getElementById('userPhoneAlert');

var BilingDetails=document.getElementById('BilingDetails');
var orderDetails=document.getElementById('orderDetails');
var HeaderDetails=document.getElementById('HeaderDetails');




userNameRege.addEventListener('blur',function(){
    if(userNameRege.value.length<4)
    {
        userNameRege.classList.add('is-invalid')
        userNameRege.classList.remove('is-valid')
        userNameAlert.classList.replace('d-none','d-block')
    }
    else
    {
        userNameRege.classList.remove('is-invalid')
        userNameRege.classList.add('is-valid')
        userNameAlert.classList.replace('d-block','d-none')
    }
})
userEmailRege.addEventListener('blur',function(){
    if(userEmailRege.value.length<4)
    {
        userEmailRege.classList.add('is-invalid')
        userEmailRege.classList.remove('is-valid')
        userEmailAlert.classList.replace('d-none','d-block')
    }
    else
    {
        userEmailRege.classList.remove('is-invalid')
        userEmailRege.classList.add('is-valid')
        userEmailAlert.classList.replace('d-block','d-none')
    }
})
LastName.addEventListener('blur',function(){
    if(LastName.value.length<4)
    {
        LastName.classList.add('is-invalid')
        LastName.classList.remove('is-valid')
        userLastNameAlert.classList.replace('d-none','d-block')
        
    }
    else
    {
        LastName.classList.remove('is-invalid')
        LastName.classList.add('is-valid')
        userLastNameAlert.classList.replace('d-block','d-none')
    }
})
streetName.addEventListener('blur',function(){
    if(streetName.value.length<=4)
    {
        streetName.classList.add('is-invalid')
        streetName.classList.remove('is-valid')
        userStreetAlert.classList.replace('d-none','d-block')
    }
    else
    {
        streetName.classList.remove('is-invalid')
        streetName.classList.add('is-valid')
        userStreetAlert.classList.replace('d-block','d-none')
    }
})
town.addEventListener('blur',function(){
    if(town.value.length<4)
    {
        town.classList.add('is-invalid')
        town.classList.remove('is-valid')
        userTownAlert.classList.replace('d-none','d-block')
    }
    else
    {
        town.classList.remove('is-invalid')
        town.classList.add('is-valid')
        userTownAlert.classList.replace('d-block','d-none')
    }
})
phone.addEventListener('blur',function(){
    if(phone.value.length<12)
    {
        phone.classList.add('is-invalid')
        phone.classList.remove('is-valid')
        userTownAlert.classList.replace('d-none','d-block')
    }
    else
    {
        phone.classList.remove('is-invalid')
        phone.classList.add('is-valid')
        userTownAlert.classList.replace('d-block','d-none')
    }
})


//Register Process

var maillist = []

var success = document.getElementById("success")
var exists = document.getElementById("exists")
//here to get the pervious emails and passowrd and re-push it in the array
if (localStorage.getItem("mailcontainer") != null) {
    maillist = JSON.parse(localStorage.getItem('mailcontainer'))
}
var username1

var confirmOrder = document.getElementById("confirmOrder")
function clearForm(){
userEmailRege.value = ""
    userNameRege.value = ""
    LastName.value = ""
    companyName.value = ""
    streetName.value = ""
    country.value = ""
    apartment.value = ""
    town.value = ""
    phone.value = ""
    informationTextArea.value = ""
}


function IsEmpty() {
    if (userNameRege.value == "" || userEmailRege.value == '' || LastName.value == ""||streetName.value==""||town.value==""||phone.value=="") {
        return false
    }
    else {
        return true

    }
}

var orderNumber=document.getElementById('orderNumber');
var DateTime=document.getElementById('DateTime');
var Total=document.getElementById('Total');
var paymentMethod=document.getElementById('paymentMethod');
var orderConfirmation=document.getElementById('orderConfirmation');
var DateTime=document.getElementById('DateTime');
var formCheckInput=document.querySelectorAll('.form-check-input');

confirmOrder.addEventListener('click',function(e){
    e.preventDefault();
    if (IsEmpty() == true) {
        var addmail =
        {
            name: userNameRege.value,
            Email: userEmailRege.value,
            LastName: LastName.value,
            country: country.value,
            apartment: apartment.value,
            town: town.value,
            phone: phone.value,
            informationTextArea: informationTextArea.value,
        }

        //here to check id the e-mail was stored before or not

            maillist.push(addmail)
            localStorage.setItem("mailcontainer", JSON.stringify(maillist))
            BilingDetails.classList.add('d-none')
            orderDetails.classList.add('d-none')
            HeaderDetails.classList.add('d-none')
            orderConfirmation.classList.replace('d-none','d-block')
            displayCheckOut();
            displayProductDetailsInTable();
            clearForm();
        }
})
   
let totalSum=0;
function displayCheckOut()
{
    orderNumber.innerHTML=Math.floor(Math.random() * 10000);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    DateTime.innerHTML=today;
    cartItems=[];
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        for(let i=0;i<cartItems.length;i++)
            totalSum+=(cartItems[i].price*cartItems[i].quantity);
    }
    Total.innerHTML=totalSum;
    for(let j=0;j<formCheckInput.length;j++)
    {
        if(formCheckInput[j].checked)
            paymentMethod.innerHTML=formCheckInput[j].value;
    }
}



var productsubTotalTable=document.getElementById('productsubTotalTable')
var productPaymentTable=document.getElementById('productPaymentTable')
var productTotalTable=document.getElementById('productTotalTable')
function displayProductDetailsInTable()
{
    let firstTemp=``;
    let secondTemp=``;
    let Temp=`<tr>
    <td>Product</td>
    <td>Total</td>
    </tr>`;
    let totalSum2=0;
    cartItems=[];
    var paymentCheck;
    for(let j=0;j<formCheckInput.length;j++)
        {
            if(formCheckInput[j].checked)
                paymentCheck=formCheckInput[j].value;
        } 
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        for(let i=0;i<cartItems.length;i++)
        {
            totalSum2+=cartItems[i].price*(cartItems[i].quantity);
            firstTemp+=`   <tr>
                                <td id="productNameTable">${cartItems[i].title.split(" ").slice(0, 2).join(" ")}</td>
                                <td id="productpriceTable">$ ${cartItems[i].price}</td>
                              </tr>`
            secondTemp+=` <tr >
                                <td >Subtotal:</td>
                                <td id="productsubTotalTable">$${cartItems[i].price}</td>
                              </tr>`
        }
        Temp+=firstTemp;
        Temp+=secondTemp;
        Temp+=` <tr>
         <td>Payment method:</td>
        <td id="productPaymentTable">${paymentCheck}</td>
        </tr>
        <tr>
        <td>Total:</td>
        <td id="productTotalTable">$${totalSum2}</td>
        </tr>`
        document.getElementById('tableDetails').innerHTML= Temp;
        console.log(Temp)

    }
}

function displayOrderTable()
{
    let orderTemp=``
    orderTemp+=` <div class="px-4 d-flex justify-content-between border-bottom">
                            <h3 class="pb-2">product</h3>
                            <h3 class="pb-2">Subtotal</h3>
                        </div>`
    if (localStorage.getItem('cartItems')) {
     cartItems = JSON.parse(localStorage.getItem('cartItems'));
    for(let i=0;i<cartItems.length;i++)
     { 
        orderTemp+=`<div class="px-4 d-flex justify-content-between mt-3 border-bottom">
                            <p>${cartItems[i].title.split(" ").slice(0, 2).join(" ")} x${cartItems[i].quantity}</p>
                            <p>$${cartItems[i].price*cartItems[i].quantity}</p>
                        </div>`   
     }
    }  
    document.getElementById('orderTable').innerHTML=orderTemp;        
}

displayOrderTable();





var userNameEmailLogin=document.getElementById('userNameEmailLogin');
var loginPasswrod=document.getElementById('loginPasswrod');
var required=document.getElementById('required');
var Incorrect = document.getElementById("Incorrect")

// to chech if the e-mail and the password in the login page is empty or not
function LoginEmpty() {
    if (userNameEmailLogin.value == '' || loginPasswrod.value == "") {
        return false
    }
    else {
        return true

    }
}
var loginBtn=document.getElementById('loginBtn');

//the login function
loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    if (LoginEmpty()) {
        required.classList.replace("d-block", "d-none")
        var Login =
        {
            Email: userNameEmailLogin.value,
            userNameLogin:userNameEmailLogin.value,
            Password: loginPasswrod.value
        }
        for (var i = 0; i < maillist.length; i++) {
            if (Login.Email.toLowerCase() == maillist[i].Email.toLowerCase() ||Login.userNameLogin.toLowerCase()==maillist[i].name.toLowerCase()&& Login.Password.toLowerCase() == maillist[i].Password.toLowerCase()) {
                // localStorage.setItem('UserName', maillist[i].name)
            success.classList.replace("d-none", "d-block")
            Incorrect.classList.replace("d-block", "d-none")
            required.classList.replace("d-block", "d-none")
            }
            else {
                Incorrect.classList.replace("d-none", "d-block")
            }
        }
    }
    else {
        required.classList.replace("d-none", "d-block")
        Incorrect.classList.replace("d-block", "d-none")
    }

})    
var button = document.querySelectorAll('.Categories');
for (var i = 0; i < button.length; i++) {
    button[i].onclick = function() {
        var category = this.getAttribute('data-category'); 
        window.location.href = `../pages/Category.html?type=${category}`;
    };
}