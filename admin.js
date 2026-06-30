console.log("ADMIN JS LOADED");

// فقط تست ساده (فعلاً بدون Supabase)
const PASSWORD = "1234";

// گرفتن المنت‌ها
const loginBtn = document.getElementById("loginBtn");
const passInput = document.getElementById("pass");
const loginBox = document.getElementById("loginBox");
const panel = document.getElementById("panel");

// 🔥 event listener واقعی (حرفه‌ای)
loginBtn.addEventListener("click", () => {

  const value = passInput.value;

  if (value !== PASSWORD) {
    alert("رمز اشتباه است");
    return;
  }

  loginBox.style.display = "none";
  panel.classList.remove("hidden");

});