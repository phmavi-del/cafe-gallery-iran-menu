const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabaseClient =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let items = [];

const container =
document.getElementById("menu-items");

const searchBox =
document.getElementById("searchBox");

async function loadItems() {

const { data, error } =
await supabaseClient
.from("menu")
.select("*");

if(error){

console.log(error);

container.innerHTML =
"<p style='text-align:center'>خطا در دریافت اطلاعات</p>";

return;
}

items = data || [];

renderMenu();

}

function renderMenu(
filter = "",
category = ""
){

container.innerHTML = "";

let filtered = [...items];

if(filter){

filtered = filtered.filter(item =>
(item.name || "")
.includes(filter)
);

}

if(category && category !== "همه"){

filtered = filtered.filter(item =>
(item.category || "")
=== category
);

}

if(filtered.length === 0){

container.innerHTML =
"<p style='text-align:center'>موردی پیدا نشد</p>";

return;
}

filtered.forEach(item => {

container.innerHTML += `
<div class="food-card">

<img
src="${item.image || 'https://picsum.photos/400/300'}"
alt="${item.name}"
>

<h3>${item.name || ""}</h3>

<p>${item.price || ""} تومان</p>

<small>${item.category || ""}</small>

</div>
`;

});

}

if(searchBox){

searchBox.addEventListener(
"input",
e => {

renderMenu(
e.target.value,
currentCategory
);

}
);

}

let currentCategory = "";

document
.querySelectorAll(".category")
.forEach(cat => {

cat.addEventListener(
"click",
() => {

currentCategory =
cat.innerText.trim();

renderMenu(
searchBox.value,
currentCategory
);

}
);

});

loadItems();