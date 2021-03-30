import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/data/product';
import { ProductService } from 'src/services/product.service';
import { InsertComponent } from './insert/insert.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   closeResult = '';

  constructor(private _productService: ProductService, private activeRouter: ActivatedRoute , private modalService: NgbModal) { }

  

  public products: Product[] = [];
  ngOnInit(): void {
    this.ShowProduct();
  }

  ShowProduct(){
    this._productService.GetProduct()
      .subscribe(data => {
        console.log(data)
        return this.products = data;
      });
  }
  
  Delete(id:string){
    return this._productService.DeleteProduct(id).subscribe(e => console.log(e));
  }


  open(item : any) {
    console.log(item);
    var modalRef =  this.modalService.open(InsertComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      console.log(result);
      this.ShowProduct();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
