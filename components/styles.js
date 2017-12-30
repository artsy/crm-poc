//
// Library of variables used in styling.
// TODO: A handful of these could probably move to Reaction.
//
import * as fonts from '@artsy/reaction-force/dist/Assets/Fonts'
import _colors from '@artsy/reaction-force/dist/Assets/Colors'

export const colors = _colors

export const sidebarWidth = 200

export const margins = {
  xs: 10,
  s: 20,
  m: 30,
  l: 60,
  xl: 90
}

export const type = (family, size) => {
  if (family === 'avantgarde') {
    return `
      font-family: ${fonts.primary.fontFamily};
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: ${(() => {
        switch (size) {
          case 'body':
            return '13px'
          case 'm-headline':
            return '15px'
          default:
            return '13px'
        }
      })()};
    `
  } else if (family === 'garamond') {
    return `
      font-family: ${fonts.secondary.fontFamily};
      font-size: ${(() => {
        switch (size) {
          case 'l-headline':
            return '37px'
          case 's-body':
            return '17px'
          default:
            return '17px'
        }
      })()};
    `
  }
}
