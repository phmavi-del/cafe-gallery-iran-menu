const PASSWORD = "4321";

const supabase = window.supabase.createClient(
  "https://fgqnzspfrkqdczsyoose.supabase.co",
  "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1"
);

let imgBase64 = "";

// عناصر
const loginBox = document.getElementById("loginBox");
const panel = document.getElementById("panel");

const pass = document.getElementById("pass");

const name = document.getElementById("name");
const price = document.getElementById("price");
const cat = document.getElementById("cat");

const list = document.getElementById("list");

// 🔐 لاگین
document.getElementById("loginBtn").addEventListener("click", () => {

  if (pass.value !== PASSWORD) {
    alert("رمز اشتباه است");
    return;
  }

  loginBox.classList.add("hidden");
  panel.classList.remove("hidden");

  loadMenu();
});

// 📷 عکس
document.getElementById("img").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    imgBase64 = reader.result;
  };

  reader.readAsDataURL(file);
});

// ➕ افزودن غذا
document.getElementById("addBtn").addEventListener("click", async () => {

  if (!name.value || !price.value) {
    alert("نام و قیمت لازم است");
    return;
  }

  await supabase.from("menu").insert([{
    name: name.value,
    price: Number(price.value),
    category: cat.value,
    image: imgBase64
  }]);

  name.value = "";
  price.value = "";

  loadMenu();
});

// 📦 لود منو
async function loadMenu() {

  const { data } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: false });

  render(data || []);
}

// 🎨 نمایش
function render(items) {

  list.innerHTML = "";

  items.forEach(i => {

    list.innerHTML += `
      <div class="card">
        ${i.image ? `<img src="${i.image}">` : ""}
        <h3>${i.name}</h3>
        <p>${i.price} تومان</p>
        <p>${i.category}</p>
      </div>
    `;
  });
}

// 🧾 QR
function makeQR() {

  const url = window.location.origin + "/menu.html";

  document.getElementById("qrBox").innerHTML = "";

  QRCode.toCanvas(url, { width: 200 }, (err, canvas) => {
    document.getElementById("qrBox").appendChild(canvas);
  });
}