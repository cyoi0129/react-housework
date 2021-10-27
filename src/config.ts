const devURL: string = "http://127.0.0.1:8000/";
const ProdURL: string = "";
export const apiURL: string = devURL;

export const masterSelection = ['cook', 'bath', 'delivery', 'clean', '‎laundry', 'sleep', 'wash', 'child', 'others'];

export interface dateObject {
  dateOrigin: Date,
  dateString: string,
  dateNumbner: number
}
export function convertDate (date: Date | null): dateObject {
  const newDate = date ? date: new Date();
  const y = newDate.getFullYear();
  const m = ("00" + (newDate.getMonth()+1)).slice(-2);
  const d = ("00" + newDate.getDate()).slice(-2);
  const dateResult = {
    dateOrigin: newDate,
    dateString: y + "-" + m + "-" + d,
    dateNumbner: Number(y + m + d)
  }
  return dateResult;
}

const enSet = {
  common: {
    site: 'Housework Manager',
    dad: 'Dad',
    mom: 'Mom'
  },
  chart: {
    task: 'Tasks done last week',
    point: 'Points got last week'
  },
  home: {
    title1: 'Workload Report',
    title2: 'Point Summary',
    sub1: 'Last week summary',
    sub2: 'Last month summary',
    sub3: 'Dad\'s Summary',
    sub4: 'Mom\'s Summary',
  },
  task: {
    date: 'Select Date',
    master: 'Master',
    person: 'Person',
    add: 'Add',
    save: 'Save',
  },
  master: {
    category: {
      cook: 'Cook',
      bath: 'Bath',
      delivery: 'Delivery',
      clean: 'Clean',
      laundry: '‎Laundry',
      sleep: 'Sleep',
      wash: 'Wash',
      child: 'Child',
      others: 'Others'
    },
    add: 'Add a new master',
    name: 'Name',
    type: 'Type',
    point: 'Points',
    save: 'Save'
  },
  account: {
    welcome: 'Welcome',
    logout: 'Logout'
  },
  login: {
    title: 'Login',
    user: 'User',
    password: 'Password',
    remember: 'Remember me',
    signin: 'Sign in',
    forgot: 'Forgot password',
    create: 'Create an account'
  },
  register: {
    title: 'Register',
    user: 'User',
    email: 'Email',
    password1: 'Password',
    password2: 'Password Confirm',
    create: 'Create',
    already: 'Already have an account'
  }
} 

export const langSet = enSet;