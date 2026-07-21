// react-ionicons ships .d.ts files auto-generated from PropTypes, which
// omit `className` even though every icon component reads and forwards
// it at runtime (see node_modules/react-ionicons/lib/Add.js). This
// override restores accurate types for the icons this app actually uses.
declare module "react-ionicons" {
	import type { FC, CSSProperties } from "react";

	interface IconProps {
		className?: string;
		style?: CSSProperties;
		color?: string;
		height?: string;
		width?: string;
		cssClasses?: string;
		title?: string;
		shake?: boolean;
		beat?: boolean;
		rotate?: boolean;
		onClick?: () => void;
	}

	export const Moon: FC<IconProps>;
	export const LogOutOutline: FC<IconProps>;
	export const SunnyOutline: FC<IconProps>;
	export const Person: FC<IconProps>;
	export const PieChartOutline: FC<IconProps>;
	export const ArrowDownOutline: FC<IconProps>;
	export const PricetagOutline: FC<IconProps>;
	export const RefreshOutline: FC<IconProps>;
	export const CloseCircleOutline: FC<IconProps>;
	export const ArrowBackCircleOutline: FC<IconProps>;
	export const LockClosedOutline: FC<IconProps>;
	export const ArrowForwardOutline: FC<IconProps>;
}
