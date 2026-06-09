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
import { User } from './user.entity';
import { Tour } from './tour.entity';
import { BookingParticipant } from './booking-participant.entity';
import { Payment } from './payment.entity';
import { Review } from './review.entity';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'booking_code' })
  bookingCode: string;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.bookings, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tour_id' })
  tour: Tour;

  @Column({ type: 'varchar', length: 255, name: 'customer_name' })
  customerName: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_email' })
  customerEmail: string;

  @Column({ type: 'varchar', length: 20, name: 'customer_phone' })
  customerPhone: string;

  @Column({ type: 'text', nullable: true, name: 'customer_address' })
  customerAddress: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', name: 'total_participants' })
  totalParticipants: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    name: 'discount_amount',
  })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'unpaid',
    name: 'payment_status',
  })
  paymentStatus: string;

  @Column({ type: 'text', nullable: true, name: 'special_requests' })
  specialRequests: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', nullable: true, name: 'cancelled_at' })
  cancelledAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'cancelled_by' })
  cancelledBy: User;

  @Column({ type: 'text', nullable: true, name: 'cancellation_reason' })
  cancellationReason: string;

  @Column({ type: 'timestamp', nullable: true, name: 'confirmed_at' })
  confirmedAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'confirmed_by' })
  confirmedBy: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => BookingParticipant, (participant) => participant.booking)
  participants: BookingParticipant[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];

  @OneToMany(() => Review, (review) => review.booking)
  reviews: Review[];
}
