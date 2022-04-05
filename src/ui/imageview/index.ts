import { AbstractImageView } from './imageview';

/**
 * @since 0.1
 * ImageView is simply an image container where UI.Image is displayed inside.
 *
 *     @example
 *     import Image from '@smartface/native/ui/image';
 *     import ImageView from '@smartface/native/ui/imageview';
 *
 *     const myImage = Image.createFromFile("images://smartface.png")
 *     const myImageView = new ImageView({
 *         image: myImage,
 *         left: 0, width: 300, height: 400
 *     });
 *
 *     myPage.layout.addChild(myImageView);
 *
 */
const ImageView: typeof AbstractImageView = require(`./imageview.${Device.deviceOS.toLowerCase()}`).default;
type ImageView = AbstractImageView;

export default ImageView;
