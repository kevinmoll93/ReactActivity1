export const validateInputForm = e => {
  const selectHtml = e.target.parentElement.parentElement.querySelectorAll(
    'select',
  );

  let inputsHtml = e.target.parentElement.parentElement.querySelectorAll(
    '.datos input',
  );

  const input = Object.values(inputsHtml).some(
    input => input.value.length === 0,
  );

  let select = false;
  if (selectHtml) {
    select = Object.values(selectHtml).some(select => select.value === '0');
  }

  if (input || select) {
    return true;
  } else {
    return false;
  }
};

export const enterHandler = (visible, addItem) => {
  document.addEventListener('keypress', e => {
    if (visible === false && e.code === 'Enter') {
      addItem();
    }
  });
};