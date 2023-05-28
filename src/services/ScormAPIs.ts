import type { API_SCORM_1_2, API_SCORM_2004 } from '../types/ScormAPIs';

export const ScormAPI_1_2: API_SCORM_1_2 = {
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

export const ScormAPI_2004: API_SCORM_2004 = {
  Initialize: function (): () => void {
    throw new Error('Function not implemented.');
  },
  Terminate: function (): () => void {
    throw new Error('Function not implemented.');
  },
  GetValue: function (): () => void {
    throw new Error('Function not implemented.');
  },
  SetValue: function (): () => void {
    throw new Error('Function not implemented.');
  },
  Commit: function (): () => void {
    throw new Error('Function not implemented.');
  },
  GetLastError: function (): () => void {
    throw new Error('Function not implemented.');
  },
  GetErrorString: function (): () => void {
    throw new Error('Function not implemented.');
  },
  GetDiagnostic: function (): () => void {
    throw new Error('Function not implemented.');
  },
  CommitData: function (): () => void {
    throw new Error('Function not implemented.');
  },
};
