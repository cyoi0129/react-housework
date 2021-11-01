// Production switch
import { devURL, prodURL } from './env'
export const isProduction = false;
export const apiURL: string = isProduction ? prodURL : devURL;
export const webPath: string = isProduction ? '/web/' : '/';
export const imgPath: string = isProduction ? '../static/' : '/';

// Date format process object
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

// English ver text set
const enSet = {
  common: {
    site: 'Housework Manager',
    dad: 'Dad',
    mom: 'Mom',
    message: 'Sucessed!',
    menu: {
      home: 'Home',
      task: 'Task',
      master: 'Master',
      account: 'Account'
    },
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
    chart: {
      pie: 'Summary Report',
      line: 'Tasks done last week',
      bar: 'Points got last week'
    }
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
    add: 'Add a new master',
    name: 'Name',
    type: 'Type',
    point: 'Points',
    save: 'Save'
  },
  account: {
    welcome: 'Welcome',
    email: 'Email',
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

// Japanese ver text set
const jpSet = {
  common: {
    site: '家事マネージャー',
    dad: 'パパ',
    mom: 'ママ',
    message: '成功しました',
    menu: {
      home: 'ホーム',
      task: 'タスク',
      master: '項目',
      account: 'ユーザー'
    },
    category: {
      cook: '料理',
      bath: '風呂',
      delivery: '送迎',
      clean: '掃除',
      laundry: '‎洗濯',
      sleep: '就寝',
      wash: '洗い物',
      child: '子供',
      others: 'その他'
    },
    chart: {
      pie: 'サマリー',
      line: '先週のタスク実績',
      bar: '先週のポイント実績'
    }
  },
  home: {
    title1: '家事担当バランス',
    title2: 'ポイントサマリー',
    sub1: '先週のサマリー',
    sub2: '先月のサマリー',
    sub3: 'パパのサマリー',
    sub4: 'ママのサマリー',
  },
  task: {
    date: '日付を選んでください',
    master: '項目',
    person: '担当',
    add: '追加',
    save: '保存',
  },
  master: {
    add: '項目を追加',
    name: '項目名',
    type: '種類',
    point: 'ポイント数',
    save: '保存'
  },
  account: {
    welcome: 'ようこそ',
    email: 'メールアドレス',
    logout: 'ログアウト'
  },
  login: {
    title: 'ログイン',
    user: 'ユーザー名',
    password: 'パスワード',
    remember: 'パスワードを保存',
    signin: 'ログイン',
    forgot: 'パスワードを忘れた',
    create: 'アカウントを作成'
  },
  register: {
    title: '登録',
    user: 'ユーザー名',
    email: 'メールアドレス',
    password1: 'パスワード',
    password2: 'パスワード確認',
    create: '作成',
    already: 'すでにアカウントを持っている'
  }
}
// const browserLang = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage;

// Language select switch
const browserLang = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
export const langSet = browserLang === 'ja-JP' ? jpSet : enSet;