import { useState, useEffect } from "react";
import { Task, Day } from "@/types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar tarefas do localStorage após montagem
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salvar tarefas no localStorage sempre que houver alteração
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (task: Task) => {
    // Atribuir uma ordem inicial (maior ordem + 1)
    const maxOrder = tasks.reduce((max, t) => Math.max(max, t.order || 0), 0);
    const newTask = { ...task, order: maxOrder + 1 };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const reorderTasks = (activeId: string, overId: string, day: Day) => {
    setTasks(prev => {
      // Filtrar tarefas do dia específico
      const dayTasks = prev.filter(t => t.day === day);
      const otherTasks = prev.filter(t => t.day !== day);

      const oldIndex = dayTasks.findIndex(t => t.id === activeId);
      const newIndex = dayTasks.findIndex(t => t.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      // Reordenar o array
      const reordered = [...dayTasks];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);

      // Atualizar as ordens baseadas nos novos índices
      const updatedDayTasks = reordered.map((task, idx) => ({
        ...task,
        order: idx
      }));

      return [...otherTasks, ...updatedDayTasks];
    });
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    isLoaded // opcional, para saber quando os dados foram carregados
  };
}