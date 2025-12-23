import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectRouteGuard } from './protect-route.guard';

describe('protectRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protectRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
