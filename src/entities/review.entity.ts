import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Tour } from './tour.entity';
import { UserEntity } from './user.entity';
import { Booking } from './booking.entity';

@Entity({ name: 'reviews' })
@Index(['booking', 'user'], { unique: true })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour, (tour) => tour.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tour_id' })
  tour: Tour;

  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => Booking, (booking) => booking.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'int', nullable: true, name: 'organization_rating' })
  organizationRating: number;

  @Column({ type: 'int', nullable: true, name: 'service_rating' })
  serviceRating: number;

  @Column({ type: 'int', nullable: true, name: 'value_rating' })
  valueRating: number;

  @Column({ type: 'text', nullable: true })
  images: string;

  @Column({ type: 'boolean', default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ type: 'boolean', default: true, name: 'is_approved' })
  isApproved: boolean;

  @Column({ type: 'text', nullable: true, name: 'admin_response' })
  adminResponse: string;

  @Column({ type: 'timestamp', nullable: true, name: 'response_date' })
  responseDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
