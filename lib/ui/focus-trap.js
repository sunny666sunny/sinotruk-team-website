const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isFocusable(element) {
  if (element.matches('input[type="hidden"]') || element.disabled || element.tabIndex < 0) {
    return false;
  }

  if (element.hidden || element.closest('[hidden], [aria-hidden="true"], [inert]')) {
    return false;
  }

  const view = element.ownerDocument?.defaultView;
  const style = view?.getComputedStyle?.(element);
  return style?.display !== 'none' && style?.visibility !== 'hidden';
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(isFocusable);
}

function trapFocus(event, container) {
  if (event.key !== 'Tab') return;

  const focusable = getFocusableElements(container);
  if (!focusable.length) {
    event.preventDefault();
    container.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && event.target === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && event.target === last) {
    event.preventDefault();
    first.focus();
  }
}

function activateDrawer(container, documentRef = document) {
  const previousActiveElement = documentRef.activeElement;
  const previousOverflow = documentRef.body.style.overflow;
  documentRef.body.style.overflow = 'hidden';
  (getFocusableElements(container)[0] || container).focus();

  return () => {
    documentRef.body.style.overflow = previousOverflow;
    if (previousActiveElement?.isConnected && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  };
}

function handleDrawerKeyDown(event, container, onClose) {
  if (event.key === 'Escape') {
    event.preventDefault();
    onClose();
    return;
  }

  trapFocus(event, container);
}

module.exports = { activateDrawer, getFocusableElements, handleDrawerKeyDown, trapFocus };
