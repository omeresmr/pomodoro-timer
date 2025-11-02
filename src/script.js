'use strict';

////////////////////////////////////
// DOM Elements
const settingsButton = document.querySelector('.settings-button');
const blurOverlay = document.querySelector('.overlay');
const settingsModal = document.querySelector('.settings-modal');
const closeSettingsButton = document.querySelector('.close-settings-modal');

////////////////////////////////////
// Constants

////////////////////////////////////
// Variables

////////////////////////////////////
// Functions
const toggleSettingsModal = function () {
  blurOverlay.classList.toggle('hidden');
  settingsModal.classList.toggle('modal-hidden');
  settingsModal.classList.toggle('modal-visible');

  console.log(settingsModal.clientWidth);
};

////////////////////////////////////
// Events
settingsButton.addEventListener('click', toggleSettingsModal);

settingsModal.addEventListener('click', function (e) {
  const clickedElement = e.target;
  // Select Toggle Button
  const toggleButton = clickedElement.closest('.toggle-button');

  // Check if the Toggle Button got clicked
  if (toggleButton) {
    // Select the Circle in the Toggle Button
    const circle = toggleButton.querySelector('.toggle-button-circle');

    // Change the Position of the Circle (left or right)
    circle.classList.toggle('toggle-inactive');
    circle.classList.toggle('toggle-active');

    // Change the Background-Color
    toggleButton.classList.toggle('bg-accent');
  }
});

closeSettingsButton.addEventListener('click', toggleSettingsModal);

////////////////////////////////////
// Initialization

// TODO
//
