export const clientScope = "openid profile ProductivityTools.Meetings.API";

export type Config = {
  pathBase: string;
};

const dev = {
  //clientId:"devmeetingsweb",
  pathBase: "http://localhost:5002/api/",
  //stsAuthority : 'https://identityserver.productivitytools.top:8010/',
  //clientRoot : 'http://localhost:3000/',
};

const prod = {
  //clientId:"prodmeetingsweb",
  pathBase: "https://meetings.productivitytools.top:8020/api/",
  //stsAuthority : 'https://identityserver.productivitytools.top:8010/',
  //clientRoot : 'https://meetingsweb.z13.web.core.windows.net/',
};

export const config: Config = process.env.NODE_ENV === "development" ? dev : prod;
