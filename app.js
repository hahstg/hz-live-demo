const statusPill = document.getElementById("status-pill");
const networkStatus = document.getElementById("network-status");
const swStatus = document.getElementById("sw-status");
const reloadBtn = document.getElementById("reload-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");

function updateOnlineStatus() {
  const isOnline = navigator.onLine;

  statusPill.textContent = isOnline ? "Online" : "Offline";
  statusPill.classList.toggle("online", isOnline);
  statusPill.classList.toggle("offline", !isOnline);
  networkStatus.textContent = isOnline ? "Online" : "Offline";
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    swStatus.textContent = "Not supported";
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js");
    swStatus.textContent = registration.active ? "Active" : "Registered";
  } catch (error) {
    console.error("Service worker registration failed:", error);
    swStatus.textContent = "Failed";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("hz-demo-theme", isLight ? "light" : "dark");
}

function restoreTheme() {
  const savedTheme = localStorage.getItem("hz-demo-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
}

reloadBtn.addEventListener("click", () => {
  window.location.reload();
});

toggleThemeBtn.addEventListener("click", toggleTheme);
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

restoreTheme();
updateOnlineStatus();
registerServiceWorker();
