import { initializeData } from './dashboard.js';
import { showPage } from './navigation.js';
import { bindEmployeeEvents } from './employees.js';
import { bindDeviceEvents } from './devices.js';
import { bindReportEvents } from './reports.js';
import { bindModalEvents } from './modals.js';

document.addEventListener('DOMContentLoaded', function () {
  initializeData();
  bindEmployeeEvents();
  bindDeviceEvents();
  bindReportEvents();
  bindModalEvents();

  // Sidebar toggle
  document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('active');
  });
});