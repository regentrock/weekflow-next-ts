"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    addTask: "Add task",
    todayTasks: "Today's tasks",
    noTasksToday: "No tasks for today",
    all: "All",
    active: "Active",
    completed: "Completed",
    noTasks: "No tasks",
    addTaskBtn: "+ Add task",
    edit: "Edit",
    delete: "Delete",
    addTaskTitle: "Add Task",
    editTaskTitle: "Edit Task",
    title: "Title",
    titleRequired: "The title is required",
    description: "Description (optional)",
    descriptionPlaceholder: "Add details about this task...",
    day: "Day",
    priority: "Priority",
    hours: "Hours",
    minutes: "Minutes",
    minutesError: "Minutes must be between 0 and 59",
    save: "Save",
    add: "Add",
    cancel: "Cancel",
    showOverview: "Show week overview",
    hideOverview: "Hide week overview",
    weekOverview: "Week Overview",
    about: "About",
    help: "Help",
    terms: "Terms",
    contact: "Contact",
    rights: "All rights reserved.",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    english: "English",
    portuguese: "Português",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
  },
  pt: {
    addTask: "Adicionar tarefa",
    todayTasks: "Tarefas de hoje",
    noTasksToday: "Nenhuma tarefa para hoje",
    all: "Todas",
    active: "Ativas",
    completed: "Concluídas",
    noTasks: "Nenhuma tarefa",
    addTaskBtn: "+ Adicionar tarefa",
    edit: "Editar",
    delete: "Excluir",
    addTaskTitle: "Adicionar Tarefa",
    editTaskTitle: "Editar Tarefa",
    title: "Título",
    titleRequired: "O título é obrigatório",
    description: "Descrição (opcional)",
    descriptionPlaceholder: "Adicione detalhes sobre esta tarefa...",
    day: "Dia",
    priority: "Prioridade",
    hours: "Horas",
    minutes: "Minutos",
    minutesError: "Minutos devem estar entre 0 e 59",
    save: "Salvar",
    add: "Adicionar",
    cancel: "Cancelar",
    showOverview: "Mostrar visão geral da semana",
    hideOverview: "Ocultar visão geral da semana",
    weekOverview: "Visão Geral da Semana",
    about: "Sobre",
    help: "Ajuda",
    terms: "Termos",
    contact: "Contato",
    rights: "Todos os direitos reservados.",
    theme: "Tema",
    light: "Claro",
    dark: "Escuro",
    language: "Idioma",
    english: "Inglês",
    portuguese: "Português",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo",
    mon: "Seg",
    tue: "Ter",
    wed: "Qua",
    thu: "Qui",
    fri: "Sex",
    sat: "Sáb",
    sun: "Dom",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "pt") return saved;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}