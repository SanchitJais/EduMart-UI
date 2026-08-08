// Category icon component

import {
  FiBook,
  FiEdit3,
  FiGrid,
  FiFileText,
} from 'react-icons/fi';

import {
  MdOutlineSportsBasketball,
  MdOutlineScience,
  MdOutlineLunchDining,
} from 'react-icons/md';

import {
  GiSchoolBag,
  GiWaterBottle,
  GiPuzzle,
  GiRunningShoe,
  GiChocolateBar,
  GiPaintBrush,
  GiBabyFace,
  GiWheat,
  GiOpenedFoodCan,
} from 'react-icons/gi';

import { IoNutritionOutline } from 'react-icons/io5';
import { TbSalad, TbBottle, TbShirt, TbLeaf } from 'react-icons/tb';

// ── Icon Map ─────────────────────────────────────────────────
const ICON_MAP = {
  books:                FiBook,
  stationery:           FiEdit3,
  'school-bags':        GiSchoolBag,
  'lunch-boxes':        GiOpenedFoodCan,
  'water-bottles':      GiWaterBottle,
  'healthy-snacks':     TbSalad,
  'educational-toys':   GiPuzzle,
  notebooks:            FiFileText,
  'art-supplies':       GiPaintBrush,
  uniforms:             TbShirt,
  shoes:                GiRunningShoe,
  'sports-equipment':   MdOutlineSportsBasketball,
  'stem-kits':          MdOutlineScience,
  'breakfast-cereals':  GiWheat,
  'dry-fruits-nuts':    IoNutritionOutline,
  'protein-bars':       GiChocolateBar,
  'health-drinks':      TbBottle,
  'organic-foods':      TbLeaf,
  'baby-food':          GiBabyFace,
  'school-lunch-snacks':MdOutlineLunchDining,
};

// ── Component ─────────────────────────────────────────────────
const CategoryIcon = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return <FiGrid size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export { ICON_MAP };
export default CategoryIcon;
