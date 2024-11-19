import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Switch } from "rizzui";

interface SeasonFormProps {
  control: Control<any>;
}

const ActivityField = ({
  control,
  index,
  activityIndex,
  removeActivity,
}: any) => (
  <Controller
    control={control}
    name={`seasons[${index}].activities[${activityIndex}].description`}
    render={({ field, fieldState: { error } }) => (
      <div className="flex items-center gap-1 w-full">
        <div className="flex-1">
          <Input
            {...field}
            placeholder="e.g. Soil preparation and fertilization at the start of the season"
            inputClassName="h-[30px]"
            className="flex-1"
            errorClassName="text-xs"
            error={error?.message}
          />
        </div>
        <button type="button" onClick={() => removeActivity(activityIndex)}>
          <TrashIcon className="w-3 h-3 fill-red-500" />
        </button>
      </div>
    )}
  />
);

const SeasonField = ({ control, season, index, removeSeason }: any) => {
  const {
    fields: activities,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: `seasons.${index}.activities`,
  });

  return (
    <div key={season.id + index + "season field"}>
      <div className="grid grid-cols-2 gap-1">
        <Controller
          control={control}
          name={`seasons[${index}].name`}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Name"
              {...field}
              placeholder="e.g. Rainy Season"
              inputClassName="h-[30px]"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].period`}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Period"
              {...field}
              placeholder="e.g. March - July"
              inputClassName="h-[30px]"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].isRecommended`}
          render={({ field, fieldState: { error } }) => (
            <Switch
              label="Recommended"
              {...field}
              checked={field.value}
              onChange={field.onChange}
              size="sm"
              error={error?.message}
            />
          )}
        />

        <div className="col-span-2">
          <h5 className="text-sm">Activities ({activities.length})</h5>
          <div>
            <div className="grid grid-cols-2 gap-2">
              {activities.map((activity, activityIndex) => (
                <ActivityField
                  key={activity.id + activityIndex + "activity field"}
                  control={control}
                  index={index}
                  activityIndex={activityIndex}
                  removeActivity={removeActivity}
                />
              ))}
            </div>

            <div className="text-end">
              <KadaButton
                className="rounded-full text-xs px-1 py-1 h-fit"
                type="button"
                variant="outline"
                onClick={() => appendActivity({ description: "" })}
              >
                <PlusIcon className="w-4 h-4 fill-black" />
                Add Activity
              </KadaButton>
            </div>
          </div>
          <Controller
            control={control}
            name={`seasons[${index}].activities`}
            render={({ fieldState: { error } }) => (
              <p className="text-red-500 text-xs">{error?.message}</p>
            )}
          />
        </div>

        <div className="text-center col-span-2">
          <KadaButton
            type="button"
            variant="outline"
            onClick={() => removeSeason(index)}
            className="text-xs rounded-full px-1 py-1 h-fit !border-red-500 !text-red-500"
            leftIcon={<CloseIcon className="w-2 h-2 mr-1 fill-red-500" />}
          >
            Remove Season
          </KadaButton>
        </div>
      </div>
    </div>
  );
};

function SeasonForm({ control }: SeasonFormProps) {
  const {
    fields: seasons,
    append: appendSeason,
    remove: removeSeason,
  } = useFieldArray({
    control,
    name: "seasons",
  });

  return (
    <Fragment>
      <div>
        <Controller
          control={control}
          name="seasons"
          render={({ fieldState: { error } }) => (
            <p className="text-red-500 text-xs">{error?.message}</p>
          )}
        />

        <div>{seasons.length > 0 && <h4>Seasons ({seasons.length})</h4>}</div>

        <div className="divide-y [&>div]:py-1">
          {seasons.map((season, index) => (
            <SeasonField
              key={season.id + index + "season field"}
              control={control}
              season={season}
              index={index}
              removeSeason={removeSeason}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default SeasonForm;
