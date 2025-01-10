import { KadaButton } from "@/components/form/button";
import DatePicker from "@/components/form/date-picker";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import { CloseIcon } from "@/icons";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Switch } from "rizzui";

interface SeasonFormProps {
  control: Control<any>;
  setValue: any;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DetailField = ({ control, index, detailIndex, removeDetail }: any) => (
  <div key={detailIndex + "detail field"}>
    <div className="grid grid-cols-2 gap-1">
      <Controller
        control={control}
        name={`seasons[${index}].stages[${index}].activities[${index}].details[${detailIndex}].description`}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Description"
            {...field}
            placeholder="e.g. NPK Fertilizer"
            inputClassName="h-[30px]"
            labelClassName="text-xs"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={`seasons[${index}].stages[${index}].activities[${index}].details[${detailIndex}].quantity`}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Quantity"
            {...field}
            placeholder="e.g. 5"
            inputClassName="h-[30px]"
            labelClassName="text-xs"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={`seasons[${index}].stages[${index}].activities[${index}].details[${detailIndex}].unit`}
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
        name={`seasons[${index}].stages[${index}].activities[${index}].details[${detailIndex}].unit_cost`}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Unit Cost"
            {...field}
            placeholder="e.g. 200"
            inputClassName="h-[30px]"
            labelClassName="text-xs"
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={`seasons[${index}].stages[${index}].activities[${index}].details[${detailIndex}].total_cost`}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Total Cost"
            {...field}
            placeholder="e.g. 1000"
            inputClassName="h-[30px]"
            labelClassName="text-xs"
            error={error?.message}
          />
        )}
      />

      <div className="text-center col-span-2">
        <KadaButton
          type="button"
          variant="outline"
          onClick={() => removeDetail(detailIndex)}
          className="text-xs rounded-full px-1 py-1 h-fit !border-red-500 !text-red-500"
          leftIcon={<CloseIcon className="w-2 h-2 mr-1 fill-red-500" />}
        >
          Remove Detail
        </KadaButton>
      </div>
    </div>
  </div>
);

const ActivityField = ({
  control,
  index,
  activityIndex,
  removeActivity,
}: any) => {
  const {
    fields: details,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: `seasons[${index}].stages[${index}].activities[${activityIndex}].details`,
  });

  const [phaseOption, setPhaseOption] = React.useState<any>(null);

  return (
    <>
      <div key={activityIndex + "activity field"}>
        <div className="grid grid-cols-2 gap-1">
          <Controller
            control={control}
            name={`seasons[${index}].stages[${activityIndex}].activities[${activityIndex}].name`}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Name"
                {...field}
                placeholder="e.g. Fertilizer Application"
                inputClassName="h-[30px]"
                labelClassName="text-xs"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`seasons[${index}].stages[${activityIndex}].activities[${activityIndex}].phase`}
            render={({
              field: { onChange, onBlur },
              fieldState: { error },
            }) => (
              <Select
                label="Phase"
                value={phaseOption}
                options={[
                  { label: "Start", value: "START" },
                  { label: "Mid", value: "MID" },
                  { label: "End", value: "END" },
                ]}
                selectClassName="h-[30px] rounded-full"
                labelClassName="text-xs"
                error={error?.message}
                onChange={(e: any) => {
                  setPhaseOption(e);
                  onChange(e.value);
                }}
                onBlur={onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name={`seasons[${index}].stages[${activityIndex}].activities[${activityIndex}].subtotal`}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Subtotal"
                {...field}
                placeholder="e.g. 10000"
                inputClassName="h-[30px]"
                labelClassName="text-xs"
                error={error?.message}
              />
            )}
          />

          <div className="col-span-2">
            <h5 className="text-sm">Details ({details.length})</h5>
            <div>
              <div className="grid grid-cols-1 gap-2">
                {details.map((detail, detailIndex) => (
                  <DetailField
                    key={detail.id + detailIndex + "detail field"}
                    control={control}
                    index={index}
                    detailIndex={detailIndex}
                    removeDetail={removeDetail}
                  />
                ))}
              </div>

              <div className="text-end">
                <KadaButton
                  className="rounded-full text-xs px-1 py-1 h-fit"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendDetail({
                      description: "",
                      quantity: "",
                      unit: "",
                      unit_cost: "",
                      total_cost: "",
                    })
                  }
                >
                  <PlusIcon className="w-4 h-4 fill-black" />
                  Add Detail
                </KadaButton>
              </div>
            </div>
            <Controller
              control={control}
              name={`seasons[${index}].stages[${activityIndex}].activities[${activityIndex}].details`}
              render={({ fieldState: { error } }) => (
                <p className="text-red-500 text-xs">{error?.message}</p>
              )}
            />
          </div>

          <div className="text-center col-span-2">
            <KadaButton
              type="button"
              variant="outline"
              onClick={() => removeActivity(activityIndex)}
              className="text-xs rounded-full px-1 py-1 h-fit !border-red-500 !text-red-500"
              leftIcon={<CloseIcon className="w-2 h-2 mr-1 fill-red-500" />}
            >
              Remove Activity
            </KadaButton>
          </div>
        </div>
      </div>
    </>
  );
};

