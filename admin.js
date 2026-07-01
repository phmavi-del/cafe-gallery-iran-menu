const PASSWORD = "1234";

let foods = JSON.parse(localStorage.getItem("foods")) || [];
let imgBase64 = "";

function saveFoods(){
  localStorage.setItem("foods", JSON.stringify(foods));
}

function login(){

  const pass = document.getElementById("pass").value;

  if(pass !== PASSWORD){
    alert("رمز اشتباه است");
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");

  render();
}

const imgInput = document.getElementById("img");

if(imgInput){

  imgInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      imgBase64 = reader.result;
    };

    reader.readAsDataURL(file);

  });

}

function addFood(){

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();

  if(!name || !price){
    alert("نام و قیمت را وارد کنید");
    return;
  }

  foods.push({
    id: Date.now(),
    name,
    price,
    image: imgBase64
  });

  saveFoods();
  render();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("img").value = "";

  imgBase64 = "";
}

function deleteFood(id){

  if(!confirm("حذف شود؟")) return;

  foods = foods.filter(f => f.id !== id);

  saveFoods();
  render();
}

function render(){

  const list = document.getElementById("list");

  if(!list) return;

  list.innerHTML = "";

  foods.forEach(f => {

    list.innerHTML += `
      <div class="card">
        ${f.image ? `<img src="${f.image}">` : ""}
        <h3>${f.name}</h3>
        <div class="price">${f.price} تومان</div>

        <div class="actions">
          <button class="delete" onclick="deleteFood(${f.id})">
            حذف
          </button>
        </div>
      </div>
    `;
  });

}

function makeQR(){

  const url =
  window.location.origin +
  window.location.pathname.replace("admin.html","menu.html");

  document.getElementById("qrBox").innerHTML = "";

  QRCode.toCanvas(url,{width:220},function(err,canvas){

    if(err){
      console.log(err);
      return;
    }

    document.getElementById("qrBox").appendChild(canvas);

  });

}