const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const PASSWORD = "ghofl21733";

let imageFile = null;

document.getElementById("image").addEventListener("change", (e) => {
  imageFile = e.target.files[0];
});

function login(){
  const pass = document.getElementById("pass").value;

  if(pass !== PASSWORD){
    alert("رمز اشتباه است");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("panel").style.display = "block";

  loadFoods();
}

async function uploadImage(file){
  if(!file) return null;

  const fileName = Date.now() + "-" + file.name;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if(error){
    console.log(error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

async function addFood(){

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;

  const imageUrl = await uploadImage(imageFile);

  const { error } = await supabase
    .from("menu")
    .insert([{
      name,
      price,
      category,
      image: imageUrl
    }]);

  if(error){
    alert("خطا در ثبت غذا");
    console.log(error);
    return;
  }

  alert("اضافه شد");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";

  imageFile = null;

  loadFoods();
}

async function loadFoods(){

  const { data } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending:false });

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(item => {

    list.innerHTML += `
      <div class="card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>${item.price} تومان</p>
        <small>${item.category}</small>

        <button onclick="deleteFood(${item.id})">حذف</button>
      </div>
    `;
  });
}

async function deleteFood(id){

  await supabase
    .from("menu")
    .delete()
    .eq("id", id);

  loadFoods();
}