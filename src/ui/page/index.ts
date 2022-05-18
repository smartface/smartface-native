import { PageImpl } from './page';

const Page: typeof PageImpl = require(`./page.${Device.deviceOS.toLowerCase()}`).default;
type Page = PageImpl;
export default Page;
