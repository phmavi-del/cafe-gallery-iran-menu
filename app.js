const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let items = [];

const container = document.getElementById("menu-items");
const searchBox = document.getElementById("searchBox");

async function loadItems() {
  try {
    const { data, error } = await supabaseClient
      .from("menu")
      .select("*");

    if (error) {
      console.error("Supabase Error:", error);
      container.innerHTML =
        "<p style='text-align:center'>خطا در دریافت اطلاعات</p>";
      return;
    }

    items = data || [];
    renderMenu();
  } catch (err) {
    console.error(err);
    container.innerHTML =
      "<p style='text-align:center'>خطا در اتصال</p>";
  }
}

function renderMenu(filter = "", category = "") {
  container.innerHTML = "";

  let filtered = [...items];

  if (filter) {
    filtered = filtered.filter(item =>
      (item.name || "")
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter(
      item => item.category === category
    );
  }

  if (filtered.length === 0) {
    container.innerHTML =
      "<p style='text-align:center'>موردی پیدا نشد</p>";
    return;
  }

  filtered.forEach(item => {
    const image =
      item.image && item.image.trim() !== ""
        ? item.image
        : "https://picsum.photos/300/200";

    container.innerHTML += `
      <div class="food-card">
        <img src="${image}" alt="${item.name}">
        <h3>${item.name || ""}</h3>
        <p>${item.price || 0} تومان</p>
        <small>${item.category || ""}</small>
      </div>
    `;
  });
}

if (searchBox) {
  searchBox.addEventListener("input", e => {
    renderMenu(e.target.value);
  });
}

document.querySelectorAll(".category").forEach(cat => {
  cat.addEventListener("click", () => {
    renderMenu("", cat.innerText);
  });
});

loadItems();