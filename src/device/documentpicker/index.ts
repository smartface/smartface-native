import File from '../../io/file';
import Page from '../../ui/page';
import { DocumentPickerBase } from './documentpicker';

const DocumentPicker: typeof DocumentPickerBase = require(`./documentpicker.${Device.deviceOS.toLowerCase()}`).default;
type DocumentPicker = DocumentPickerBase;

export default DocumentPicker;
