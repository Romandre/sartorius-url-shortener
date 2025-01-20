export interface SartoriusColors {
  primary: string;
  secondary: string;
  background: string;
}

export interface SartoriusThemeTokens {
  color: SartoriusColors;
}

export const colors: SartoriusColors = {
  primary: "#FFED00",
  secondary: "#000000",
  background: "#FFFFFF",
};

export const tokens: SartoriusThemeTokens = {
  color: colors,
};

export default tokens;
