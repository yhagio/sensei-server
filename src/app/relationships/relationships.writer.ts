import { IRelationshipsWriter } from './relationships.interface';

export default class RelationshipsWriter {
  constructor(private repository: IRelationshipsWriter) {}

  public async create(followeeId: string, followerId: string): Promise<void> {
    return this.repository.create(followeeId, followerId);
  }

  public async delete(followeeId: string, followerId: string): Promise<void> {
    return this.repository.delete(followeeId, followerId);
  }
}
