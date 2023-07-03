import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({ selector: '[appDrag]' })
export class DragDirective {
  // 6
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  // 1.5
  @HostBinding('style.background') private background = '#eee';

  // 5
  constructor(private sanitizer: DomSanitizer) {}

  // 1
  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  // 2
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  // 3
  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';

    // 4
    let fileHandle: FileHandle;
    const file: any = evt.dataTransfer?.files[0];
    // 5.5
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );

    fileHandle = {
      file,
      url,
    };
    // 6.5
    this.files.emit(fileHandle);
  }
}
