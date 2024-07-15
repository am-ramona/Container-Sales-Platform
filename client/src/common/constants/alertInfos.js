import checkIcon from '../../assets/icons/ToastIcons/check.svg' 
import errorIcon from '../../assets/icons/ToastIcons/error.svg';
import infoIcon from '../../assets/icons/ToastIcons/info.svg';
import warningIcon from '../../assets/icons/ToastIcons/warning.svg';

const alertInfos = [{
        id: 1,
        type: 'success',
        label: 'Success !',
        color: "#327864",
        backgroundColor: '#D5F6EB',
        icon: checkIcon
    },
    {
        id: 2,
        type: 'info',
        label: 'Info !',
        color: "#04246A",
        backgroundColor: '#D9DEEA',
        icon: infoIcon
    },
    {
        id: 3,
        type: 'todo',
        label: 'To Do !',
        color: "#497BFF",
        backgroundColor: '#DAE6FE',
        icon: infoIcon
    },
    {
        id: 4,
        type: 'warning',
        label: 'Warning !',
        color: '#D2740F',
        backgroundColor: '#FFF0DB',
        icon: warningIcon
    },
    {
        id: 5,
        type: 'error',
        label: 'Error !',
        color: "#CF4166",
        backgroundColor: '#FEDFE5',
        icon: warningIcon
    },
    {
        id: 6,
        type: 'danger',
        label: 'Danger !',
        backgroundColor: '#d9534f',
        icon: errorIcon
    },
];

export default alertInfos;