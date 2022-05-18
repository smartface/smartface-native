import { ConstructorOf } from '../../core/constructorof';
import Image from '../image';
import ImageCacheType from '../shared/imagecachetype';
import { IGifImageView } from './gifimageview';

/**
 * @class UI.GifImageView
 * @extends UI.ImageView
 * @since 3.2.0
 *
 * GifImageView is simply an gifimage container where UI.GifImage is displayed inside.
 *
 *     @example
 *     import GifImage from '@smartface/native/ui/gifimage';
 *     import GifImageView from '@smartface/native/ui/gifimageview';
 *
 *     const myGifImage = GifImage.createFromFile("assets://smartface.gif")
 *     const myGifImageView = new GifImageView({
 *         gifImage: myGifImage,
 *         width: 200, height: 200
 *     });
 *
 *     myPage.layout.addChild(myGifImageView);
 *
 */
const GifImageView: ConstructorOf<IGifImageView, Partial<IGifImageView>> = require(`./gifimageview.${Device.deviceOS.toLowerCase()}`).default;
type GifImageView = IGifImageView;

export default GifImageView;
