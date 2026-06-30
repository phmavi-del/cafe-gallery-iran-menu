const SUPABASE_URL =
"https://fgqnzspfrkqdczsyoose.supabase.co";

const SUPABASE_KEY =
"sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);
const PASSWORD = "ghofl21733";

let items = JSON.parse(localStorage.getItem("menu")) || [];

let selectedImage = "";

function login(){
let pass = document.getElementById("password").value;

if(pass === PASSWORD){
document.getElementById("loginBox").style.display="none";
document.getElementById("panel").style.display="block";
loadItems();
}else{
alert("رمز اشتباه است");
}
}

function saveData(){
localStorage.setItem("menu", JSON.stringify(items));
window.dispatchEvent(new Event("storage"));
}

function addItem(){
let name = document.getElementById("name").value;
let price = document.getElementById("price").value;
let image = selectedImage;

let category = document.getElementById("category").value;

items.push({name,price,image,category});

saveData();
loadItems();
clearForm();
document.getElementById("image").value="";
selectedImage="";
}

function loadItems(){
let list = document.getElementById("list");
list.innerHTML="";

items.forEach((item,index)=>{
list.innerHTML += `
<div class="card">
<h4>${item.name}</h4>
<p>💰 ${item.price}</p>
<p>📂 ${item.category}</p>

<button onclick="editItem(${index})">✏️ ویرایش</button>
<button onclick="deleteItem(${index})">🗑 حذف</button>
</div>
`;
});
}

function deleteItem(index){
items.splice(index,1);
saveData();
loadItems();
}

function editItem(index){
let item = items[index];

document.getElementById("name").value = item.name;
document.getElementById("price").value = item.price;
document.getElementById("image").value = item.image;
document.getElementById("category").value = item.category;

deleteItem(index);
}

function clearForm(){
document.getElementById("name").value="";
document.getElementById("price").value="";
document.getElementById("image").value="";
}
document.getElementById("image").addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){
selectedImage = e.target.result;
};

reader.readAsDataURL(file);

});

function saveSettings(){

const settings = {
name: document.getElementById("cafeName").value,
phone: document.getElementById("cafePhone").value,
instagram: document.getElementById("cafeInstagram").value,
address: document.getElementById("cafeAddress").value
};

localStorage.setItem(
"cafeSettings",
JSON.stringify(settings)
);

alert("تنظیمات ذخیره شد");
}
let selectedLogo = "";

document.getElementById("logoFile").addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){
selectedLogo = e.target.result;
};

reader.readAsDataURL(file);

});

function saveSettings(){

const settings = {

name: document.getElementById("cafeName").value,

phone: document.getElementById("cafePhone").value,

instagram: document.getElementById("cafeInstagram").value,

address: document.getElementById("cafeAddress").value,

logo: selectedLogo

};

localStorage.setItem(
"cafeSettings",
JSON.stringify(settings)
);

alert("تنظیمات ذخیره شد");

}
async function testSupabase(){

const { data, error } =
await supabase
.from("menu")
.select("*");

console.log("DATA:", data);
console.log("ERROR:", error);

}

testSupabase();