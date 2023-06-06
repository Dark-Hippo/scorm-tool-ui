import type { API_SCORM_1_2, API_SCORM_2004 } from '../types/ScormAPIs';

export const ScormAPI_1_2: API_SCORM_1_2 = {
  LMSInitialize: function (): string {
    console.log('In initialise');
    return 'true';
  },
  LMSFinish: function (): void {
    console.log('In LMSFinish');
  },
  LMSGetValue: function (): void {
    console.log('In LMSGetValue');
  },
  LMSSetValue: function (): void {
    console.log('In LMSSetValue');
  },
  LMSCommit: function (): void {
    console.log('In LMSCommit');
  },
  LMSGetLastError: function (): void {
    console.log('In LMSGetLastError');
  },
  LMSGetErrorString: function (): void {
    console.log('In LMSGetErrorString');
  },
  LMSGetDiagnostic: function (): void {
    console.log('In LMSGetDiagnostic');
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
