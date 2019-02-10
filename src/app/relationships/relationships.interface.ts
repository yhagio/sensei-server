export interface IRelationshipsWriter {
  create(followeeId: string, followerId: string): Promise<void>;
  delete(followeeId: string, followerId: string): Promise<void>;
}
