document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const sliderLabel = document.getElementById('slider-label');

  // Initial label value set
  sliderLabel.textContent = slider.value;

  function updateSliderColor() {
    const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(90deg, #4BD865 ${percent}%, #CCCCCC ${percent}%)`;
  }

  chrome.storage.local.get('width', ({ width }) => {
    slider.value = width;
    sliderLabel.textContent = slider.value; // Update label when width is retrieved
    updateSliderColor();
  });

  slider.addEventListener('change', () => {
    chrome.storage.local.set({ width: slider.value });
    sliderLabel.textContent = slider.value; // Update label when slider value changes
    updateSliderColor();
  });

  slider.addEventListener('input', () => {
    sliderLabel.textContent = slider.value; // Update label when slider value changes
    updateSliderColor();
  });
});
