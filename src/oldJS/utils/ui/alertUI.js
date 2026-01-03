import { ALERT_DURATION } from '../constants.js';
import { dom } from './dom.js';

// Shows an alert and hides it after 3000 ms
export const showAlert = (text) => {
  dom.alertContainer.textContent = text;
  dom.alertContainer.classList.remove('alert-hidden');
  dom.alertContainer.classList.add('alert-visible');

  setTimeout(() => {
    dom.alertContainer.classList.remove('alert-visible');
    dom.alertContainer.classList.add('alert-hidden');
  }, ALERT_DURATION);
};
