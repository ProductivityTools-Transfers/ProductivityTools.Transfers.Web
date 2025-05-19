export const clientScope = "openid profile ProductivityTools.Meetings.API";

export type Config = {
  pathBase: string;
};

const dev = {
  //clientId:"devmeetingsweb",
  pathBase: "https://localhost:7250",
  //stsAuthority : 'https://identityserver.productivitytools.top:8010/',
  //clientRoot : 'http://localhost:3000/',
};

const prod = {
  //clientId:"prodmeetingsweb",
  pathBase: "https://transfers-api.productivitytools.top",
  //stsAuthority : 'https://identityserver.productivitytools.top:8010/',
  //clientRoot : 'https://meetingsweb.z13.web.core.windows.net/',
};

export const config: Config = process.env.NODE_ENV === "development" ? prod : prod;
//export const config: Config = process.env.NODE_ENV === "development" ? dev: prod;
