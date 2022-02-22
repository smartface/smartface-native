import { DocumentPickerBase } from './documentpicker';

const DocumentPicker: typeof DocumentPickerBase = require(`./documentpicker.${Device.deviceOS.toLowerCase()}`).default;
type DocumentPicker = DocumentPickerBase;

export default DocumentPicker;
