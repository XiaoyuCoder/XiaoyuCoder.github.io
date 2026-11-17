const toast = document.querySelector('.toast');
let toastTimeout;
function notify(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
}

const copyEmail = document.querySelector('.copy-email');
async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    notify(successMessage);
  } catch {
    notify('暂时无法自动复制，请选择文字手动复制');
  }
}
if (navigator.clipboard?.writeText) {
  copyEmail.hidden = false;
  copyEmail.addEventListener('click', () => copyText('wangyu_2026@ruc.edu.cn', '邮箱已复制'));
}
