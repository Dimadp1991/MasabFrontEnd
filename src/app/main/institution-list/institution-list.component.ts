import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Institution } from 'src/app/Models/Institution';
@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css']
})
export class InstitutionListComponent implements OnInit {

  @Input() institution_list_compo = [];
  @Output() selectInstitution = new EventEmitter<Institution>();
  @Output() updateView = new EventEmitter();
  inst_to_delete;

  submitted=false;
  show_too_short_p = false;
  CreateInst_Form = new FormGroup({
    id: new FormControl(''),
    institution_name: new FormControl('', [Validators.required, Validators.maxLength(30),Validators.pattern(/^([^0-9]*)$/)]),
    institution_id: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, { updateOn: 'blur' });

  constructor(private modalService: ModalService, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  InstitutionClicked(institution) {
    this.selectInstitution.emit(institution);
    //console.log(customer);

  }
  openModal(id: string) {

    this.modalService.open(id);

  }


  Set_to_delete(i) {
    //console.log(i);
    this.inst_to_delete = i;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

  CreateInst_clicked() {


      this.submitted=true;
    if (!this.CreateInst_Form.get('institution_name').errors && !this.CreateInst_Form.get('institution_id').errors) {
      this.closeModal('create_new_inst_form');
      
    }
    else{
      return;
    }

    this.apiService.CreateInstitution(this.CreateInst_Form).subscribe(
      result => {
        this.updateView.emit();
        console.log('Create Form: ', result);
      },
      error => console.log(error)
    );

  }

  DeleteInst_clicked(inst_to_delete) {
    this.apiService.DeleteInstitution(inst_to_delete).subscribe(
      result => {
        this.updateView.emit();
        console.log('Deleted : ', result);
      },
      error => console.log(error)
    );

  }

}

