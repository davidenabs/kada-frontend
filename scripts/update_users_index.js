const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/components/shared/admin/users/index.tsx');
let content = fs.readFileSync(file, 'utf8');

// Add the import if not present
if (!content.includes('useGetCooperativesListQuery')) {
  content = content.replace(
    'import { useGetUsersQuery } from "@/app/_api/user";',
    'import { useGetUsersQuery, useGetCooperativesListQuery } from "@/app/_api/user";'
  );
}

// Replace the hook usage
const hookRegex = /const \{ data, isFetching, isLoading, isError, refetch \} = useGetUsersQuery\(\{[\s\S]*?\}\);/;
const newHooks = `
  const { data, isFetching, isLoading, isError, refetch } = useGetUsersQuery({
    enabled: loaded && activeTab !== "Cooperative",
    params: {
      search: debouncedSearchQuery,
      userType,
      page,
      limit,
    },
  });

  const { data: coopData, isFetching: coopFetching, isLoading: coopLoading, isError: coopError, refetch: coopRefetch } = useGetCooperativesListQuery({
    enabled: loaded && activeTab === "Cooperative",
    params: {
      search: debouncedSearchQuery,
      page,
      limit,
    },
  });

  const currentIsFetching = activeTab === "Cooperative" ? coopFetching : isFetching;
  const currentIsLoading = activeTab === "Cooperative" ? coopLoading : isLoading;
  const currentIsError = activeTab === "Cooperative" ? coopError : isError;
  const currentRefetch = activeTab === "Cooperative" ? coopRefetch : refetch;
  
  // Use data?.data for stats
  const activeDataForStats = data;
`;

content = content.replace(hookRegex, newHooks);

// Fix the stats useEffect to use activeDataForStats instead of data
content = content.replace(
  'if (data?.data && data.success && !isFetching) {',
  'if (activeDataForStats?.data && activeDataForStats.success && !isFetching) {'
);
content = content.replace(
  'const stats = (data.data as unknown as any).stats;',
  'const stats = (activeDataForStats.data as unknown as any).stats;'
);
content = content.replace(
  '}, [data, isFetching]);',
  '}, [activeDataForStats, isFetching]);'
);

// Fix table rendering
const tableRegex = /data=\{data\?\.data\?\.users \|\| \[\]\}/;
content = content.replace(
  tableRegex,
  'data={(activeTab === "Cooperative" ? coopData?.data?.data : data?.data?.users) || []}'
);

const totalItemsRegex = /totalItems=\{data\?\.data\?\.total \|\| 0\}/;
content = content.replace(
  totalItemsRegex,
  'totalItems={(activeTab === "Cooperative" ? coopData?.data?.meta?.total : data?.data?.total) || 0}'
);

content = content.replace(/\{isFetching \?/g, '{currentIsFetching ?');
content = content.replace(/\{isLoading \?/g, '{currentIsLoading ?');
content = content.replace(/isError \?/g, 'currentIsError ?');
content = content.replace(/onRefresh=\{\(\) => refetch\(\)\}/g, 'onRefresh={() => currentRefetch()}');

fs.writeFileSync(file, content);
console.log('Updated user index.tsx to split queries');
