import OrganizationIcon from '@material-ui/icons/People';

import { OrganizationList } from './List';
import { OrganizationShow } from './Show';
import { OrganizationCreate } from './Create';
import { OrganizationEdit } from './Edit';

export default {
    icon: OrganizationIcon,
    list: OrganizationList,
    show: OrganizationShow,
    create: OrganizationCreate,
    edit: OrganizationEdit,
    options: { label: 'Entreprises' },
};
