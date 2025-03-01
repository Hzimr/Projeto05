"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { ChangeEvent, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivityCardProps {
  activity: {
    id: string;
    date: Date;
    activity: string;
    responsible: string;
    description: string;
  };
  onActivityDelete: (id: string) => void;
  onActivityEdit: (
    id: string,
    updatedActivity: string,
    updatedResponsible: string,
    updatedDescription: string
  ) => void;
}

export function ActivityCard({
  activity,
  onActivityDelete,
  onActivityEdit,
}: ActivityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedActivity, setUpdatedActivity] = useState(activity.activity);
  const [updatedResponsible, setUpdatedResponsible] = useState(
    activity.responsible
  );
  const [updatedDescription, setUpdatedDescription] = useState(
    activity.description
  );

  function handleEditSubmit() {
    onActivityEdit(
      activity.id,
      updatedActivity,
      updatedResponsible,
      updatedDescription
    );
    setIsEditing(false);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col text-left rounded-md bg-sigaa2 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-sigaab outline-none">
        <span className="text-sm font-medium text-black">
          {formatDistanceToNow(activity.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-800">{activity.activity}</p>
        <p className="text-sm text-slate-700">
          Responsável: {activity.responsible}
        </p>
        <p className="text-sm text-slate-600">
          Descrição: {activity.description}
        </p>
        <p className="text-sm text-slate-600">
          Data: {format(activity.date, "dd/MM/yyyy")}
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Title className="hidden">Atividade</Dialog.Title>
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <IoClose className="size-5" />
          </Dialog.Close>

          {isEditing ? (
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Editar atividade
              </span>
              <input
                type="text"
                value={updatedActivity}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdatedActivity(e.target.value)
                }
                className="bg-transparent text-sm text-slate-300 outline-none border-b border-slate-500"
                placeholder="Atividade"
              />
              <input
                type="text"
                value={updatedResponsible}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdatedResponsible(e.target.value)
                }
                className="bg-transparent text-sm text-slate-300 outline-none border-b border-slate-500"
                placeholder="Responsável"
              />
              <textarea
                value={updatedDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setUpdatedDescription(e.target.value)
                }
                className="bg-transparent text-sm text-slate-300 outline-none border-b border-slate-500 resize-none"
                placeholder="Descrição"
              />
              <button
                onClick={handleEditSubmit}
                className="bg-sigaa2 py-2 px-4 text-white font-medium rounded-md hover:bg-sigaa1/90"
              >
                Salvar Edição
              </button>
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                {formatDistanceToNow(activity.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
              <p className="text-sm leading-6 text-slate-400">
                {activity.activity}
              </p>
              <p className="text-sm text-slate-400">
                Responsável: {activity.responsible}
              </p>
              <p className="text-sm text-slate-400">
                Descrição: {activity.description}
              </p>
              <p className="text-sm text-slate-400">
                Data: {format(activity.date, "dd/MM/yyyy")}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
              >
                Editar Atividade
              </button>
            </div>
          )}

          <button
            type="button"
            className="group w-full bg-red-500 hover:bg-red-100/80 hover:cursor-pointer hover:text-black py-4 text-center text-sm text-slate-300 outline-none font-medium"
            onClick={() => onActivityDelete(activity.id)}
          >
            Deseja{" "}
            <span className="text-black group-hover:text-red-700 group-hover:underline">
              apagar essa atividade
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
