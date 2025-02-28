"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivityCardProps {
  activity: {
    id: string;
    date: Date;
    content: string;
  };
  onActivityDelete: (id: string) => void;
}

export function ActivityCard({
  activity,
  onActivityDelete,
}: ActivityCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col text-left rounded-md bg-sigaa2 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none ">
        <span className="text-sm font-medium text-black">
          {formatDistanceToNow(activity.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="text-sm leading-6 text-slate-800">{activity.content}</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Title className="hidden">Atividade</Dialog.Title>
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <IoClose className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5 ">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(activity.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">
              {activity.content}
            </p>
          </div>
          <button
            type="button"
            className="group w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium"
            onClick={() => onActivityDelete(activity.id)}
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline">
              apagar essa atividade
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
