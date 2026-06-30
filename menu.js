const supabase = window.supabase.createClient(
  "https://fgqnzspfrkqdczsyoose.supabase.co",
  "sb_publishable_MMAjs6wYFJOIspkwZ7Yzsg_uXA21Gc1"
);

async function load() {

  const { data } = await supabase.from("menu").select("*");

  const box = document.getElementById("menu");
  box.innerHTML = "";

  (data || []).forEach(i => {

    box.innerHTML += `
      <div class="card">
        ${i.image ? `<img src="${i.image}">` : ""}
        <h3>${i.name}</h3>
        <p>${i.price} تومان</p>
      </div>
    `;
  });
}

load();