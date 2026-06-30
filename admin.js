console.log("ADMIN JS LOADED");

// 🔥 Supabase
const supabase = window.supabase.createClient(
  "https://fgqnzspfrkqdczsyoose.supabase.co",
  "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1"
);

// 🔐 رمز
const PASSWORD = "1234";

let imageBase64 = "";

// ===== LOGIN =====
function login() {
  const pass = document.getElementById("pass").value;

  if (pass !== PASSWORD) {
    alert("رمز اشتباه است");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("panel").classList.remove("hidden");

  loadItems();
}

// ===== LOAD =====
async function loadItems() {

  const { data } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: false });

  render(data || []);
}

// ===== RENDER =====
function render(items) {

  const list = document.getElementById("list");
  list.innerHTML = "";

  items.forEach(i => {

    list.innerHTML += `
      <div class="card">
        ${i.image ? `<img src="${i.image}">` : ""}
        <h3>${i.name}</h3>
        <p>${i.price}</p>
        <p>${i.category}</p>
        <button onclick="del(${i.id})">حذف</button>
      </div>
    `;
  });
}

// ===== ADD =====
async function addItem() {

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const cat = document.getElementById("cat").value;

  if (!name || !price) {
    alert("نام و قیمت لازم است");
    return;
  }

  await supabase.from("menu").insert([{
    name,
    price,
    category: cat,
    image: imageBase64
  }]);

  loadItems();
}

// ===== DELETE =====
async function del(id) {
  await supabase.from("menu").delete().eq("id", id);
  loadItems();
}

// ===== IMAGE =====
document.getElementById("img").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => imageBase64 = reader.result;
  reader.readAsDataURL(file);
});

// expose
window.login = login;
window.addItem = addItem;
window.del = del;