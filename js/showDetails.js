document.addEventListener("DOMContentLoaded", async function() {

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id"); 
    
    
    let response = await fetch('https://fakestoreapi.in/api/products?limit=150');
    let data = await response.json();
    let products = data.products;
    console.log(productId) 
    
    let product = products.find(p => p.id == productId);
    document.getElementById("img_product").src = product.image;
        document.getElementById("catogry_1").textContent = product.category;
        document.getElementById("catogry_2").textContent = product.category;
        document.getElementById("product_name2").textContent = product.title;
        document.getElementById("price").textContent = `${product.price} $`;
        document.getElementById("name").textContent = product.title.split(" ").slice(0, 2).join(" ");
        document.getElementById("catogry").textContent = product.category;
        document.getElementById("description").textContent = product.description;
       // document.getElementById("img-disc").src = product.image;
        var element = document.getElementById("related-products");
        var body = document.getElementById("tableBody");
        addToTabble(products[productId]);
        getRelatedProducts(products, productId,  product.category);
        function addToTabble(product){
            let data="";
            
                data += `
                <tr>
                    <td colspan="2" >Color : ${product.color}</td>
                <tr> 
                <tr> 
                    <td colspan="6">Model : ${product.model}</td> 
                <tr> 
                <tr> 
                    <td colspan="2">Size : ${product.category}</td>
                <tr> 
                
                ` 
            
            document.getElementById("tableBody").innerHTML = data;
    }
   
    function getRelatedProducts(products,  productId, currentCategory) {
    let relatedProducts ="";
    let count=0;
    for(let i=1; i <= products.length && count < 3; i++){
        const p = products[i];
        if(p.id !== productId && p.category === currentCategory){
            relatedProducts +=`
            <div class="col-sm-4">
                    <div class="card h-100">
                    <img src="${p.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${p.title.split(" ").slice(0, 2).join(" ")}</h5>
                        <p class="card-text">Category : ${p.category}</p>
                        <p class="card-text">Price : ${p.price} $</p>
                        <button onclick="redirectToProductDetails(${p.id})" class="btn btn-primary">View Details</button>
                        
                    </div>
                    </div>
                </div>` 
                count++;
        }
       
        document.getElementById("relatedproducts").innerHTML = relatedProducts;
        document.getElementById("relatedproduct").innerHTML = relatedProducts;
    }
    }
    
    });

    var cardButton = document.getElementById("cardButton");
    cardButton.addEventListener("click", function() {
        
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id"); 
        let response = null;
        let products = null; 
        async function addProductToCart() {
            
                if (!response) {
                    response = await fetch('https://fakestoreapi.in/api/products?limit=150');
                    data = await response.json();
                    products = data.products;
                }
                
                const product = products.find(p => p.id == productId);
                
                if (!product) {
                    throw new Error("Product not found in API data");
                }
                
                const cartItem = {
                    ...product,   
                    quantity: 1  
                };
                
                
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                
                
                let existing = cartItems.find(item => item.id == cartItem.id);
                if (existing) {
                    
                    existing.quantity += 1;
                } else {

                    cartItems.push(cartItem);
                }

                localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
                alert("Product is Added successfully");
                
                window.location.href = `../pages/Cart.html`;
                
            
        }
        
        
        addProductToCart();
    });
    var button = document.querySelectorAll('.Categories');
for (var i = 0; i < button.length; i++) {
    button[i].onclick = function() {
        var category = this.getAttribute('data-category');
        window.location.href = `../pages/Category.html?type=${category}`;
    };
}function redirectToProductDetails(productId){ 
    window.location.href = `../pages/show_details.html?id=${productId}`;  
    console.log(productId);
} 