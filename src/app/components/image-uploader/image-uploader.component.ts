import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
    file : File[] = [];
    fileName : string | null = null;
    imgData: any = null;

    @Input('initImage') initImage : string = "";
    @Output() getSelectedFile = new EventEmitter<File>();
    
    constructor() { }

    ngOnInit(): void {
	if(this.initImage !== ""){
	    this.imgData = this.initImage;
	}
    }    


    /**
     * loads the image from file into base64 and 
     * stores in imgData class attribute2
     **/
    readImageData(file : File){
	var reader = new FileReader();
	reader.onload = (e) => {
	    const target : any = e.target || {};
	    const src = target.result;
	    if(src){
		this.imgData = src;
	    }
	};
	reader.readAsDataURL(file);
    }

    handleFileSelect(event : any){
	const file = event.target.files[0];
	this.fileName = file.name;
	this.readImageData(file);

	//emit file select event
	this.getSelectedFile.emit(file);
    }
}
