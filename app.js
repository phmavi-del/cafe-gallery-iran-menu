const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const container = document.getElementById("menu-items");
const searchBox = document.getElementById("searchBox");

let foods = [];
let currentCategory = "همه";

async function loadFoods() {

  container.innerHTML =
    '<div class="loading">در حال دریافت منو...</div>';

  try {

    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    foods = data || [];

    renderFoods();

  } catch (err) {

    console.error(err);

    container.innerHTML =
      '<div class="empty">خطا در دریافت اطلاعات منو</div>';

  }

}

function renderFoods() {

  const searchText =
    searchBox.value.trim().toLowerCase();

  let filtered = foods;

  if (currentCategory !== "همه") {

    filtered = filtered.filter(item =>
      item.category === currentCategory
    );

  }

  if (searchText) {

    filtered = filtered.filter(item =>
      item.name &&
      item.name.toLowerCase().includes(searchText)
    );

  }

  if (filtered.length === 0) {

    container.innerHTML =
      '<div class="empty">موردی پیدا نشد</div>';

    return;

  }

  container.innerHTML = "";

  filtered.forEach(item => {

    const image =
      item.image && item.image.trim() !== ""
      ? item.image
      : "https://via.placeholder.com/500x300?text=Cafe+Gallery+Iran";

    container.innerHTML += `
      <div class="food-card">

        <img
          src="${image}"
          alt="${item.name}"
          loading="lazy"
        >

        <h3>${item.name}</h3>

        <p>${item.price} تومان</p>

        <small>${item.category || ""}</small>

      </div>
    `;

  });

}

if (searchBox) {

  searchBox.addEventListener("input", () => {
    renderFoods();
  });

}

document.querySelectorAll(".category").forEach(btn => {

  btn.addEventListener("click", () => {

    document
      .querySelectorAll(".category")
      .forEach(c =>
        c.classList.remove("active-category")
      );

    btn.classList.add("active-category");

    currentCategory = btn.innerText.trim();

    renderFoods();

  });

});

loadFoods();