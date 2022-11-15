const elements = new Map();

document.addEventListener('click', event => Array.from(elements.entries()).forEach(([ref, action]) => {
  if (ref && !ref.contains(event.target)) {
    action();
    elements.delete(ref);
  }
}));

const useClickOutside = (ref, action) => elements.set(ref, action);

export default useClickOutside;
