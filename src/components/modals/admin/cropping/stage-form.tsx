import { KadaButton } from "@/components/form/button";
import Input from "@/components/form/input";
import { CloseIcon } from "@/icons";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { Fragment } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";

interface StageFormProps {
  control: Control<any>;
}

const TaskField = ({ control, index, taskIndex, removeTask }: any) => (
  <Controller
    control={control}
    name={`stages[${index}].tasks[${taskIndex}].description`}
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

const StageField = ({ control, index, stage, removeStage }: any) => {
  const {
    fields: tasks,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `stages.${index}.tasks`,
  });
  return (
    <Fragment>
      <div key={stage.id + index + "stage field"}>
        <div className="grid grid-cols-2 gap-1">
          <Controller
            control={control}
            name={`stages[${index}].name`}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Name"
                {...field}
                placeholder="e.g. Seedling"
                inputClassName="h-[30px]"
                labelClassName="text-xs"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`stages[${index}].duration`}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Duration"
                {...field}
                placeholder="e.g. 0-2 weeks"
                inputClassName="h-[30px]"
                labelClassName="text-xs"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name={`stages[${index}].description`}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Description"
                {...field}
                placeholder="e.g. Seedlings are planted"
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
              name={`stages[${index}].tasks`}
              render={({ fieldState: { error } }) => (
                <p className="text-red-500 text-xs">{error?.message}</p>
              )}
            />
          </div>

          <div className="text-center col-span-2">
            <KadaButton
              type="button"
              variant="outline"
              onClick={() => removeStage(index)}
              className="text-xs rounded-full px-1 py-1 h-fit !border-red-500 !text-red-500"
              leftIcon={<CloseIcon className="w-2 h-2 mr-1 fill-red-500" />}
            >
              Remove Stage
            </KadaButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

function StageForm({ control }: StageFormProps) {
  const {
    fields: stages,
    append: appendStage,
    remove: removeStage,
  } = useFieldArray({
    control,
    name: "stages",
  });
  return (
    <Fragment>
      <div className="">
        <Controller
          control={control}
          name="stages"
          render={({ fieldState: { error } }) => (
            <p className="text-red-500 text-xs">{error?.message}</p>
          )}
        />

        <div>{stages.length > 0 && <h4>Stages ({stages.length})</h4>}</div>

        <div className="divide-y [&>div]:py-1">
          {stages.map((stage, index) => (
            <StageField
              key={stage.id + index + "stage field"}
              control={control}
              stage={stage}
              index={index}
              removeStage={removeStage}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default StageForm;
