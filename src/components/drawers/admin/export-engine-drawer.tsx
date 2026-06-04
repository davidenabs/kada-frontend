import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Text, Progressbar, ActionIcon, Title, Badge, Input } from 'rizzui';
import Select from '@/components/form/select';
import { XMarkIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useExportDataMutation, useGetExportJobQuery } from '@/app/_api/user';
import { toast } from 'sonner';

interface ExportEngineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPORT_TYPES = [
  { label: 'Farmers', value: 'FARMER' },
  { label: 'Cooperatives', value: 'COOPERATIVE' },
];

const FARMER_FIELDS = [
  'First Name', 'Last Name', 'NIN', 'Phone Number', 'Email', 'Public ID', 
  'Ward', 'LGA', 'Community', 'Farm Crops', 'Marital Status', 'Bank Name', 
  'Account Number', 'Gender'
];

const COOPERATIVE_FIELDS = [
  'First Name', 'Last Name', 'Phone Number', 'Email', 'Gender',
  'Cooperative Name', 'Public ID', 'Total Farmers', 'Bank Name', 'Account Number'
];

export default function ExportEngineDrawer({ isOpen, onClose }: ExportEngineDrawerProps) {
  const [exportType, setExportType] = useState('FARMER');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    lga: '',
    ward: '',
    hasCooperative: 'ALL',
    dateStart: '',
    dateEnd: ''
  });

  const { mutate: initiateExport, isPending } = useExportDataMutation();
  const { data: jobData } = useGetExportJobQuery({
    params: { jobId: jobId as string },
    enabled: !!jobId,
  });

  const job = (jobData as any)?.data;

  // Reset state when drawer opens/closes
  useEffect(() => {
    if (!isOpen) {
      setJobId(null);
    } else {
      setSelectedFields(exportType === 'FARMER' ? FARMER_FIELDS : COOPERATIVE_FIELDS);
    }
  }, [isOpen, exportType]);

  const handleFieldToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleSelectAll = () => {
    const fields = exportType === 'FARMER' ? FARMER_FIELDS : COOPERATIVE_FIELDS;
    if (selectedFields.length === fields.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(fields);
    }
  };

  const handleExport = () => {
    if (selectedFields.length === 0) {
      toast.error('Please select at least one field to export');
      return;
    }

    initiateExport(
      { exportType, fields: selectedFields, filters },
      {
        onSuccess: (res: any) => {
          toast.success('Export started!');
          setJobId(res?.data?.id);
        },
        onError: (err: any) => {
          const errMsg = err?.response?.data?.message;
          const activeJobId = err?.response?.data?.error?.activeJobId || err?.response?.data?.data?.activeJobId;
          
          if (activeJobId) {
            toast.error('An export is already running. Reattaching to it...');
            setJobId(activeJobId);
          } else {
            toast.error(errMsg || 'Failed to start export');
          }
        },
      }
    );
  };

  const progress = job?.totalRecords ? Math.round((job.processedRecords / job.totalRecords) * 100) : 0;
  const isComplete = job?.status === 'COMPLETED';
  const isFailed = job?.status === 'FAILED';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full flex flex-col animate-slide-in-right shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <Title as="h5">Data Export Engine</Title>
          <ActionIcon variant="text" onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </ActionIcon>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          
          {jobId && (
            <div className="bg-gray-50 border p-5 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <Text className="font-semibold text-gray-800">Export Progress</Text>
                <Badge color={isComplete ? 'success' : isFailed ? 'danger' : 'warning'}>
                  {job?.status || 'INITIALIZING'}
                </Badge>
              </div>
              
              <Progressbar value={progress} color="primary" />
              
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>{job?.processedRecords || 0} / {job?.totalRecords || 0} Records</span>
                <span>{progress}%</span>
              </div>

              {isFailed && (
                <Text className="text-sm text-red-500 mt-2">Error: {job?.errorMessage}</Text>
              )}

              {isComplete && job?.fileUrl && (
                <a href={job.fileUrl} target="_blank" rel="noopener noreferrer" className="block mt-4">
                  <Button size="lg" className="w-full gap-2">
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    Download CSV
                  </Button>
                </a>
              )}
            </div>
          )}

          <div className={`space-y-6 ${jobId && !isFailed ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <Text className="mb-2 font-medium">Export Type</Text>
              <Select
                options={EXPORT_TYPES}
                value={EXPORT_TYPES.find(o => o.value === exportType) || null}
                onChange={(v: any) => {
                  setExportType(v?.value);
                  setJobId(null);
                }}
                getOptionValue={(option: any) => option.value}
                displayValue={(selected: any) => selected?.label || ''}
                getOptionDisplayValue={(option: any) => option.label}
              />
            </div>

            {/* Advanced Filters */}
            <div className="space-y-4 bg-white p-4 border rounded-xl shadow-sm">
              <Text className="font-medium border-b pb-2">Advanced Filters</Text>
              
              <Input
                label="Search Keywords"
                placeholder="Name, NIN, Phone..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="LGA"
                  placeholder="E.g. Kaduna North"
                  value={filters.lga}
                  onChange={(e) => setFilters({ ...filters, lga: e.target.value })}
                />
                <Input
                  label="Ward"
                  placeholder="E.g. Kawo"
                  value={filters.ward}
                  onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                />
              </div>

              {exportType === 'FARMER' && (
                <div>
                  <Text className="mb-2 text-sm font-medium">Has Cooperative?</Text>
                  
                  <Select
                    options={[
                      { label: 'All Farmers', value: 'ALL' },
                      { label: 'Yes, in a Cooperative', value: 'YES' },
                      { label: 'No, Independent', value: 'NO' },
                    ]}
                    value={[
                      { label: 'All Farmers', value: 'ALL' },
                      { label: 'Yes, in a Cooperative', value: 'YES' },
                      { label: 'No, Independent', value: 'NO' },
                    ].find(o => o.value === filters.hasCooperative) || null}
                    onChange={(v: any) => setFilters({ ...filters, hasCooperative: v?.value })}
                    getOptionValue={(option: any) => option.value}
                    displayValue={(selected: any) => selected?.label || ''}
                    getOptionDisplayValue={(option: any) => option.label}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Date Added (Start)"
                  value={filters.dateStart}
                  onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
                />
                <Input
                  type="date"
                  label="Date Added (End)"
                  value={filters.dateEnd}
                  onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Text className="font-medium">Select Fields</Text>
                <Button variant="text" size="sm" onClick={handleSelectAll}>
                  Toggle All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border">
                {(exportType === 'FARMER' ? FARMER_FIELDS : COOPERATIVE_FIELDS).map((field) => (
                  <Checkbox
                    key={field}
                    label={field}
                    checked={selectedFields.includes(field)}
                    onChange={() => handleFieldToggle(field)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isPending || Boolean(jobId && !isComplete && !isFailed)}>
            Cancel
          </Button>
          {!jobId || isFailed ? (
             <Button onClick={handleExport} isLoading={isPending} disabled={selectedFields.length === 0}>
               Generate Export
             </Button>
          ) : (
            <Button onClick={onClose} variant="solid" color="primary">
               Close Drawer
             </Button>
          )}
        </div>
      </div>
    </div>
  );
}
