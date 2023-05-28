interface API_SCORM_1_2 {
  LMSInitialize: () => string;
  LMSFinish: () => void;
  LMSGetValue: () => void;
  LMSSetValue: () => void;
  LMSCommit: () => void;
  LMSGetLastError: () => void;
  LMSGetErrorString: () => void;
  LMSGetDiagnostic: () => void;
}

interface API_SCORM_2004 {
  Initialize(): () => void;
  Terminate(): () => void;
  GetValue(): () => void;
  SetValue(): () => void;
  Commit(): () => void;
  GetLastError(): () => void;
  GetErrorString(): () => void;
  GetDiagnostic(): () => void;
  CommitData(): () => void;
}

export type { API_SCORM_1_2, API_SCORM_2004 };
