const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let items = [];
let selectedImage = "";
let selectedLogo = "";

// لاگین
const PASSWORD = "ghofl21733";

function login() {
  let pass = document.getElementById("password").value;

  if (pass === PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("panel").style.display = "block";
    loadItems();
  } else {
    alert("رمز اشتباه است");
  }
}

// گرفتن لیست از Supabase
async function loadItems() {
  let { data, error } = await supabase
    .from("menu")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  items = data;

  let list = document.getElementById("list");
  list.innerHTML = "";

  items.forEach((item) => {
    list.innerHTML += `
      <div class="card">
        <h4>${item.name}</h4>
        <p>💰 ${item.price}</p>
        <p>📂 ${item.category}</p>
      </div>
    `;
  });
}

// اضافه کردن غذا
async function addItem() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("category").value;

  const { error } = await supabase
    .from("menu")
    .insert([
      {
        name: name,
        price: price,
        image: selectedImage,
        category: category
      }
    ]);

  if (error) {
    alert("خطا در ذخیره");
    console.log(error);
    return;
  }

  alert("اضافه شد ✔");

  clearForm();
  loadItems();
}

// حذف غذا
async function deleteItem(id) {
  const { error } = await supabase
    .from("menu")
    .delete()
    .eq("id", id);

  if (error) {
    alert("خطا در حذف");
    return;
  }

  loadItems();
}

// آپلود عکس غذا
document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    selectedImage = e.target.result;
  };
  reader.readAsDataURL(file);
});

// تنظیمات کافه (لوگو و اسم)
function saveSettings() {
  const settings = {
    name: document.getElementById("cafeName").value,
    phone: document.getElementById("cafePhone").value,
    instagram: document.getElementById("cafeInstagram").value,
    address: document.getElementById("cafeAddress").value,
    logo: selectedLogo
  };

  localStorage.setItem("cafeSettings", JSON.stringify(settings));

  alert("تنظیمات ذخیره شد");
}

// لوگو
document.getElementById("logoFile").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    selectedLogo = e.target.result;
  };
  reader.readAsDataURL(file);
});