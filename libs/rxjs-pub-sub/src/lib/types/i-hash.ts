import { Subject } from 'rxjs/internal/Subject';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SubjectType } from './subject-type.enum';

export interface IHash {
  [key: string]: {
    type: SubjectType;
    ref: Subject<any> | BehaviorSubject<any> | ReplaySubject<any>
  };
}
