import { AnimatorBase } from './animator';

const Animator: typeof AnimatorBase = require(`./animator.${Device.deviceOS.toLowerCase()}`).default;
type Animator = AnimatorBase;

export default Animator;
