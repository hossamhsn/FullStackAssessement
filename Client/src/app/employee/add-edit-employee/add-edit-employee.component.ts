import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  @Input() emp: any;
  id = "";
  name = "";
  department = "";
  dateOfJoining = "";


  ngOnInit(): void {
    debugger;
    this.loadEmployeeList();
  }

  loadEmployeeList() {
      this.id = this.emp.id;
      this.name = this.emp.name;
      this.department = this.emp.department;
      this.dateOfJoining = this.emp.dateOfJoining;

  }

  addEmployee() {
    var val = {
      Id: this.id,
      Name: this.name,
      Department: this.department,
      DateOfJoining: this.dateOfJoining
    };

    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      Id: this.id,
      Name: this.name,
      Department: this.department,
      DateOfJoining: this.dateOfJoining
    };

    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
