const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmpty = (value: string) => value == null || (Array.isArray(value) && value.length === 0);

export const validateEmail = (value: string) => {
  if (isEmpty(value)) {
    return null;
  }
  console.log(value, EMAIL_REGEXP.test(value));
  return EMAIL_REGEXP.test(value);
};

export const getOffset = (el: HTMLElement) => {
  const box = el.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    top: box.top + window.scrollY - docElem.clientTop,
    left: box.left + window.scrollX - docElem.clientLeft,
  };
};
