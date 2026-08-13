export const SARVAM_CONFIG = {
  orgId: "019fe198-c0a5-707c-884d-be8d46ea2813",
  workspaceId: "019fe198-c0a8-7f1e-a61d-f0126a4259f2",
  appId: "deWork-Labs-849b2bc4-7cc5",
  version: 1,
  inputSampleRate: 16000 as const,
  outputSampleRate: 16000 as const,
  agentVariables: {
    call_summary: "",
    caller_name: "",
    caller_phone_number: "",
    handler_name: "Riya",
  },
  /** Browser SDK baseUrl — proxied so the real API key never ships to the client. */
  proxyBaseUrl: "/api/sarvam/",
} as const;
