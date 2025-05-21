

var button = document.querySelectorAll('.Categories');
for (var i = 0; i < button.length; i++) {
    button[i].onclick = function() {
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
    window.location.href = `../pages/Category.html?search=${query}`;

    })
    document.querySelector("#searchInput").addEventListener("blur", ()=>{
    var query = document.querySelector("#searchInput").value; 
    window.location.href = `../pages/Category.html?search=${query}`;
    })

    function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }