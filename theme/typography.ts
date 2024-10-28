const generateFontStyle = (
  weight: number,
  size: string,
  lineHeight: string,
  letterSpacing: string,
  fontFamiliy: string = "var(--bricolage-grotesque)"
) => {
  return {
    fontWeight: weight,
    fontSize: size,
    lineHeight: lineHeight,
    letterSpacing: letterSpacing,
    fontFamily: fontFamiliy,
  };
};

const typography = {
  // bold
  ".text-h1-bold-56": generateFontStyle(700, "56px", "67px", "1%"),
  ".text-h2-bold-40": generateFontStyle(700, "40px", "54px", "1%"),
  ".text-h3-bold-32": generateFontStyle(800, "32px", "40px", "1%"),
  ".text-h4-bold-24": generateFontStyle(700, "24px", "32px", "1%"),
  ".text-h5-bold-18": generateFontStyle(700, "18px", "24px", "1%"),
  ".text-body-bold-16": generateFontStyle(
    700,
    "16px",
    "24px",
    "2%",
    "var(--instrument-sans)"
  ),
  ".text-small-body-bold-14": generateFontStyle(
    700,
    "14px",
    "20px",
    "2%",
    "var(--instrument-sans)"
  ),
  ".text-caption-bold-12": generateFontStyle(
    700,
    "12px",
    "20px",
    "2%",
    "var(--instrument-sans)"
  ),
  // medium
  ".text-h1-medium-56": generateFontStyle(500, "56px", "67px", "1%"),
  ".text-h2-medium-40": generateFontStyle(500, "40px", "54px", "1%"),
  ".text-h3-medium-32": generateFontStyle(500, "32px", "40px", "1%"),
  ".text-h4-medium-24": generateFontStyle(500, "24px", "32px", "1%"),
  ".text-h5-medium-18": generateFontStyle(500, "18px", "24px", "1%"),
  ".text-body-medium-16": generateFontStyle(
    500,
    "16px",
    "24px",
    "1%",
    "var(--instrument-sans)"
  ),
  ".text-small-body-medium-14": generateFontStyle(
    500,
    "14px",
    "24px",
    "1%",
    "var(--instrument-sans)"
  ),
  ".text-caption-medium-12": generateFontStyle(
    500,
    "12px",
    "24px",
    "1%",
    "var(--instrument-sans)"
  ),

  //paragraph
  ".text-paragraph-small-medium": generateFontStyle(
    500,
    "14px",
    "20px",
    "1%",
    "var(--inter)"
  ),
  ".text-paragraph-xsmall-medium": generateFontStyle(
    500,
    "12px",
    "17px",
    "1%",
    "var(--inter)"
  ),
  ".text-paragraph-small-regular": generateFontStyle(
    400,
    "14px",
    "20px",
    "1%",
    "var(--inter)"
  ),
  ".text-paragraph-medium-medium": generateFontStyle(
    500,
    "16px",
    "23px",
    "1%",
    "var(--inter)"
  ),
  ".text-paragraph-xsmall-semibold": generateFontStyle(
    600,
    "12px",
    "17px",
    "1%",
    "var(--inter)"
  ),
  ".text-paragraph-small-semibold": generateFontStyle(
    600,
    "14px",
    "20px",
    "1%",
    "var(--inter)"
  ),

  // regular
  ".text-h1-regular-56": generateFontStyle(400, "56px", "67px", "1%"),
  ".text-h2-regular-40": generateFontStyle(400, "40px", "54px", "1%"),
  ".text-h3-regular-32": generateFontStyle(400, "32px", "40px", "1%"),
  ".text-h4-regular-24": generateFontStyle(400, "24px", "32px", "1%"),
  ".text-h5-regular-18": generateFontStyle(400, "18px", "24px", "1%"),
  ".text-body-regular-16": generateFontStyle(
    400,
    "16px",
    "20px",
    "1%",
    "var(--instrument-sans)"
  ),
  ".text-small-body-regular-14": generateFontStyle(
    400,
    "14px",
    "20px",
    "1%",
    "var(--instrument-sans)"
  ),
  ".text-caption-regular-12": generateFontStyle(
    400,
    "12px",
    "20px",
    "1%",
    "var(--instrument-sans)"
  ),
};

export default typography;
