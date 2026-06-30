const supabase = window.supabase.createClient(
  "https://fgqnzspfrkqdczsyoose.supabase.co",
  "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1"
);

let imageBase64 = "";

// عناصر
const name = document.getElementById("name");
const price = document.getElementById("price");
const cat = document.getElementById("cat");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

// ➕ افزودن غذا
addBtn.addEventListener("click", async () => {

  if (!name.value || !price.value) {
    alert("نام و قیمت لازم است");
    return;
  }

  await supabase.from("menu").insert([{
    name: name.value,
    price: Number(price.value),
    category: cat.value,
    image: imageBase64
  }]);

  name.value = "";
  price.value = "";

  loadMenu();
});

// 📷 عکس
document.getElementById("img").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => imageBase64 = reader.result;
  reader.readAsDataURL(file);
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

// 📱 QR منو
function generateQR() {

  const url = window.location.origin + "/menu.html";

  document.getElementById("qrBox").innerHTML = "";

  QRCode.toCanvas(url, { width: 200 }, function (err, canvas) {
    document.getElementById("qrBox").appendChild(canvas);
  });
}

loadMenu();