import React, { useState } from 'react';
import { Dropdown } from 'rizzui';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import ViewUserDrawer from '@/components/drawers/admin/view-user-drawer';
import EditUserDrawer from '@/components/drawers/admin/edit-user-drawer';
import { useDeleteUserMutation } from '@/app/_api/user';
import { toast } from 'sonner';

interface UserActionsProps {
  user: any;
  onRefresh: () => void;
}

export function UserActions({ user, onRefresh }: UserActionsProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const handleDelete = () => {
    deleteUser(user.id, {
      onSuccess: () => {
        toast.success("User deleted successfully.");
        setIsDeleteOpen(false);
        onRefresh();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to delete user.");
      }
    });
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <Dropdown.Trigger>
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer inline-block">
            <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-40 bg-white shadow-lg border">
          <Dropdown.Item onClick={() => setIsViewOpen(true)}>
            View Details
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setIsEditOpen(true)}>
            Edit User
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setIsDeleteOpen(true)} className="text-red-600">
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* View Details Drawer */}
      <ViewUserDrawer
        open={isViewOpen}
        close={() => setIsViewOpen(false)}
        userId={user.id}
      />

      {/* Edit User Drawer */}
      <EditUserDrawer
        open={isEditOpen}
        close={() => setIsEditOpen(false)}
        userId={user.id}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-lg font-bold mb-2">Delete User?</h2>
            <p className="text-sm text-gray-500 mb-6">
              This will permanently delete this user, including their profile, farm records, and program applications across all systems. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
