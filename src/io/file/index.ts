import { PathFileType } from '../path/path';
import { AbstractFile, IFile } from './file';

class FileImpl extends AbstractFile {
  get name(): string {
    throw new Error('Method not implemented.');
  }
  set name(value: string) {
    throw new Error('Method not implemented.');
  }
  get fullPath(): string {
    throw new Error('Method not implemented.');
  }
  set fullPath(value: string) {
    throw new Error('Method not implemented.');
  }
  get type(): PathFileType {
    throw new Error('Method not implemented.');
  }
  set type(value: PathFileType) {
    throw new Error('Method not implemented.');
  }
  get creationDate(): number {
    throw new Error('Method not implemented.');
  }
  set creationDate(value: number) {
    throw new Error('Method not implemented.');
  }
  get exists(): boolean {
    throw new Error('Method not implemented.');
  }
  set exists(value: boolean) {
    throw new Error('Method not implemented.');
  }
  get extension(): string {
    throw new Error('Method not implemented.');
  }
  set extension(value: string) {
    throw new Error('Method not implemented.');
  }
  get isDirectory(): boolean {
    throw new Error('Method not implemented.');
  }
  set isDirectory(value: boolean) {
    throw new Error('Method not implemented.');
  }
  get isFile(): boolean {
    throw new Error('Method not implemented.');
  }
  set isFile(value: boolean) {
    throw new Error('Method not implemented.');
  }
  get modifiedDate(): number {
    throw new Error('Method not implemented.');
  }
  set modifiedDate(value: number) {
    throw new Error('Method not implemented.');
  }
  get parent(): IFile | null {
    throw new Error('Method not implemented.');
  }
  set parent(value: IFile | null) {
    throw new Error('Method not implemented.');
  }
  get path(): string {
    throw new Error('Method not implemented.');
  }
  set path(value: string) {
    throw new Error('Method not implemented.');
  }
  get size(): number {
    throw new Error('Method not implemented.');
  }
  set size(value: number) {
    throw new Error('Method not implemented.');
  }
  get writable(): boolean {
    throw new Error('Method not implemented.');
  }
  constructor(params: Partial<IFile>) {
    super(params);
  }
}

const File: typeof FileImpl = require(`./file.${Device.deviceOS.toLowerCase()}`).default;
type File = FileImpl;
export default File;
