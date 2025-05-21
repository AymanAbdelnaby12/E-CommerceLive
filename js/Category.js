    var products;
    var currentDisplayed;
    var CategoriesMap;  // key -> category  value -> products of this category

    displayPage();


    async function displayPage(){
    const params = new URLSearchParams(window.location.search);
    const category = params.get('type');
    const query = params.get('search');
    products = await getAllProducts();
    CategoriesMap = groupProducts(products);
    console.log(products);
    console.log(CategoriesMap);   
    if (query){
        search(query);
        displayProducts("Result")
    }
    else if (category){
        const initCategory = category ? category : 'gaming';
        currentDisplayed = CategoriesMap.get(category);  
        
        displayProducts(category);
    }
    else{
        currentDisplayed = products;
        displayProducts("All Products")
    }
    }


    async function getAllProducts(){
    let response = await fetch("https://fakestoreapi.in/api/products?limit=150")
    let data = await response.json();
    return data.products;
    } 

    function groupProducts(products){
    let map = new Map();
    products.forEach(product => {
        let category = product.category;
        if (!map.has(category)){
            map.set(category,[]);
        }
        map.get(category).push(product);
    });
    return map
    }

    async function getProductsByCategory(category) { 
    let response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category}`);
    let data = await response.json();
    return data.products;     
    }

    function displayProducts(category){
        console.log(currentDisplayed);
        document.getElementById("heaId").innerHTML = `${currentDisplayed[0].category}`;
        document.getElementById("Head3Id").innerHTML = `Showing all ${currentDisplayed.length} products`;
      
        let data = ``;
        for (let i = 0; i < currentDisplayed.length; i++){
            data += ` 
                <div class="col-12  col-md-6 col-lg-4 align-items-stretch mt-5">
                    <div class="card h-100">
                        <div class="image-container bg-light p-2">
                            <img src="${currentDisplayed[i].image}" alt="Product" class="img-fluid">
                        </div>
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h6 class="card-title text-truncate"  ">
                                ${currentDisplayed[i].title.split(" ").slice(0, 2).join(" ")}
                            </h6>
                            <p class="card-text">Price: ${currentDisplayed[i].price} $</p> 
                            <div class="d-flex cardFooter p-2 justify-content-center align-items-center mb-3">
                            <button onclick="redirectToProductDetails(${currentDisplayed[i].id})" class="btn btn-primary mt-auto">View Details</button>
                            </div>
                        </div>
                    </div>  
                </div>`;
        }
        document.getElementById("categoryProduct").innerHTML = data;
    } 

    function redirectToProductDetails(productId){
    window.location.href = `../pages/show_details.html?id=${productId}`;
    }

    var button = document.querySelectorAll('.Categories');
    for (var i = 0; i < button.length; i++) {
    button[i].onclick = function() {
        var category = this.getAttribute('data-category');
        console.log(category)
        window.location.href = `../pages/Category.html?type=${category}`;
    };
    }
    var button2 = document.querySelectorAll('.category-link');
    console.log(button2)

    for (var i = 0; i < button2.length; i++) {
    button2[i].onclick = function() {
        var category = this.getAttribute('data-category');
        window.location.href = `../pages/Category.html?type=${category}`;
    };
    }

    // Search Feature //
    function search(query) {
    if (query !== "") {
        const categoryResult = searchByCategoryName(query);
        const titleResult = searchByTitle(query);
        const descriptionResult = searchByDescription(query);
        const merged = categoryResult.concat(categoryResult, titleResult, descriptionResult);
        const map = new Map();
        merged.forEach(function (product) {
        map.set(product.id, product);
        });
        currentDisplayed =  Array.from(map.values());      
    //   document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
    }
    else
        currentDisplayed = products; 
    }

    function searchByCategoryName(query) {
    return products.filter(function(product) {
        return product.category.toLowerCase().includes(query.toLowerCase());
    });
    }

    function searchByTitle(query) {
    return products.filter(function(product) {
        return product.title.toLowerCase().includes(query.toLowerCase());
        });
    }
    function searchByDescription(query) {
    return products.filter(function(product) {
        return product.description.toLowerCase().includes(query.toLowerCase());
        });
    }

    document.querySelector("#searchButton").addEventListener("click", (e)=>{
    e.preventDefault();
    var query = document.querySelector("#searchInput").value;
    search(query);
    displayProducts("Result");

    })
    document.querySelector("#searchInput").addEventListener("blur", ()=>{
    var query = document.querySelector("#searchInput").value;
    search(query);
    displayProducts("Result");
    })

    function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }