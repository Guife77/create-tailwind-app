import { employees, devices } from './dashboard.js';
import { updateEmployeeDropdown } from './devices.js';
import { updateReportsTable } from './reports.js';

export function bindEmployeeEvents() {
  document.getElementById('newEmployeeBtn').addEventListener('click', () => showEmployeeForm());
  document.getElementById('cancelEmployeeBtn').addEventListener('click', hideEmployeeForm);
  document.getElementById('saveEmployeeBtn').addEventListener('click', saveEmployee);
}

export function updateEmployeeTable() {
  const table = document.getElementById('employeesTable');
  if (employees.length === 0) {
    table.innerHTML = '<tr><td class="px-6 py-4 text-sm text-gray-500" colspan="5">Nenhum colaborador cadastrado</td></tr>';
    return;
  }

  table.innerHTML = employees.map(employee => `
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.department}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.position}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.email}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button class="text-blue-600 hover:text-blue-800 mr-3" onclick="editEmployee(${employee.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-red-600 hover:text-red-800" onclick="deleteEmployee(${employee.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

export function showEmployeeForm(edit = false) {
  document.getElementById('employeeForm').classList.remove('hidden');
  if (!edit) {
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeDepartment').value = '';
    document.getElementById('employeePosition').value = '';
    document.getElementById('employeeEmail').value = '';
    window.currentEmployeeId = null;
  }
}

export function hideEmployeeForm() {
  document.getElementById('employeeForm').classList.add('hidden');
}

export function saveEmployee() {
  const name = document.getElementById('employeeName').value;
  const department = document.getElementById('employeeDepartment').value;
  const position = document.getElementById('employeePosition').value;
  const email = document.getElementById('employeeEmail').value;

  if (!name || !department || !position || !email) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (window.currentEmployeeId === null) {
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({ id: newId, name, department, position, email });
  } else {
    const index = employees.findIndex(e => e.id === window.currentEmployeeId);
    if (index !== -1) {
      employees[index] = { ...employees[index], name, department, position, email };
    }
  }

  hideEmployeeForm();
  updateEmployeeTable();
  updateEmployeeDropdown();
  updateReportsTable();
}

export function editEmployee(id) {
  const employee = employees.find(e => e.id === id);
  if (employee) {
    window.currentEmployeeId = id;
    document.getElementById('employeeName').value = employee.name;
    document.getElementById('employeeDepartment').value = employee.department;
    document.getElementById('employeePosition').value = employee.position;
    document.getElementById('employeeEmail').value = employee.email;
    showEmployeeForm(true);
  }
}

export function deleteEmployee(id) {
  const confirmation = confirm('Tem certeza que deseja excluir este colaborador? Todos os periféricos vinculados a ele serão desvinculados.');
  if (!confirmation) return;

  devices.forEach(device => {
    if (device.employeeId === id) {
      device.employeeId = null;
    }
  });

  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
  }

  updateEmployeeTable();
  updateEmployeeDropdown();
  updateReportsTable();
}
