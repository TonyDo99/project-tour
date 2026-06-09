import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DestinationEntity } from './destination.entity';

@Entity({ name: 'destination_images' })
export class DestinationImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  caption: string;

  @Column({ type: 'boolean', default: false, name: 'is_primary' })
  isPrimary: boolean;

  @Column({ type: 'int', default: 0, name: 'display_order' })
  displayOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => DestinationEntity, (ref) => ref.images)
  @JoinColumn({ name: 'destination_id', referencedColumnName: 'id' })
  destination: DestinationEntity;
}
