import { TestBed } from '@angular/core/testing';

import { ConfigHttpParamsService } from './config-http-params.service';

describe('ConfigHttpParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigHttpParamsService = TestBed.get(ConfigHttpParamsService);
    expect(service).toBeTruthy();
  });
});
