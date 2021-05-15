import { ProjectEntity, ProjectEntityRepository } from '@simple-jira/domain-project';
import { MongoDBRepository } from './mongodb.repository';

export class MongoDBProjectEntityRepository
  extends MongoDBRepository<ProjectEntity>
  implements ProjectEntityRepository {}
