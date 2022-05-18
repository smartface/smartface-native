import { AbstractShimmerFlexLayout, IShimmerFlexLayout } from './shimmerflexlayout';

const ShimmerFlexLayout: typeof AbstractShimmerFlexLayout = require(`./shimmerflexlayout.${Device.deviceOS.toLowerCase()}`).default;
type ShimmerFlexLayout = IShimmerFlexLayout;
export default ShimmerFlexLayout;
