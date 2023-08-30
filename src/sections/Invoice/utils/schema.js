// Named
import {
   requiredMsg,
   min2Msg,
   max150Msg,
   numberRegex,
   numberRegexMsg,
   emailRegexMsg,
   minPass,
   confirmPasswordMsg,
   max100Msg,
   max50Msg,
} from 'src/utils/regex';
// default
import * as Yup from 'yup';

export const TABLE_HEAD = [
   { id: 'index', label: '№', align: 'left' },
   { id: 'bpayCode', label: 'Bpay ID', align: 'left' },
   { id: 'paidAt', label: 'Гүйлгээ хийсэн огноо', align: 'left' },
   { id: 'transactionID', label: 'Гүйлгээний ID', align: 'left' },
   { id: 'totalAmount', label: 'Нийт төлсөн дүн', align: 'left' },
   { id: 'status', label: 'Төлөв', align: 'left' },
   { id: 'action', label: 'Үйлдэл', align: 'center' },
];

export const roleArray = [
   {
      id: 0,
      name: 'Бүгд',
   },
   {
      id: 2,
      name: 'Админ',
   },
   {
      id: 3,
      name: 'Супер админ',
   },
];

export const DETAIL_TABLE_HEAD = [
   { id: 'index', label: '№', align: 'left' },
   { id: 'CID', label: 'CID', align: 'center' },
   { id: 'transactionID', label: 'Гүйлгээний дэд ID', align: 'left' },
   { id: 'bill', label: 'Билл цэвэр дүн', align: 'left' },
   { id: 'penalty', label: 'Алданги', align: 'left' },
   { id: 'totalAmount', label: 'Билл нийт дүн', align: 'left' },
   { id: 'paidTotalAmount', label: 'Нийт төлсөн дүн', align: 'left' },
   { id: 'penaltyAmount', label: 'Хаагдаагүй төлөлт', align: 'left' },
   { id: 'action', label: '', align: 'center' },
];
