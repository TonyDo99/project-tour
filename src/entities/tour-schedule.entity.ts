import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Tour } from './tour.entity';

@Entity({ name: 'tour_schedules' })
@Index(['tour', 'departureDate'], { unique: true })
export class TourSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour, tour => tour.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tour_id' })
  tour: Tour;

  @Column({ type: 'date', name: 'departure_date' })
  departureDate: Date;

  @Column({ type: 'date', name: 'return_date' })
  returnDate: Date;

  @Column({ type: 'int', name: 'available_slots' })
  availableSlots: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0, name: 'booked_slots' })
  bookedSlots: number;

  @Column({ type: 'varchar', length: 20, default: 'available' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
