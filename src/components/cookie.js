/* eslint-disable no-useless-escape */

export const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-1; path=/';
};
