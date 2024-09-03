import { IconName } from '@shared/interfaces/icons.interface';

export interface MenuItem {
  id: string;
  name: string;
  icon?: IconName;
  redirectTo: string;
}
