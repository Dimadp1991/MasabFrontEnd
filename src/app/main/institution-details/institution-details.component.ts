import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-institution-details',
  templateUrl: './institution-details.component.html',
  styleUrls: ['./institution-details.component.css']
})
export class InstitutionDetailsComponent implements OnInit,OnChanges {

  
  @Input() institution;
  @Output() updateView=new EventEmitter();
  submitted=false;
  updated_successfully=false;
  ViewInst_Acc_Form= new FormGroup({
    id:new FormControl(''),
    institution_name: new FormControl('',[Validators.required,Validators.maxLength(30),Validators.pattern(/^([^0-9]*)$/)]),
    institution_id: new FormControl('',[Validators.required,Validators.minLength(8)])
  }, { updateOn: 'blur' });

  UpdateInst_Acc_Form= new FormGroup({
    id:new FormControl(''),
    institution_name: new FormControl(''),
    institution_id: new FormControl('')
  }, { updateOn: 'blur' });
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {


  }

  put_values_in_form(){
    this.ViewInst_Acc_Form.patchValue({
      id:this.institution.id,
      institution_name: this.institution.institution_name,
      institution_id: this.institution.institution_id,
    });

  }
  ngOnChanges(){
    if (this.institution != null) {

      this.put_values_in_form();
      console.log('uptading form');
    }
    this.updated_successfully=false;
  }


  UpdateInst_clicked(){
    this.UpdateInst_Acc_Form.patchValue({
      id:this.ViewInst_Acc_Form.get('id').value,
      institution_name: this.ViewInst_Acc_Form.get('institution_name').value,
      institution_id:this.ViewInst_Acc_Form.get('institution_id').value
    });

    this.submitted=true;
    if (this.ViewInst_Acc_Form.get('institution_name').errors || this.ViewInst_Acc_Form.get('institution_id').errors) {
      return;
    }

  
    this.apiService.UpdateInstitution(this.UpdateInst_Acc_Form).subscribe(
      result => {
        this.updateView.emit();
        console.log('Update Form: ', result);
        this.updated_successfully=true;
      },
      error => console.log(error)
    );
  

  }
}
