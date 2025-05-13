let confirmCallback = null;

export function bindModalEvents() {
  document.getElementById('cancelConfirmBtn').addEventListener('click', hideConfirmModal);
  document.getElementById('confirmBtn').addEventListener('click', function () {
    if (confirmCallback) confirmCallback();
    hideConfirmModal();
  });
}

export function showConfirmModal(title, message, callback) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmModal').classList.remove('hidden');
  confirmCallback = callback;
}

export function hideConfirmModal() {
  document.getElementById('confirmModal').classList.add('hidden');
  confirmCallback = null;
}
