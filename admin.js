const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PASSWORD = "ghofl21733";

function login() {
  const pass = document.getElementById("pass").value;

  if (pass !== PASSWORD) {
    alert("رمز اشتباه است");
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("panel").style.display = "block";

  loadFoods();
}

async function loadFoods() {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    alert("خطا در دریافت دیتا");
    return;
  }

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(item => {
    list.innerHTML += `
      <div class="card">
        <img src="${item.image || ''}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <small>${item.category}</small>
      </div>
    `;
  });
}