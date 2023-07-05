import { RoleEntity } from 'entity/role.entity';
export interface TokenData {
  id: number;
  username: string;
  email: string;
  role: RoleEntity;
  ban: boolean;
  ban_reason: string;
}
