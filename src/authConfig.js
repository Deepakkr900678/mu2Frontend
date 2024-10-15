/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  // auth: {
  //   clientId: "ece898df-e74b-400b-a6e7-f6d03467e7fc",
  //   authority:
  //     "https://login.microsoftonline.com/4d3fff20-85fb-49bd-8db1-f28a108b959b",
  //   // redirectUri: "https://mahindrauni2.el.r.appspot.com/form",
  //   redirectUri: "http://localhost:3000/form",
  // },

  // For Dev
  auth: {
    clientId: "ece898df-e74b-400b-a6e7-f6d03467e7fc",
    authority:
      "https://login.microsoftonline.com/4d3fff20-85fb-49bd-8db1-f28a108b959b",
    redirectUri: "/",
  },

  //For Prod
  // auth: {
  //   clientId: "89e591c8-ec2c-45c9-a2a5-b744c09c207a",
  //   authority:
  //     "https://login.microsoftonline.com/8bf89164-b311-40ca-a295-2e0f5f39d14e",
  //   redirectUri: "/",
  // },

  // cache: {
  //   cacheLocation: "sessionStorage", // This configures where your cache will be stored
  //   storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  // },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
// export const loginRequest = {
//   scopes: ["User.Read"],
// };

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "Enter_the_Graph_Endpoint_Herev1.0/me", //e.g. https://graph.microsoft.com/v1.0/me
};
