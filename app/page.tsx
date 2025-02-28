"use client";
import { ChangeEvent, useDeferredValue, useState } from "react";

interface Activity {
  id: string;
  date: Date;
  content: string;
}
export default function Home() {
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState<Activity[]>(() => {
    const activityOnStorage = localStorage.getItem("activity");

    if (activityOnStorage) {
      return JSON.parse(activityOnStorage);
    }
    return [];
  });

  function onActivityCreated(content: string) {
    const newActivity = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const activityArray = [newActivity, ...activity];

    setActivity(activityArray);

    localStorage.setItem("activity", JSON.stringify(activityArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredActivities =
    useDeferredValue(search) !== ""
      ? activity.filter((activity) =>
          activity.content
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      : activity;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello Projeto 5
      </main>
    </div>
  );
}
