
alert("admin.js loaded");
const PASSWORD = "1234";

const SUPABASE_URL = "https://fgqnzspfrkqdczsyoose.supabase.co";
const SUPABASE_KEY = "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let editingId = null;

function login() {

  const pass =
    document.getElementById("pass").value;

  if (pass !== PASSWORD) {

    alert("رمز ورود اشتباه است");
    return;

  }

  document
    .getElementById("loginBox")
    .classList.add("hidden");

  document
    .getElementById("panel")
    .classList.remove("hidden");

  loadFoods();

}

async function loadFoods() {

  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: false });

  if (error) {

    console.error(error);
    alert("خطا در دریافت اطلاعات");

    return;
  }

  renderFoods(data || []);

}

function renderFoods(foods) {

  const list =
    document.getElementById("list");

  list.innerHTML = "";

  foods.forEach(food => {

    list.innerHTML += `

      <div class="card">

        ${
          food.image
          ?
          `<img src="${food.image}">`
          :
          ""
        }

        <h3>${food.name}</h3>

        <div class="price">
          ${food.price} تومان
        </div>

        <div class="category">
          ${food.category || ""}
        </div>

        <div class="actions">

          <button
            class="edit"
            onclick="editFood(${food.id})">

            ویرایش

          </button>

          <button
            class="delete"
            onclick="deleteFood(${food.id})">

            حذف

          </button>

        </div>

      </div>

    `;
  });

}

async function saveFood() {

  const name =
    document.getElementById("name")
    .value
    .trim();

  const price =
    document.getElementById("price")
    .value
    .trim();

  const image =
    document.getElementById("image")
    .value
    .trim();

  const category =
    document.getElementById("category")
    .value;

  if (
    !name ||
    !price ||
    !category
  ) {

    alert("اطلاعات کامل نیست");
    return;

  }

  if (editingId) {

    const { error } = await supabase
      .from("menu")
      .update({
        name,
        price,
        image,
        category
      })
      .eq("id", editingId);

    if (error) {

      console.error(error);

      alert("خطا در ویرایش");
      return;
    }

    editingId = null;

  } else {

    const { error } = await supabase
      .from("menu")
      .insert([
        {
          name,
          price,
          image,
          category
        }
      ]);

    if (error) {

      console.error(error);

      alert("خطا در ثبت غذا");
      return;
    }

  }

  clearForm();

  loadFoods();

}

async function editFood(id) {

  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {

    console.error(error);
    return;

  }

  document.getElementById("name").value =
    data.name;

  document.getElementById("price").value =
    data.price;

  document.getElementById("image").value =
    data.image || "";

  document.getElementById("category").value =
    data.category || "";

  editingId = data.id;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

async function deleteFood(id) {

  if (
    !confirm("غذا حذف شود؟")
  ) return;

  const { error } = await supabase
    .from("menu")
    .delete()
    .eq("id", id);

  if (error) {

    console.error(error);

    alert("خطا در حذف");
    return;

  }

  loadFoods();

}

function clearForm() {

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  document.getElementById("category").value = "";

}

function makeQR() {

  const url =
    window.location.origin +
    "/";

  document
    .getElementById("qrBox")
    .innerHTML = "";

  QRCode.toCanvas(
    url,
    {
      width: 250
    },
    function(err, canvas) {

      if (err) {

        console.error(err);
        return;

      }

      document
        .getElementById("qrBox")
        .appendChild(canvas);

    }
  );

}
