import { TestBed } from '@angular/core/testing';

import { UserParserService } from './user-parser.service';

describe('UserParserService', () => {
  let service: UserParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
