import { ConstructorOf } from '../../core/constructorof';
import { IBadge } from './badge';

const Badge: ConstructorOf<IBadge, Partial<IBadge> & { parameters?: any }> = require(`./badge.${Device.deviceOS.toLowerCase()}`).default;
type Badge = IBadge;
export default Badge;