const TaskField = ({ control, index, taskIndex, removeTask }: any) => (
  <Controller
    control={control}
    name={`seasons[${index}].stages[${index}].tasks[${taskIndex}].description`}
    render={({ field, fieldState: { error } }) => (
      <div className="flex items-center gap-1 w-full">
        <div className="flex-1">
          <Input
            {...field}
            placeholder="e.g. Ensure soil moisture is maintained"
            inputClassName="h-[30px]"
            className="flex-1"
            errorClassName="text-xs"
            error={error?.message}
          />
        </div>
        <button type="button" onClick={() => removeTask(taskIndex)}>
          <TrashIcon className="w-3 h-3 fill-red-500" />
        </button>
      </div>
    )}
  />
);

const StageField = ({ control, index, stageIndex, removeStage }: any) => {
  const {
    fields: activities,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: `seasons[${index}].stages[${stageIndex}].activities`,
  });

  const {
    fields: tasks,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `seasons[${index}].stages[${stageIndex}].tasks`,
  });

  const [option, setOption] = React.useState<any>(null);

  return (
    <div key={stageIndex + "stage field"}>
      <div className="grid grid-cols-2 gap-1">
        <Controller
          control={control}
          name={`seasons[${index}].stages[${stageIndex}].name`}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Name"
              {...field}
              placeholder="e.g. Land Preparation"
              inputClassName="h-[30px]"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].stages[${stageIndex}].start`}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Start"
              {...field}
              inputClassName="h-[30px]"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].stages[${stageIndex}].stop`}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Stop"
              {...field}
              inputClassName="h-[30px]"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].stages[${stageIndex}].duration_unit`}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <Select
              value={option}
              label="Duration Unit"
              options={[
                { label: "Days", value: "days" },
                { label: "Weeks", value: "weeks" },
                { label: "Months", value: "months" },
              ]}
              selectClassName="h-[30px] rounded-full"
              labelClassName="text-xs"
              error={error?.message}
              // onChange={(e: any) => onChange(e.value)}
              onChange={(e: any) => {
                setOption(e);
                onChange(e.value);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].stages[${stageIndex}].description`}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Description"
              {...field}
              placeholder="e.g. Prepare land for planting"
              inputClassName="h-[30px]"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <div className="col-span-2">
          <h5 className="text-sm">Tasks ({tasks.length})</h5>

          <div className="">
            <div className="grid grid-cols-2 gap-2">
              {tasks.map((task, taskIndex) => (
                <TaskField
                  key={task.id + taskIndex + "task field"}
                  control={control}
                  index={index}
                  taskIndex={taskIndex}
                  removeTask={removeTask}
                />
              ))}
            </div>

            <div className="text-end">
              <KadaButton
                className="rounded-full text-xs px-1 py-1 h-fit"
                type="button"
                variant="outline"
                onClick={() => appendTask({ description: "" })}
              >
                <PlusIcon className="w-4 h-4 fill-black" />
                Add Task
              </KadaButton>
            </div>
          </div>

          <Controller
            control={control}
            name={`seasons[${index}].stages[${stageIndex}].tasks`}
            render={({ fieldState: { error } }) => (
              <p className="text-red-500 text-xs">{error?.message}</p>
            )}
          />
        </div>

        <div className="col-span-2">
          <h5 className="text-sm">Activities ({activities.length})</h5>
          <div>
            <div className="grid grid-cols-1 gap-2">
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
                onClick={() =>
                  appendActivity({
                    description: "",
                  })
                }
              >
                <PlusIcon className="w-4 h-4 fill-black" />
                Add Activity
              </KadaButton>
            </div>
          </div>
          <Controller
            control={control}
            name={`seasons[${index}].stages[${stageIndex}].activities`}
            render={({ fieldState: { error } }) => (
              <p className="text-red-500 text-xs">{error?.message}</p>
            )}
          />
        </div>

        <div className="text-center col-span-2">
          <KadaButton
            type="button"
            variant="outline"
            onClick={() => removeStage(stageIndex)}
            className="text-xs rounded-full px-1 py-1 h-fit !border-red-500 !text-red-500"
            leftIcon={<CloseIcon className="w-2 h-2 mr-1 fill-red-500" />}
          >
            Remove Stage
          </KadaButton>
        </div>
      </div>
    </div>
  );
};

