"use client";
import { ChangeEvent, useDeferredValue, useState } from "react";
import { toast } from "sonner";
import { ActivityCard } from "./components/activity-card";
import { NewActivityCard } from "./components/new-activity-card";

interface Activity {
  id: string;
  date: string;
  activity: string;
  responsible: string;
  description: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activities, setActivities] = useState<Activity[]>(() => {
    const activitiesOnStorage = localStorage.getItem("activities");
    if (activitiesOnStorage) {
      return JSON.parse(activitiesOnStorage);
    }
    return [];
  });

  function onActivityCreated(
    activity: string,
    responsible: string,
    date: string,
    description: string
  ) {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      date, // Agora recebemos a data diretamente do componente filho
      activity,
      responsible,
      description,
    };

    const activityArray = [newActivity, ...activities];

    setActivities(activityArray);
    localStorage.setItem("activities", JSON.stringify(activityArray));
    toast.success("Atividade criada com sucesso!");
  }

  function onActivityDeleted(id: string) {
    const activitiesArray = activities.filter((activity) => activity.id !== id);
    setActivities(activitiesArray);
    localStorage.setItem("activities", JSON.stringify(activitiesArray));
    toast.success("Atividade apagada");
  }

  function onActivityEdited(
    id: string,
    updatedActivity: string,
    updatedResponsible: string,
    updatedDescription: string
  ) {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === id) {
        return {
          ...activity,
          activity: updatedActivity,
          responsible: updatedResponsible,
          description: updatedDescription,
        };
      }
      return activity;
    });

    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
    toast.success("Atividade editada com sucesso!");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  const filteredActivities =
    useDeferredValue(search) !== ""
      ? activities.filter((activity) =>
          activity.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      : activities;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque por uma atividade pela descrição..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewActivityCard onActivityCreated={onActivityCreated} />
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={{
              ...activity,
              date: new Date(activity.date), // Convertendo a data para o tipo Date
            }}
            onActivityDelete={onActivityDeleted}
            onActivityEdit={onActivityEdited}
          />
        ))}
      </div>
    </div>
  );
}
