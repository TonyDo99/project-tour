import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DestinationEntity } from './destination.entity';
import { TourGuide } from './tour-guide.entity';
import { TourSchedule } from './tour-schedule.entity';
import { Booking } from './booking.entity';
import { Review } from './review.entity';

@Entity({ name: 'tours' })
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => DestinationEntity, (destination) => destination.tours, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'destination_id' })
  destination: DestinationEntity;

  @ManyToOne(() => TourGuide, (guide) => guide.tours, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tour_guide_id' })
  tourGuide: TourGuide;

  @Column({ type: 'int', name: 'duration_days' })
  durationDays: number;

  @Column({ type: 'int', name: 'duration_nights' })
  durationNights: number;

  @Column({ type: 'int', name: 'max_participants' })
  maxParticipants: number;

  @Column({ type: 'int', default: 1, name: 'min_participants' })
  minParticipants: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string;

  @Column({ type: 'json', nullable: true })
  itinerary: any;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'meeting_point',
  })
  meetingPoint: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'departure_location',
  })
  departureLocation: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'return_location',
  })
  returnLocation: string;

  @Column({ type: 'text', nullable: true, name: 'cancellation_policy' })
  cancellationPolicy: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.0 })
  rating: number;

  @Column({ type: 'int', default: 0, name: 'total_reviews' })
  totalReviews: number;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @Column({ type: 'boolean', default: false, name: 'is_featured' })
  isFeatured: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TourSchedule, (schedule) => schedule.tour)
  schedules: TourSchedule[];

  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings: Booking[];

  @OneToMany(() => Review, (review) => review.tour)
  reviews: Review[];
}
