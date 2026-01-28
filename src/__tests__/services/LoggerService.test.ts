import { QPA11YLoggerService } from '../../services/LoggerService';

describe('QPA11YLoggerService', () => {
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
    QPA11YLoggerService.info('test info');
    expect(logSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ℹ️ test info');
  });

  it('should log info messages with args', () => {
    const data = { foo: 'bar' };
    QPA11YLoggerService.info('test info', data);
    expect(logSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ℹ️ test info', data);
  });

  it('should log warnings with the correct tag', () => {
    QPA11YLoggerService.warn('test warning');
    expect(warnSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ⚠️ test warning');
  });

  it('should log warnings with args', () => {
    const data = { alert: true };
    QPA11YLoggerService.warn('test warning', data);
    expect(warnSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ⚠️ test warning', data);
  });

  it('should log errors with the correct tag', () => {
    QPA11YLoggerService.error('test error');
    expect(errorSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ❌ test error');
  });

  it('should log errors with args', () => {
    const err = new Error('boom');
    QPA11YLoggerService.error('test error', err);
    expect(errorSpy).toHaveBeenCalledWith('[QPMTX-A11Y] ❌ test error', err);
  });
});
