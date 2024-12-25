import { Control, Controller, useFieldArray } from "react-hook-form";
import Input from "@/components/form/input";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { KadaButton } from "@/components/form/button";
import React, { Fragment } from "react";

interface ActivityFormProps {
    control: Control<any>;
}

const DetailField = ({ control, activityIndex, detailIndex, removeDetail }: any) => (
    <div className="mb-4">
        <Controller
            control={control}
            name={`activities[${activityIndex}].details[${detailIndex}].description`}
            render={({ field, fieldState: { error } }) => (
                <Input
                    label="Description"
                    {...field}
                    placeholder="e.g. Land clearing and preparation"
                    inputClassName="h-[30px]"
                    labelClassName="text-xs"
                    error={error?.message}
                />
            )}
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
            <Controller
                control={control}
                name={`activities[${activityIndex}].details[${detailIndex}].quantity`}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        label="Quantity"
                        type="number"
                        {...field}
                        placeholder="e.g. 10"
                        inputClassName="h-[30px]"
                        labelClassName="text-xs"
                        error={error?.message}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                )}
            />
            <Controller
                control={control}
                name={`activities[${activityIndex}].details[${detailIndex}].unit`}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        label="Unit"
                        {...field}
                        placeholder="e.g. kg"
                        inputClassName="h-[30px]"
                        labelClassName="text-xs"
                        error={error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name={`activities[${activityIndex}].details[${detailIndex}].unit_cost`}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        label="Unit Cost"
                        type="number"
                        {...field}
                        placeholder="e.g. 500"
                        inputClassName="h-[30px]"
                        labelClassName="text-xs"
                        error={error?.message}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                )}
            />
            <Controller
                control={control}
                name={`activities[${activityIndex}].details[${detailIndex}].total_cost`}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        label="Total Cost"
                        type="number"
                        {...field}
                        placeholder="e.g. 5000"
                        inputClassName="h-[30px]"
                        labelClassName="text-xs"
                        error={error?.message}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                )}
            />
        </div>
        <div className="text-end mt-2">
            <KadaButton
                type="button"
                variant="outline"
                className="rounded-full text-xs px-2 py-1 h-fit !border-red-500 !text-red-500"
                onClick={() => removeDetail(detailIndex)}
            >
                Remove Detail
            </KadaButton>
        </div>
    </div>
);

const ActivityField = ({ control, activityIndex, removeActivity }: any) => {
    const { fields: details, append: appendDetail, remove: removeDetail } = useFieldArray({
        control,
        name: `activities[${activityIndex}].details`,
    });

    return (
        <div className="mb-6 border-b pb-4">
            <Controller
                control={control}
                name={`activities[${activityIndex}].name`}
                render={({ field, fieldState: { error } }) => (
                    <Input
                        label="Activity Name"
                        {...field}
                        placeholder="e.g. Land Preparation"
                        inputClassName="h-[30px]"
                        labelClassName="text-xs"
                        error={error?.message}
                    />
                )}
            />

            <h5 className="text-sm mt-4">Details ({details.length})</h5>
            <div className="divide-y [&>div]:py-1">
                {details.map((detail, detailIndex) => (
                    <DetailField
                        key={detail.id + detailIndex + "detail"}
                        control={control}
                        activityIndex={activityIndex}
                        detailIndex={detailIndex}
                        removeDetail={removeDetail}
                    />
                ))}
            </div>

            <div className="text-end mt-4">
                <KadaButton
                    type="button"
                    className="rounded-full text-xs px-2 py-1 h-fit"
                    onClick={() => appendDetail({ description: "", quantity: 0, unit: "", unit_cost: 0, total_cost: 0 })}
                >
                    <PlusIcon className="w-4 h-4 fill-black" />
                    Add Detail
                </KadaButton>
            </div>

            <div className="text-center mt-4">
                <KadaButton
                    type="button"
                    variant="outline"
                    className="text-xs rounded-full px-2 py-1 h-fit !border-red-500 !text-red-500"
                    onClick={() => removeActivity(activityIndex)}
                >
                    Remove Activity
                </KadaButton>
            </div>
        </div>
    );
};

function ActivityForm({ control }: ActivityFormProps) {
    const { fields: activities, append: appendActivity, remove: removeActivity } = useFieldArray({
        control,
        name: "activities",
    });

    return (
        <Fragment>
            <div>
                <div>{activities.length > 0 && <h4>Activities ({activities.length})</h4>}</div>

                <div className="divide-y [&>div]:py-2">
                    {activities.map((activity, activityIndex) => (
                        <ActivityField
                            key={activity.id + activityIndex + "activity"}
                            control={control}
                            activityIndex={activityIndex}
                            removeActivity={removeActivity}
                        />
                    ))}
                </div>

                <div className="text-center mt-4">
                    <KadaButton
                        type="button"
                        className="rounded-full text-xs px-2 py-1 h-fit"
                        onClick={() =>
                            appendActivity({
                                name: "",
                                details: [],
                            })
                        }
                    >
                        <PlusIcon className="w-4 h-4 fill-black" />
                        Add Activity
                    </KadaButton>
                </div>
            </div>
        </Fragment>
    );
}

export default ActivityForm;
