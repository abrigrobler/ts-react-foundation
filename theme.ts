const theme = {
  colors: {
    darkGrey: '#333333',
    darkerGrey: '#383837',
    lightGrey: '#9c9c9c',
    primary: '#DF7531',
    specialTextOverlay: '#f5f5f5',
    selectionPrimary: 'rgba(223, 117, 49, 0.26)',
    borderGrey: '#DEE2E6',
    backgroundGrey: '#e2e2e2',
    backgroundOverlay: 'rgba(0,0,0,0.3)',
    green: '#00A300',
    blue: '#2096BA',
  },
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
  elevationShadow: '1px 1px 5px 0px rgba(0,0,0,0.1)',
  cardShadow: '0px 3px 10px 0px #0000000D',
  borderRadius: {
    small: '4px',
    medium: '10px',
    large: '20px',
  },
  borders: {
    standard1px: `1px solid #9c9c9c`,
  },
  mediaQueries: {
    wideScreenOnly: 'only screen and (min-width : 1200px)',
    desktopOnly: 'only screen and (min-width : 1025px)',
    tabletOnly: 'only screen and (min-width : 768px) and (max-width : 1024px)',
    mobileOnly: 'only screen and (max-width: 767px)',
    tabletDown: 'only screen and (max-width : 1024px)',
    tabletUp: 'only screen and (min-width : 768px)',
  },
};

export default theme;
