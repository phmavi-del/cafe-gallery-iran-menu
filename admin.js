console.log("ADMIN JS LOADED");

const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let items = [];
let selectedImage = "";

const PASSWORD = "ghofl21733";

// ورود
function login() {
  const pass = document.getElementById("password").value;

  if (pass !== PASSWORD) {
    alert("رمز اشتباه است");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("panel").style.display = "block";

  loadItems();
}

// گرفتن آیتم‌ها
async function loadItems() {

  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  items = data || [];

  document.getElementById("foodCount").innerText = items.length;

  renderItems();
}

// نمایش
function renderItems() {

  const list = document.getElementById("list");
  list.innerHTML = "";

  items.forEach(item => {

    list.innerHTML += `
      <div class="card">

        ${item.image ? `<img src="${item.image}">` : ""}

        <h4>${item.name}</h4>
        <p>💰 ${item.price}</p>
        <p>📂 ${item.category}</p>

        <button class="delete-btn" onclick="deleteItem(${item.id})">
          حذف
        </button>

      </div>
    `;
  });
}

// افزودن
async function addItem() {

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;

  if (!name || !price) {
    alert("نام و قیمت لازم است");
    return;
  }

  const { error } = await supabase
    .from("menu")
    .insert([{
      name,
      price,
      image: selectedImage,
      category
    }]);

  if (error) {
    console.log(error);
    alert("خطا در ذخیره");
    return;
  }

  alert("اضافه شد");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  selectedImage = "";

  loadItems();
}

// حذف
async function deleteItem(id) {

  if (!confirm("حذف شود؟")) return;

  const { error } = await supabase
    .from("menu")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    alert("خطا در حذف");
    return;
  }

  loadItems();
}

// عکس
document.getElementById("image")
.addEventListener("change", function () {

  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    selectedImage = e.target.result;
  };

  reader.readAsDataURL(file);

});