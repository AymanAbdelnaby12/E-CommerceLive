let form = document.getElementById('productForm');
let productNameInput = document.getElementById('productName');
let productPriceInput = document.getElementById('productPrice');
let productQuantityInput = document.getElementById('productQuantity');
let productImgInput = document.getElementById('productImg');
let buttonAdd = document.getElementById('buttonAdd');
let buttonUpdate = document.getElementById('buttonUpdate');

let apiProducts = [];


let cartItems = [];


async function fetchProducts() {
    try {
        let response = await fetch('https://fakestoreapi.in/api/products?limit=150');
        let data = await response.json();
        apiProducts = data.products;
        console.log("Products loaded from API:", apiProducts.length);
        
        
        loadCartItems();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function loadCartItems() {
    if (localStorage.getItem('cartItems')) {
        let storedItems = JSON.parse(localStorage.getItem('cartItems'));
        cartItems = [];

        for (let i = 0; i < storedItems.length; i++) {
            let cartItem = storedItems[i];
            let matchedProduct = null;

            for (let j = 0; j < apiProducts.length; j++) {
                if (apiProducts[j].id == cartItem.id) {
                    matchedProduct = apiProducts[j];
                    break;
                }
            }

            if (matchedProduct != null) {
                cartItems.push({
                    id: matchedProduct.id,
                    title: matchedProduct.title,
                    price: matchedProduct.price,
                    image: matchedProduct.image,
                    quantity: cartItem.quantity
                });
            } else {
                cartItems.push(cartItem);
            }
        }

        displayProducts();
    }
}

function calculateTotals() {
    let subtotal = 0;
    for (let item of cartItems) {
        subtotal += parseFloat(item.price) * parseInt(item.quantity);
    }
    document.getElementById('subtotal').textContent = `${subtotal} `;
    document.getElementById('total').textContent = `$${subtotal} `;
}


function addProduct() {
    
    if (productNameInput.value && productPriceInput.value && productQuantityInput.value) {
        let productId = null;
        
        
        const matchingProduct = apiProducts.find(p => 
            p.title.toLowerCase() === productNameInput.value.toLowerCase());
        
        if (matchingProduct) {
            productId = matchingProduct.id;
        } else {
            
            productId = 'manual-' + Date.now();
        }
        
        let cartItem = {
            id: productId,
            title: productNameInput.value,
            price: parseFloat(productPriceInput.value),
            quantity: parseInt(productQuantityInput.value)
        };
        
        
        if (productImgInput.files.length > 0) {
            let reader = new FileReader();
            reader.onload = function (e) {
                cartItem.image = e.target.result;
                
                
                addToCart(cartItem);
                saveAndRefresh();
            };
            reader.readAsDataURL(productImgInput.files[0]);
        } else if (matchingProduct) {
            
            cartItem.image = matchingProduct.image;
            addToCart(cartItem);
            saveAndRefresh();
        }  
    }
}


function addToCart(item) {
    
    let existingIndex = cartItems.findIndex(cartItem => cartItem.id == item.id);
    
    if (existingIndex >= 0) {
        
        cartItems[existingIndex].quantity += item.quantity || 1;
    } else {
        
        cartItems.push(item);
    }
}


if (buttonAdd) {
    buttonAdd.addEventListener('click', function (e) {
        e.preventDefault();
        addProduct();
    });
}


function displayProducts() {
    let data = '';
    for (let i = 0; i < cartItems.length; i++) {
        const subTotal = parseFloat(cartItems[i].price) * parseInt(cartItems[i].quantity);
        data += `
            <tr>
                <td><img src="${cartItems[i].image}" width="60" alt="${cartItems[i].title}"></td>
                <td>${cartItems[i].title.split(" ").slice(0, 2).join(" ")}</td>
                <td>${cartItems[i].price} $</td>
                <td>${cartItems[i].quantity}</td>
                <td>${subTotal.toFixed(2)} $</td>
                <td><button class="btn btn-primary btn-sm" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('cartBody').innerHTML = data;
    calculateTotals();
}


function clearForm() {
    if (productNameInput) {
        productNameInput.value = '';
        productNameInput.disabled = false;
    }
    if (productPriceInput) {
        productPriceInput.value = '';
        productPriceInput.disabled = false;
    }
    if (productQuantityInput) {
        productQuantityInput.value = '';
        productQuantityInput.disabled = false;
    }
    if (productImgInput) {
        productImgInput.value = '';
        productImgInput.disabled = false;
    }
}


function deleteProduct(index) {
    cartItems.splice(index, 1);
    saveAndRefresh();
}


function updateProduct(index) {
    const item = cartItems[index];
    
    if (productNameInput) productNameInput.value = item.title;
    if (productPriceInput) productPriceInput.value = item.price;
    if (productQuantityInput) productQuantityInput.value = item.quantity;

    buttonAdd.classList.add('d-none');
    buttonUpdate.classList.remove('d-none');
    buttonUpdate.setAttribute('data-index', index);
}


function updateProduct(index) {
    const item = cartItems[index];

    // Pre-fill only quantity
    if (productQuantityInput)
    productQuantityInput.value = item.quantity;

    productNameInput.disabled = true;
    productPriceInput.disabled = true;
    productImgInput.disabled = true;
 
    productQuantityInput.disabled = false; 

    buttonAdd.classList.add('d-none');
    buttonUpdate.classList.remove('d-none');
    buttonUpdate.setAttribute('data-index', index);
}


function saveAndRefresh() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayProducts();
    clearForm();
    
    if (buttonAdd && buttonUpdate) {
        buttonAdd.classList.remove('d-none');
        buttonUpdate.classList.add('d-none');
    }
}

if (buttonUpdate) {
    buttonUpdate.addEventListener('click', function (e) {
        e.preventDefault();
        const index = this.getAttribute('data-index');
        updateProductData(index);
    });
}
 
document.addEventListener('DOMContentLoaded', function() { 
    fetchProducts();
});
var button = document.querySelectorAll('.Categories');
for (var i = 0; i < button.length; i++) {
    button[i].onclick = function() {
        var category = this.getAttribute('data-category');
        window.location.href = `../pages/Category.html?type=${category}`;
    };
}
var checkoutBtn=document.querySelector('.checkout-btn');

checkoutBtn.addEventListener('click',function(){
    window.location.href = '../pages/CheckOut.html'; 
})