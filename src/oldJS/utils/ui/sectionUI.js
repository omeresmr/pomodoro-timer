import { dom } from './dom.js';
import { TRANSLATE } from '../constants.js';

// Repositions all sections based on their relative index to the target section
const slideToSection = (targetSection) => {
  const currentSection = document.querySelector('.current-section');

  if (currentSection === targetSection) return;

  const targetIndex = targetSection.dataset.index;

  // Set the current-section class (important for main.js)
  currentSection.classList.remove('current-section');
  targetSection.classList.add('current-section');

  // Toggle "inert" attribute, so that tabbing works as expected
  currentSection.toggleAttribute('inert');
  targetSection.toggleAttribute('inert');

  // I have 3 sections, so the range is from -200 to 200.
  const translateValues = [-200, -100, 0, 100, 200];
  dom.sections.forEach((section) => {
    // 1. Remove every translate class from every section
    translateValues.forEach((v) =>
      section.classList.remove(`translate-x-[${v}vw]`),
    );
    // 2. Calculate the new position value
    const position = (section.dataset.index - targetIndex) * 100;

    // 3. Move the section to the new position
    section.classList.add(`${TRANSLATE[position]}`);
  });
};

export const navigateToSection = (targetElement) => {
  // Unhighlight every menu element
  dom.menuElements.forEach((el) => el.classList.remove('selected-menu'));

  // Highlight menu element
  targetElement.classList.add('selected-menu');

  const targetSection = document.querySelector(
    `.${targetElement.dataset.target}-section`,
  );

  if (!targetSection) return;

  slideToSection(targetSection);
};
