let styleElement;

function updateWidth(width) {
  if (styleElement) {
    document.head.removeChild(styleElement);
  }

  styleElement = document.createElement('style');
  styleElement.textContent = `
    .\\[--thread-content-max-width\\:32rem\\] {
      --thread-content-max-width: ${width}rem !important;
    }
  `;
  document.head.appendChild(styleElement);
}

chrome.storage.local.get('width', ({ width }) => {
  updateWidth(width);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.width) {
    updateWidth(changes.width.newValue);
  }
});
