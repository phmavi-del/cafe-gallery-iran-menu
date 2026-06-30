const PASSWORD = "1234";

let foods = [];
let imgBase64 = "";

// 🔐 لاگین
function login() {

  const pass = document.getElementById("pass").value;

  if (pass !== PASSWORD) {
    alert("رمز اشتباه است");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("panel").style.display = "block";
}

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
function addFood() {

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  if (!name || !price) {
    alert("نام و قیمت لازم است");
    return;
  }

  foods.push({
    name,
    price,
    image: imgBase64
  });

  render();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}

// 🎨 نمایش
function render() {

  const list = document.getElementById("list");
  list.innerHTML = "";

  foods.forEach(f => {

    list.innerHTML += `
      <div class="card">
        ${f.image ? `<img src="${f.image}">` : ""}
        <h3>${f.name}</h3>
        <p>${f.price} تومان</p>
      </div>
    `;
  });
}

// 📱 QR
function makeQR() {

  const url = window.location.origin + "/menu.html";

  document.getElementById("qrBox").innerHTML = "";

  QRCode.toCanvas(url, { width: 200 }, (err, canvas) => {
    document.getElementById("qrBox").appendChild(canvas);
  });
}