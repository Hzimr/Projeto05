"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Validação com Zod
const activitySchema = z.object({
  activity: z.string().min(1, "Atividade é obrigatória."),
  responsible: z.string().min(1, "Responsável é obrigatório."),
  date: z.string().min(1, "Data é obrigatória."),
  description: z.string().min(1, "Descrição é obrigatória."),
});

interface NewActivityCardProps {
  onActivityCreated: (
    activity: string,
    responsible: string,
    date: string,
    description: string
  ) => void;
}

export function NewActivityCard({ onActivityCreated }: NewActivityCardProps) {
  const [activity, setActivity] = useState("");
  const [responsible, setResponsible] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    switch (name) {
      case "activity":
        setActivity(value);
        break;
      case "responsible":
        setResponsible(value);
        break;
      case "date":
        setDate(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  }

  function handleSaveActivity(event: FormEvent) {
    event.preventDefault();

    const result = activitySchema.safeParse({
      activity,
      responsible,
      date,
      description,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Por favor, corrija os erros.");
      return;
    }

    setErrors({});

    onActivityCreated(activity, responsible, date, description);

    setActivity("");
    setResponsible("");
    setDate("");
    setDescription("");
    toast.success("Atividade criada com sucesso!");
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
          <form
            className="flex flex-1 flex-col p-5"
            onSubmit={handleSaveActivity}
          >
            {/* Campo Atividade */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Atividade
              </label>
              <input
                name="activity"
                type="text"
                className="w-full text-sm text-slate-400 bg-transparent outline-none border-b border-slate-500"
                value={activity}
                onChange={handleInputChange}
              />
              {errors.activity && (
                <span className="text-xs text-red-500">{errors.activity}</span>
              )}
            </div>

            {/* Campo Responsável */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Responsável
              </label>
              <input
                name="responsible"
                type="text"
                className="w-full text-sm text-slate-400 bg-transparent outline-none border-b border-slate-500"
                value={responsible}
                onChange={handleInputChange}
              />
              {errors.responsible && (
                <span className="text-xs text-red-500">
                  {errors.responsible}
                </span>
              )}
            </div>

            {/* Campo Data */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Data
              </label>
              <input
                name="date"
                type="date"
                className="w-full text-sm text-slate-400 bg-transparent outline-none border-b border-slate-500"
                value={date}
                onChange={handleInputChange}
              />
              {errors.date && (
                <span className="text-xs text-red-500">{errors.date}</span>
              )}
            </div>

            {/* Campo Descrição */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300">
                Descrição
              </label>
              <textarea
                name="description"
                className="w-full text-sm text-slate-400 bg-transparent outline-none border-b border-slate-500"
                value={description}
                onChange={handleInputChange}
              />
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description}
                </span>
              )}
            </div>

            {/* Botão de salvar */}
            <button
              type="submit"
              className="mt-auto bg-sigaa3 text-slate-300 py-2 px-4 rounded-md hover:bg-sigaa2 hover:text-white focus-visible:ring focus-visible:ring-sigaa4 outline-none"
            >
              Salvar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
