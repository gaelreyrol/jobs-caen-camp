import JobPostingIcon from '@material-ui/icons/EventSeat';

import { JobPostingList } from './List';
import { JobPostingShow } from './Show';
import { JobPostingCreate } from './Create';
import { JobPostingEdit } from './Edit';

export default {
    icon: JobPostingIcon,
    list: JobPostingList,
    show: JobPostingShow,
    create: JobPostingCreate,
    edit: JobPostingEdit,
    options: { label: "Offres d'emploi" },
};
