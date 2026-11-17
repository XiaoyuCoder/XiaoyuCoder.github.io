const toast = document.querySelector('.toast');
let toastTimeout;
function notify(message) {
  clearTimeout(toastTimeout);
  if (citationDialog.open) {
    document.querySelector('.citation-feedback').textContent = message;
    return;
  }
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
}

const copyEmail = document.querySelector('.copy-email');
const copyCitation = document.querySelector('.copy-citation');
const citation = document.querySelector('#bibtex-content');
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
  copyCitation.addEventListener('click', () => copyText(citation.textContent, 'BibTeX 已复制'));
} else {
  copyCitation.hidden = true;
}

const citationDialog = document.querySelector('#citation-dialog');
const citationTrigger = document.querySelector('.citation-trigger');
if (typeof citationDialog.showModal === 'function') {
  citationTrigger.hidden = false;
  citationTrigger.addEventListener('click', () => {
    document.querySelector('.citation-feedback').textContent = '';
    citationDialog.showModal();
    document.body.classList.add('dialog-open');
  });
  document.querySelector('.dialog-close').addEventListener('click', () => citationDialog.close());
  citationDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  citationDialog.addEventListener('click', event => {
    const bounds = citationDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) citationDialog.close();
  });
}
