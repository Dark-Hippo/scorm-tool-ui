interface API {
  LMSInitialize: () => string;
  LMSFinish: () => void;
  LMSGetValue: () => void;
  LMSSetValue: () => void;
  LMSCommit: () => void;
  LMSGetLastError: () => void;
  LMSGetErrorString: () => void;
  LMSGetDiagnostic: () => void;
}

export type { API };
