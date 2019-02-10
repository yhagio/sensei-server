import { IRelationshipsWriter } from '../../app/relationships/relationships.interface';
import { Repository, Connection } from 'typeorm';
import { Relationship } from '../../domain/entity/Relationship';
import { NotFoundError } from '../../shared/error/not.found.error';

export default class RelationshipsWriterStore implements IRelationshipsWriter {
  private coursesConn: Repository<Relationship>;
  constructor(conn: Connection) {
    this.coursesConn = conn.getRepository(Relationship);
  }

  public async create(followeeId: string, followerId: string): Promise<void> {
    if (!followeeId || !followerId) {
      throw new NotFoundError('Followee and Follower ids are required');
    }
    const newRel = new Relationship();
    newRel.followeeId = followeeId;
    newRel.followerId = followerId;

    await this.coursesConn.save(newRel);
  }

  public async delete(followeeId: string, followerId: string): Promise<void> {
    if (!followeeId || !followerId) {
      throw new NotFoundError('Followee and Follower ids are required');
    }

    await this.coursesConn
      .createQueryBuilder()
      .delete()
      .where('"followeeId" = :followeeId AND "followerId" = :followerId', {
        followeeId,
        followerId
      })
      .execute();
  }
}
