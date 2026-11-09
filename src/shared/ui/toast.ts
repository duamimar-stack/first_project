// The only file that makes toasts

// Created once, up front: screen readers only announce changes to a
// role="status" element that is already on the page
const toast = document.createElement("p");
toast.className = "toast";
toast.setAttribute("role", "status");
document.body.append(toast);

let hideTimer: number | undefined;

export function showToast(message: string, duration = 2000): void {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, duration);
}
