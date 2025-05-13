import { employees } from './dashboard.js';
import { updateEmployeeTable, updateEmployeeDropdown } from './employees.js';
import { updateReportsTable } from './reports.js';

export function bindDeviceEvents() {
  document.getElementById('newDeviceBtn').addEventListener('click', () => showDeviceForm());
  document.getElementById('cancelDeviceBtn').addEventListener('click', hideDeviceForm);
  document.getElementById('saveDeviceBtn').addEventListener('click', saveDevice);
}

export let devices = [];

export function updateDeviceTable() {
  const table = document.getElementById('devicesTable');
  if (devices.length === 0) {
    table.innerHTML = '<tr><td class="px-6 py-4 text-sm text-gray-500" colspan="7">Nenhum periférico cadastrado</td></tr>';
    return;
  }

  table.innerHTML = devices.map(device => {
    const employee = device.employeeId ? employees.find(e => e.id === device.employeeId) : null;
    return `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${device.type}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${device.model}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${device.assetNumber}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${device.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${device.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
            ${device.status}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee ? employee.name : '-'}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button class="text-blue-600 hover:text-blue-800 mr-3" onclick="editDevice(${device.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="text-red-600 hover:text-red-800" onclick="deleteDevice(${device.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

export function showDeviceForm(edit = false) {
  document.getElementById('deviceForm').classList.remove('hidden');
  if (!edit) {
    document.getElementById('deviceType').value = '';
    document.getElementById('deviceModel').value = '';
    document.getElementById('deviceAssetNumber').value = '';
    document.getElementById('deviceName').value = '';
    document.getElementById('deviceStatus').value = 'Ativo';
    document.getElementById('deviceEmployee').value = '';
    window.currentDeviceId = null;
  }
}

export function hideDeviceForm() {
  document.getElementById('deviceForm').classList.add('hidden');
}

export function saveDevice() {
  const type = document.getElementById('deviceType').value;
  const model = document.getElementById('deviceModel').value;
  const assetNumber = document.getElementById('deviceAssetNumber').value;
  const name = document.getElementById('deviceName').value;
  const status = document.getElementById('deviceStatus').value;
  const employeeId = document.getElementById('deviceEmployee').value ? parseInt(document.getElementById('deviceEmployee').value) : null;

  if (!type || !model || !assetNumber || !name) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const typeCount = devices.filter(d => d.type === type && (window.currentDeviceId === null || d.id !== window.currentDeviceId)).length;
  if (window.currentDeviceId === null && typeCount >= 20) {
    alert(`Limite de 20 ${type}s atingido.`);
    return;
  }

  if (window.currentDeviceId === null) {
    const newId = devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1;
    devices.push({ id: newId, type, model, assetNumber, name, status, employeeId });
  } else {
    const index = devices.findIndex(d => d.id === window.currentDeviceId);
    if (index !== -1) {
      devices[index] = { ...devices[index], type, model, assetNumber, name, status, employeeId };
    }
  }

  hideDeviceForm();
  updateDeviceTable();
  updateReportsTable();
}

export function editDevice(id) {
  const device = devices.find(d => d.id === id);
  if (device) {
    window.currentDeviceId = id;
    document.getElementById('deviceType').value = device.type;
    document.getElementById('deviceModel').value = device.model;
    document.getElementById('deviceAssetNumber').value = device.assetNumber;
    document.getElementById('deviceName').value = device.name;
    document.getElementById('deviceStatus').value = device.status;
    document.getElementById('deviceEmployee').value = device.employeeId || '';
    showDeviceForm(true);
  }
}

export function deleteDevice(id) {
  const confirmation = confirm('Tem certeza que deseja excluir este periférico?');
  if (!confirmation) return;

  devices = devices.filter(d => d.id !== id);
  updateDeviceTable();
  updateReportsTable();
}
