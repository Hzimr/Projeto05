"use client";
import { ChangeEvent, useDeferredValue, useState } from "react";
import { toast } from "sonner";
import { ActivityCard } from "./components/activity-card";
import { NewActivityCard } from "./components/new-activity-card";

interface Activity {
  id: string;
  date: Date;
  content: string;
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

  function onActivityCreated(content: string) {
    const newActivity = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const activityArray = [newActivity, ...activities];

    setActivities(activityArray);

    localStorage.setItem("activities", JSON.stringify(activityArray));
  }

  function onActivityDeleted(id: string) {
    const activitiesArray = activities.filter((activity) => {
      return activity.id !== id;
    });

    setActivities(activitiesArray);

    localStorage.setItem("activities", JSON.stringify(activitiesArray));
    toast.success("Atividade Apagada");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredActivities =
    useDeferredValue(search) !== ""
      ? activities.filter((activity) =>
          activity.content
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      : activities;

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque por uma atividade..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewActivityCard onActivityCreated={onActivityCreated} />
        {filteredActivities.map((activity) => {
          return (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onActivityDelete={onActivityDeleted}
            />
          );
        })}
      </div>
    </div>
  );
}
