export interface userData {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface loginData {
  username: string;
  password: string;
}

export interface registerData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface userStatus {
  isLogined: boolean;
  token: string;
  userData: userData | null;
}

export interface masterData {
  user: number;
  type: string;
  name: string;
  point: number;
}

export interface masterObject extends masterData {
  id: number | null;
}

export interface masterList {
  masters: masterObject[];
}

export interface taskData {
  user: number;
  master: number;
  person: string;
  date: string;
}

export interface existTask extends taskData {
  id: number;
}

export interface taskObject extends taskData {
  id: number;
  update: boolean;
}

export interface personTaskList {
  week: taskObject[] | [];
  month: taskObject[] | [];
}

export interface taskList {
  tasks: taskObject[] | [];
  dad: personTaskList;
  mom: personTaskList;
}

export interface changedTaskList {
  editTaskList: taskObject[] | [];
  newTaskList: taskObject[] | [];
}