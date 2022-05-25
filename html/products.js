var products = [
    { id:101, name:"Basket Ball", image:"basketball.png","price":150},
    { id:102, name:"Football",image:"football.png","price":120},
    { id:103, name:"Soccer", image:"soccer.png","price":110},
    { id:104, name:"Table Tennis",image:"table-tennis.png","price":130},
    { id:105, name:"Tennis", image:"tennis.png","price":100}
];

store=[];
function display(){
    var list = ""
    products.forEach(element => {
        list += `
        <div id="product-101" class="product">
        <img src="images/${element.image}">
        <h3 class="title"><a href="#">${element.name}</a></h3>
        <span>Price: $ ${element.price}</span>
        <a class="add-to-cart" id="${element.id}" href="#">Add To Cart</a>
    </div>`
    });$("#products").append(list);
}
display(); 

$(document).on("click" , ".add-to-cart", function(){
    var id = this.id;
    var data = 
    products.forEach(element => {
        if(element.id == id){
            var data ={
                "id":element.id,
                "name":element.name,
                "price":element.price,
                "quantity":1,
            }
            var len = store.length;
            var flag=0;
            if(store != 0){
                for (var i = 0; i < len;i++) {
                    console.log(i);
                    if(store[i].id == id){
                        console.log("if");
                        store[i].quantity += 1;
                        flag=1;
                        break;
                    }
                }
            }if(flag ==0){
                store.push(data)
            }
        }
    });
    console.log(store);
    displayStore();
});
var table = `
<table id="store_table">
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Remove</th>
    </tr>`
function displayStore(){
    $("#table").empty();
    
    var list = ""
    store.forEach(element => {
        var total = element.price * element.quantity;
        list += `
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            
            <td><button id="qtyminus" onclick="return false">-</button><input type="number" class="inp" id="up_${element.id}" value="${element.quantity}" style="border: none;"><button id="qtyplus" onclick="return false">+</button></td>
            
            <td class="total">${total}</td>
            <td class="remove" id="${element.id}" >X</td>
        </tr>`
    });
    $("#table").append(table+list+"</table>");

   var l = $(".total").length;
   var total = 0;
    for(let i=0;i<l;i++){
        var x = document.getElementsByClassName("total")[i].innerHTML;
        console.log(x);
        total += Number(x)
    }
   $("#grand_total").empty();
   $("#grand_total").append(total)

};
$(document).on("blur" , ".inp" , function(){
    var inpid= this.id;
    var pid = inpid.split("_")[1];
    var p_quantity = this.value;
    
    store.forEach(e => {
        if(e.id == pid){
            e.quantity = p_quantity;
        }
    });
    displayStore(); 
})

$("#btn-remove").click(()=>{
    store=[];
    displayStore();
});

$(document).on("click" , ".remove", function(){
    id = this.id;
    console.log(id);
    store.forEach((element,index) => {
        if(element.id == id){
            store.splice(index , 1)
        }
    });
    displayStore();


    //counter
    $('qtyplus').click(function() {
        var curr_quantity = $(this).prev().val();
        console.log(curr_quantity);
        curr_quantity = parseInt(curr_quantity)+1;
        $(this).prev().val(curr_quantity);
        alert('Product Name : '+ $(this).parent().parent().parent().prev().text());
    });
    $('qtyminus').click(function() {
        var curr_quantity = $(this).next().val();
        console.log(curr_quantity);

        if(curr_quantity != 0) {
            curr_quantity = parseInt(curr_quantity)-1;
            $(this).next().val(curr_quantity);
            alert('Product Name : '+$(this).parent().parent().parent().prev().text());
        }
    });
});




