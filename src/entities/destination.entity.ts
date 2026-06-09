import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DestinationImageEntity } from './destination-image.entity';
import { Tour } from './tour.entity';

@Entity({ name: 'destinations' })
export class DestinationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'boolean', default: false, name: 'is_popular' })
  isPopular: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Tour, (tour) => tour.destination)
  tours: Tour[];

  @OneToMany(() => DestinationImageEntity, (ref) => ref.destination)
  images: DestinationImageEntity[];
}
