import { Injectable } from '@angular/core';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues: Issue[] = [];

  constructor() {}

  getPendingIssues(): Issue[] {
    return this.issues.filter((issue) => !issue.completed);
  }
}