const SeasonField = ({
  control,
  setValue,
  season,
  index,
  removeSeason,
}: any) => {
  const {
    fields: stages,
    append: appendStage,
    remove: removeStage,
  } = useFieldArray({
    control,
    name: `seasons.${index}.stages`,
  });
  // const [option, setOption] = React.useState<any>(null);
  const [fromOption, setFromOption] = React.useState<any>(null);
  const [toOption, setToOption] = React.useState<any>(null);
  const [monthOptions, setMonthOptions] = React.useState<any>([]);

  React.useEffect(() => {
    setMonthOptions(
      months.map((month, i) => ({
        label: month,
        value: month,
      }))
    );
  }, []);

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
          name={`seasons[${index}].from`}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              label="From"
              value={fromOption}
              className={"border"}
              options={monthOptions}
              onChange={(e: any) => {
                setFromOption(e);
                onChange(e.value);
                setValue(
                  `seasons[${index}].period`,
                  `${e.value} - ${toOption?.value || ""}`
                );
              }}
              selectClassName="h-[30px] rounded-full"
              labelClassName="text-xs"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`seasons[${index}].to`}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <Select
              label="To"
              value={toOption}
              className={"border"}
              options={monthOptions}
              onChange={(e: any) => {
                setToOption(e);
                onChange(e.value);
                setValue(
                  `seasons[${index}].period`,
                  `${fromOption?.value || ""} - ${e.value}`
                );
              }}
              selectClassName="h-[30px] rounded-full"
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

        {/* stages */}
        <div className="col-span-2">
          <h5 className="text-sm">Stages ({stages.length})</h5>
          <div>
            <div className="grid grid-cols-1 gap-2">
              {stages.map((stage, stageIndex) => (
                <StageField
                  key={stage.id + stageIndex + "stage field"}
                  control={control}
                  index={index}
                  stageIndex={stageIndex}
                  removeStage={removeStage}
                />
              ))}
            </div>

            <div className="text-end">
              <KadaButton
                className="rounded-full text-xs px-1 py-1 h-fit"
                type="button"
                variant="outline"
                onClick={() =>
                  appendStage({
                    name: "",
                    // duration: "",
                    start: "",
                    stop: "",
                    duration_unit: "",
                    description: "",
                    tasks: [],
                    activities: [],
                  })
                }
              >
                <PlusIcon className="w-4 h-4 fill-black" />
                Add Stage
              </KadaButton>
            </div>
          </div>
          <Controller
            control={control}
            name={`seasons[${index}].stages`}
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

function SeasonForm({ control, setValue }: SeasonFormProps) {
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
              setValue={setValue}
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
