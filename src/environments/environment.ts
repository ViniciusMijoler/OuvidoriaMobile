// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const LOCAL_IP = 'localhost';
const PORT_NUMBER = '8081';

export const environment = {
  production: false,
  APIurl: `http://${LOCAL_IP}:${PORT_NUMBER}/api/v1/`
};
