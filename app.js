const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let items = [];

const container = document.getElementById("menu-items");
const searchBox = document.getElementById("searchBox");

// گرفتن دیتا از Supabase
async function loadItems() {
  let { data, error } = await supabase
    .from("menu")
    .select("*");

  if (error) {
    console.log("Load Error:", error);
    return;
  }

  items = data;
  renderMenu();
}

function renderMenu(filter = "", category = "") {
  container.innerHTML = "";

  let filtered = items;

  if (filter) {
    filtered = filtered.filter(i =>
      i.name.includes(filter)
    );
  }

  if (category) {
    filtered = filtered.filter(i =>
      i.category === category
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = "<p style='text-align:center'>موردی پیدا نشد</p>";
    return;
  }

  filtered.forEach(item => {
    container.innerHTML += `
      <div class="food-card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>${item.price} تومان</p>
        <small>${item.category}</small>
      </div>
    `;
  });
}

// سرچ
searchBox.addEventListener("input", (e) => {
  renderMenu(e.target.value);
});

// دسته‌بندی‌ها
document.querySelectorAll(".category").forEach(cat => {
  cat.addEventListener("click", () => {
    renderMenu("", cat.innerText);
  });
});

// لود اولیه
loadItems();