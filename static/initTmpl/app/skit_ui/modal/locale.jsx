import defaultLocale from '../locale-provider/default';


let runtimeLocale = {
  ...defaultLocale.Modal,
};

export function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = {
      ...runtimeLocale,
      ...newLocale,
    };
  } else {
    runtimeLocale = {
      ...defaultLocale.Modal,
    };
  }
}

export function getConfirmLocale() {
  return runtimeLocale;
}
