import { employees, devices } from './dashboard.js';

export function bindReportEvents() {
  document.getElementById('reportTypeFilter').addEventListener('change', updateReportsTable);
  document.getElementById('reportEmployeeFilter').addEventListener('change', updateReportsTable);
  document.getElementById('reportStatusFilter').addEventListener('change', updateReportsTable);
  document.getElementById('exportReportBtn').addEventListener('click', exportReport);
}

// ... Inclui aqui as funções: updateReportsTable, exportReport, updateRecentDevicesTable ...
