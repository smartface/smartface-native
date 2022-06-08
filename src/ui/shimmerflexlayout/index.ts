import { IShimmerFlexLayout } from './shimmerflexlayout';

const ShimmerFlexLayout: ConstructorOf<IShimmerFlexLayout, Partial<IShimmerFlexLayout>> = require(`./shimmerflexlayout.${Device.deviceOS.toLowerCase()}`).default;
type ShimmerFlexLayout = IShimmerFlexLayout;
export default ShimmerFlexLayout;
