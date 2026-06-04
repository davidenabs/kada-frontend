const fs = require('fs');
const path = require('path');

// 1. Update src/app/_api/client/endpoint.ts
const endpointsFile = path.join(__dirname, 'src/app/_api/client/endpoint.ts');
if (fs.existsSync(endpointsFile)) {
  let epContent = fs.readFileSync(endpointsFile, 'utf8');
  if (!epContent.includes('GET_COOPERATIVES_LIST')) {
    epContent = epContent.replace(
      'GET_COOPERATIVES:', 
      "GET_COOPERATIVES_LIST: '/cooperatives',\n  GET_COOPERATIVES:"
    );
    fs.writeFileSync(endpointsFile, epContent);
    console.log('Updated endpoints.ts');
  }
}

// 2. Update src/app/_api/client/user.ts
const userClientFile = path.join(__dirname, 'src/app/_api/client/user.ts');
if (fs.existsSync(userClientFile)) {
  let ucContent = fs.readFileSync(userClientFile, 'utf8');
  if (!ucContent.includes('getCooperativesList:')) {
    ucContent = ucContent.replace(
      'getCooperatives:',
      "getCooperativesList: (params: IParams): Promise<IResponse<any>> => ApiClient.get(API_ENDPOINTS.GET_COOPERATIVES_LIST, params),\n  getCooperatives:"
    );
    fs.writeFileSync(userClientFile, ucContent);
    console.log('Updated client/user.ts');
  }
}

// 3. Update src/app/_api/user.ts
const userHookFile = path.join(__dirname, 'src/app/_api/user.ts');
if (fs.existsSync(userHookFile)) {
  let hookContent = fs.readFileSync(userHookFile, 'utf8');
  if (!hookContent.includes('useGetCooperativesListQuery')) {
    const newHook = `
export const useGetCooperativesListQuery = ({
  params,
  enabled,
}: {
  params: any;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['cooperatives-list', params],
    queryFn: () => userClient.getCooperativesList(params),
    enabled,
  });
};
`;
    hookContent += newHook;
    fs.writeFileSync(userHookFile, hookContent);
    console.log('Updated user.ts');
  }
}
