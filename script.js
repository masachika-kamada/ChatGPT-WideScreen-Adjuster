// Keeps a reference to the <style> element that we inject into <head>.
let styleElement;

/**
 * Update the ChatGPT content width by overriding the custom CSS variable
 * '--thread-content-max-width' on the main chat container and all its children.
 *
 * @param {number|string} widthRem - The desired width in rem units (e.g. 70).
 */
function updateWidth(widthRem) {
  // If we already injected a <style> element previously, remove it first
  // so we don't accumulate multiple conflicting rules.
  if (styleElement) {
    styleElement.remove(); // Remove the existing injected <style> from <head>.
  }

  // Create a new <style> element that will hold our CSS overrides.
  styleElement = document.createElement('style'); // Make a fresh <style> node.

  // Define CSS that forces the custom property on <main> and all its descendants.
  // This is more robust than targeting a single specific class and should still work
  // as long as ChatGPT uses '--thread-content-max-width' somewhere in the layout.
  styleElement.textContent = `
    main,                          /* Target the main chat container element. */
    main * {                       /* Target all elements inside the main container. */
      --thread-content-max-width: ${widthRem}rem !important; /* Override width variable everywhere inside main. */
    }
  `; // End of the CSS string that we inject.

  // Append the <style> element to <head> so the browser applies our CSS.
  document.head.appendChild(styleElement); // Inject our CSS into the page.
}

// When the content script loads, read the saved width from chrome.storage.local.
chrome.storage.local.get('width', ({ width }) => {
  // If for some reason 'width' is undefined, fall back to 70rem as a safe default.
  const safeWidth = width ?? 70; // Use stored width if present, otherwise default to 70.
  updateWidth(safeWidth);        // Apply the initial width override to the page.
});

// Listen for changes to chrome.storage.local so moving the slider updates the page live.
chrome.storage.onChanged.addListener((changes, area) => {
  // Only react to changes in the 'local' area that affect the 'width' key.
  if (area === 'local' && changes.width) {       // Check that 'width' was changed in local storage.
    updateWidth(changes.width.newValue);         // Apply the new width value from storage.
  }
});
