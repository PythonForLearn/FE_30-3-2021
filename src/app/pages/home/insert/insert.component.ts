import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnChanges {
  insertForm: any;
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;
  constructor(private _productService: ProductService
    , private formBuilder: FormBuilder
    , private route: Router
    , private ngbActiveModal: NgbActiveModal  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.item);
  }

  public item : any;
  public url: string = "";
  ngOnInit(): void {
   this.loadItem();
    
  }

  loadItem() {
    this.insertForm = this.formBuilder.group({
      name: [ this.item ? this.item.name : '', Validators.required],
      code: [ this.item ? this.item.code : '', [Validators.required]],
      quantity: [ this.item ? this.item.quantity : '', [Validators.required]],
      imageURL: [ this.item ? this.item.imageURL : '', [Validators.required]]
    });
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.code}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = "Save";
  }

  save(event : any) {
    if(this.item) {
       this.Update();
       return;
    }
    this.Insert();
  }
  close(event : any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  Insert() {
    const products = { name: this.insertForm.value.name, code: parseInt(this.insertForm.value.code), quantity: parseInt(this.insertForm.value.quantity), imageURL: this.insertForm.value.imageURL };
    if (this.insertForm.dirty && this.insertForm.valid) {
      this._productService.InsertProduct(products as any)
        .subscribe(data => {
          this.ngbActiveModal.close();
        }, e => {
          console.log(e)
        })
    }
    // if(this.url == '/home/insert')
    // {
    
    // }
    // if(this.url == "/home/update/"+this.idProduct){
    //   this.Update();
    // }
    // if(this.url == "/home/delete/"+this.idProduct){
    //   this.Delete();
    // }

  }

  Update(){
    const products = {id: this.item?.id, name: this.insertForm.value.name, code: parseInt(this.insertForm.value.code), quantity: parseInt(this.insertForm.value.quantity), imageURL: this.insertForm.value.imageURL };
    if (this.insertForm.dirty && this.insertForm.valid) {
      this._productService.UpdateProduct(products)
        .subscribe(data => {
          console.log(data);
          this.ngbActiveModal.close();
       }, e => {
          console.log(e)
        })
    }
  }

  Delete(){
   this._productService.DeleteProduct(this.item?.id).subscribe(e => console.log(e));
  }

}
