export const loadItem = (name) => {
  const storedTodos =  localStorage.getItem(name);
  return storedTodos ? JSON.parse(storedTodos) : [];

}

export const saveItem = (name, item ) => {
  localStorage.setItem(name, JSON.stringify(item));

}