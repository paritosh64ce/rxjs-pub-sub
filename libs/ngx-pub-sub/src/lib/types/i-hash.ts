import { Subject } from 'rxjs/internal/Subject';

export interface IHash {
  [key: string]: Subject<any>;
}
