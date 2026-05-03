import { GenerateRequestInput, GenerateResponse } from "@/types";

export interface HistoryItem {
  input: GenerateRequestInput;
  output: GenerateResponse;
  timestamp: number;
}

const STORAGE_KEY = "ai-tutor-history-v2";
const MAX_HISTORY = 3;

export function saveToHistory(input: GenerateRequestInput, output: GenerateResponse) {
  if (typeof window === "undefined") return;

  const history = getHistory();
  
  // Remove duplicates by topic
  const filtered = history.filter(
    (item) => item.input.topic.toLowerCase() !== input.topic.toLowerCase()
  );
  
  const newItem: HistoryItem = {
    input,
    output,
    timestamp: Date.now()
  };
  
  const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}
