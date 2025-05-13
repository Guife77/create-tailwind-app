import { updateDeviceTable } from './devices.js';
import { updateEmployeeTable } from './employees.js';
import { updateReportsTable } from './reports.js';

export let employees = [];
export let devices = [];

export function initializeData() {
  updateEmployeeTable();
  updateDeviceTable();
  updateReportsTable();
  updateDashboardCounts();
}

export function updateDashboardCounts() {
  const computerCount = devices.filter(d => d.type === 'Computador').length;
  const kitCount = devices.filter(d => d.type === 'Mouse/Teclado').length;
  const phoneCount = devices.filter(d => d.type === 'Celular').length;

  document.getElementById('computerCount').textContent = computerCount;
  document.getElementById('kitCount').textContent = kitCount;
  document.getElementById('phoneCount').textContent = phoneCount;

  document.getElementById('computerProgress').style.width = `${(computerCount / 20) * 100}%`;
  document.getElementById('kitProgress').style.width = `${(kitCount / 20) * 100}%`;
  document.getElementById('phoneProgress').style.width = `${(phoneCount / 20) * 100}%`;
}