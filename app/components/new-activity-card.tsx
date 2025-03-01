"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewActivityCardProps {
  onActivityCreated: (content: string) => void;
}

export function NewActivityCard({ onActivityCreated }: NewActivityCardProps) {
  const [content, setContent] = useState("");

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleSaveActivity(event: FormEvent) {
    event.preventDefault();

    if (content !== "") {
      onActivityCreated(content);

      setContent("");
      toast.success("Atividade criada com sucesso!");
    } else {
      toast.error("Atividade vazia, por favor preencha o campo");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col text-left rounded-md bg-sigaa3 p-5 gap-3 overflow-hidden hover:ring-2 hover:ring-black focus-visible:ring-2 focus-visible:ring-sigaab outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar atividade
        </span>
        <p className="text-sm leading-6 text-slate-400">Grave uma atividade</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Title className="hidden">Nova Atividade</Dialog.Title>
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <IoClose className="size-5" />
          </Dialog.Close>
          <form className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5 ">
              <span className="mt-3 text-sm font-medium text-slate-300">
                Adicionar atividade
              </span>
              <>
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent    resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              </>
            </div>
            <button
              type="button"
              className="w-full bg-sigaa1 py-4 text-center text-sm text-sigaab outline-none font-medium hover:bg-emerald-100 hover:cursor-pointer"
              onClick={handleSaveActivity}
            >
              Salvar atividade
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
