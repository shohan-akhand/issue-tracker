import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Output, EventEmitter } from '@angular/core';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  issueForm: FormGroup | undefined;

  suggestions: Issue[] = [];

  addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit();
  }

  @Output() formClose = new EventEmitter();

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
  ) {}
  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.issueForm.controls['title'].valueChanges.subscribe((title: string) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }
}
