import { LoggerService } from '../../services/LoggerService';

describe('LoggerService', () => {
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log info messages with the correct tag', () => {
    LoggerService.info('test info');
    expect(logSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ℹ️ test info');
  });

  it('should log info messages with args', () => {
    const data = { foo: 'bar' };
    LoggerService.info('test info', data);
    expect(logSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ℹ️ test info', data);
  });

  it('should log warnings with the correct tag', () => {
    LoggerService.warn('test warning');
    expect(warnSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ⚠️ test warning');
  });

  it('should log warnings with args', () => {
    const data = { alert: true };
    LoggerService.warn('test warning', data);
    expect(warnSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ⚠️ test warning', data);
  });

  it('should log errors with the correct tag', () => {
    LoggerService.error('test error');
    expect(errorSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ❌ test error');
  });

  it('should log errors with args', () => {
    const err = new Error('boom');
    LoggerService.error('test error', err);
    expect(errorSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ❌ test error', err);
  });
});
