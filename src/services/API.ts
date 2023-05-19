import { API } from '../types/API';

export const ScormAPI: API = {
  LMSInitialize: function (): string {
    console.log('In initialise');
    return 'true';
  },
  LMSFinish: function (): void {
    throw new Error('Function not implemented.');
  },
  LMSGetValue: function (): void {
    throw new Error('Function not implemented.');
  },
  LMSSetValue: function (): void {
    throw new Error('Function not implemented.');
  },
  LMSCommit: function (): void {
    throw new Error('Function not implemented.');
  },
  LMSGetLastError: function (): void {
    throw new Error('Function not implemented.');
  },
  LMSGetErrorString: function (): void {
    throw new Error('Function not implemented.');
  },
  LMSGetDiagnostic: function (): void {
    throw new Error('Function not implemented.');
  },
};
