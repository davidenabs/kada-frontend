const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/app/_api/user.ts');
let content = fs.readFileSync(file, 'utf8');

const hooks = `
export const useExportDataMutation = () => {
  return useMutation({
    mutationFn: (data: { exportType: string; filters?: any; fields: string[] }) =>
      api.post('/users/export', data),
  });
};

export const useGetExportJobQuery = ({
  params,
  enabled,
}: {
  params: { jobId: string };
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['exportJob', params.jobId],
    queryFn: () => api.get(\`/users/export/job/\${params.jobId}\`),
    enabled,
    refetchInterval: (query: any) => {
      // Poll every 3 seconds if status is PENDING or PROCESSING
      const status = query?.state?.data?.data?.status;
      if (status === 'PENDING' || status === 'PROCESSING') {
        return 3000;
      }
      return false;
    },
  });
};
`;

fs.writeFileSync(file, content + '\n' + hooks);
console.log('Appended successfully');
