export function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
  document.getElementById('pageTitle').textContent = {
    home: 'Início',
    employees: 'Colaboradores',
    devices: 'Periféricos',
    reports: 'Relatórios'
  }[pageId];
}
