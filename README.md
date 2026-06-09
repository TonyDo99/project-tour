
Table "users" {
  "id" SERIAL [pk]
  "email" VARCHAR(255) [unique, not null]
  "password" VARCHAR(255) [not null]
  "full_name" VARCHAR(255) [not null]
  "phone" VARCHAR(20)
  "avatar" VARCHAR(500)
  "status" VARCHAR(20) [default: 'pending']
  "is_email_verified" BOOLEAN [default: false]
  "email_verified_at" TIMESTAMP
  "date_of_birth" DATE
  "address" TEXT
  "google_id" VARCHAR(100) [unique]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "destinations" {
  "id" SERIAL [pk]
  "name" VARCHAR(255) [not null]
  "slug" VARCHAR(255) [unique, not null]
  "description" TEXT
  "country" VARCHAR(100)
  "city" VARCHAR(100)
  "is_popular" BOOLEAN [default: false]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "tour_guides" {
  "id" SERIAL [pk]
  "user_id" INTEGER
  "full_name" VARCHAR(255) [not null]
  "phone" VARCHAR(20)
  "email" VARCHAR(255)
  "languages" TEXT
  "experience_years" INTEGER [default: 0]
  "bio" TEXT
  "avatar" VARCHAR(500)
  "rating" DECIMAL(3,2) [default: 0.00]
  "total_tours_completed" INTEGER [default: 0]
  "is_available" BOOLEAN [default: true]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "tours" {
  "id" SERIAL [pk]
  "title" VARCHAR(255) [not null]
  "slug" VARCHAR(255) [unique, not null]
  "description" TEXT [not null]
  "destination_id" INTEGER [unique, not null]
  "tour_guide_id" INTEGER [unique, not null]
  "duration_days" INTEGER [not null]
  "duration_nights" INTEGER [not null]
  "max_participants" INTEGER [not null]
  "min_participants" INTEGER [default: 1]
  "price" DECIMAL(10,2) [not null]
  "category" VARCHAR(50)
  "itinerary" JSON
  "meeting_point" VARCHAR(255)
  "departure_location" VARCHAR(255)
  "return_location" VARCHAR(255)
  "cancellation_policy" TEXT
  "rating" DECIMAL(3,2) [default: 0.00]
  "total_reviews" INTEGER [default: 0]
  "status" VARCHAR(20) [default: 'active']
  "is_featured" BOOLEAN [default: false]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "destination_images" {
  "id" SERIAL [pk]
  "destination_id" INTEGER [unique, not null]
  "image" VARCHAR(500) [not null]
  "caption" VARCHAR(255)
  "is_primary" BOOLEAN [default: false]
  "display_order" INTEGER [default: 0]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "tour_schedules" {
  "id" SERIAL [pk]
  "tour_id" INTEGER
  "departure_date" DATE [not null]
  "return_date" DATE [not null]
  "available_slots" INTEGER [not null]
  "price" DECIMAL(10,2) [not null]
  "booked_slots" INTEGER [default: 0]
  "status" VARCHAR(20) [default: 'available']
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

  Indexes {
    (tour_id, departure_date) [unique]
  }
}

Table "bookings" {
  "id" SERIAL [pk]
  "booking_code" VARCHAR(50) [unique, not null]
  "user_id" INTEGER
  "tour_id" INTEGER
  "customer_name" VARCHAR(255) [not null]
  "customer_email" VARCHAR(255) [not null]
  "customer_phone" VARCHAR(20) [not null]
  "customer_address" TEXT
  "price" DECIMAL(10,2) [not null]
  "total_participants" INTEGER [not null]
  "subtotal" DECIMAL(10,2) [not null]
  "discount_amount" DECIMAL(10,2) [default: 0.00]
  "total_amount" DECIMAL(10,2) [not null]
  "status" VARCHAR(20) [default: 'pending']
  "payment_status" VARCHAR(20) [default: 'unpaid']
  "special_requests" TEXT
  "notes" TEXT
  "cancelled_at" TIMESTAMP
  "cancelled_by" INTEGER
  "cancellation_reason" TEXT
  "confirmed_at" TIMESTAMP
  "confirmed_by" INTEGER
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "booking_participants" {
  "id" SERIAL [pk]
  "booking_id" INTEGER
  "full_name" VARCHAR(255) [not null]
  "date_of_birth" DATE
  "gender" VARCHAR(10)
  "passport_number" VARCHAR(50)
  "special_requirements" TEXT
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "payments" {
  "id" SERIAL [pk]
  "booking_id" INTEGER
  "payment_method" VARCHAR(50) [not null]
  "payment_gateway" VARCHAR(50)
  "transaction_id" VARCHAR(255) [unique]
  "amount" DECIMAL(10,2) [not null]
  "currency" VARCHAR(10) [default: 'VND']
  "status" VARCHAR(20) [default: 'pending']
  "payment_date" TIMESTAMP
  "payment_details" JSON
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "reviews" {
  "id" SERIAL [pk]
  "tour_id" INTEGER
  "user_id" INTEGER
  "booking_id" INTEGER
  "rating" INTEGER [not null, check: `rating >= 1 AND rating <= 5`]
  "title" VARCHAR(255)
  "comment" TEXT
  "organization_rating" INTEGER [check: `organization_rating >= 1 AND organization_rating <= 5`]
  "service_rating" INTEGER [check: `service_rating >= 1 AND service_rating <= 5`]
  "value_rating" INTEGER [check: `value_rating >= 1 AND value_rating <= 5`]
  "images" TEXT
  "is_verified" BOOLEAN [default: false]
  "is_approved" BOOLEAN [default: true]
  "admin_response" TEXT
  "response_date" TIMESTAMP
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

  Indexes {
    (booking_id, user_id) [unique]
  }
}

// Table "permissions" {
//   "id" SERIAL [pk]
//   "name" VARCHAR(100) [unique, not null] // VD: 'tour.create', 'booking.approve'
//   "display_name" VARCHAR(255)            // VD: 'Tạo tour mới', 'Duyệt đơn đặt tour'
//   "module_name" VARCHAR(100)             // VD: 'Tour Management', 'Booking System'
//   "description" TEXT
//   "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
//   "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
// }

Table "permissions" {
  "id" SERIAL [pk]
  "code" VARCHAR(50) [unique, not null]
  "name" VARCHAR(100) [unique, not null] // VD: 'tour.create', 'booking.approve'
  "display_name" VARCHAR(255)            // VD: 'Tạo tour mới', 'Duyệt đơn đặt tour'
  "module_name" VARCHAR(100)             // VD: 'Tour Management', 'Booking System'
  "description" TEXT
  "type" varchar(20) [default: 'FEATURE', note: 'SYSTEM, CORE, FEATURE']
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "created_by_id" INTEGER
  "updated_by_id" INTEGER
}

// Table "roles" {
//   "id" SERIAL [pk]
//   "name" VARCHAR(50) [unique, not null] // VD: 'admin', 'staff', 'tour_guide'
//   "display_name" VARCHAR(255)           // VD: 'Quản trị viên', 'Nhân viên vận hành'
//   "description" TEXT
//   "is_active" BOOLEAN [default: true]
//   "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
//   "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
// }

Table "roles" {
  "id" SERIAL [pk]
  "code" VARCHAR(50) [unique, not null]
  "name" VARCHAR(50) [unique, not null] // VD: 'admin', 'staff', 'tour_guide'
  "display_name" VARCHAR(255)           // VD: 'Quản trị viên', 'Nhân viên vận hành'
  "description" TEXT
  "is_read_only" BOOLEAN [default: false]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "created_by_id" INTEGER
  "updated_by_id" INTEGER
}

// Table "user_roles" {
//   "user_id" INTEGER [not null]
//   "role_id" INTEGER [not null]
//   "assigned_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

//   Indexes {
//     (user_id, role_id) [pk] // Khóa chính tổ hợp đảm bảo không trùng lặp
//   }
// }

Table "user_to_role" {
  "user_id" INTEGER [not null]
  "role_id" INTEGER [not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

  Indexes {
    (user_id, role_id) [pk] // Khóa chính tổ hợp đảm bảo không trùng lặp
  }
}

Table "user_to_permission" {
  "user_id" INTEGER [not null]
  "permission_id" INTEGER [not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

  Indexes {
    (user_id, permission_id) [pk] // Khóa chính tổ hợp đảm bảo không trùng lặp
  }
}



// Table "role_permissions" {
//   "role_id" INTEGER [not null]
//   "permission_id" INTEGER [not null]
//   "assigned_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

//   Indexes {
//     (role_id, permission_id) [pk] // Khóa chính tổ hợp đảm bảo không trùng lặp
//   }
// }

Table "role_to_permission" {
  "role_id" INTEGER [not null]
  "permission_id" INTEGER [not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]

  Indexes {
    (role_id, permission_id) [pk] // Khóa chính tổ hợp đảm bảo không trùng lặp
  }
}

Table features {
  id varchar(36) [pk]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
  created_by_id varchar(36)
  updated_by_id varchar(36)
  code varchar(100) [unique, not null]
  name varchar(255) [not null]
  description text
  type varchar(20) [default: 'FEATURE', note: 'SYSTEM, CORE, FEATURE']
  parent_id varchar(36)
}


Ref:"users"."id" - "tour_guides"."user_id" [delete: set null, update: cascade]

Ref:"destinations"."id" < "tours"."destination_id" [delete: set null]

Ref:"tour_guides"."id" < "tours"."tour_guide_id" [delete: set null]

Ref:"destinations"."id" < "destination_images"."destination_id" [delete: cascade]

Ref:"tours"."id" < "tour_schedules"."tour_id" [delete: cascade]

Ref:"users"."id" < "bookings"."user_id" [delete: set null]

Ref:"tours"."id" < "bookings"."tour_id" [delete: set null]

Ref:"users"."id" < "bookings"."cancelled_by" [delete: set null]

Ref:"users"."id" < "bookings"."confirmed_by" [delete: set null]

Ref:"bookings"."id" < "booking_participants"."booking_id" [delete: cascade]

Ref:"bookings"."id" < "payments"."booking_id" [delete: cascade]

Ref:"tours"."id" < "reviews"."tour_id" [delete: cascade]

Ref:"users"."id" < "reviews"."user_id" [delete: cascade]

Ref:"bookings"."id" - "reviews"."booking_id" [delete: cascade]

// Ref: "roles"."id" < "user_roles"."role_id"

// Ref: "users"."id" < "user_roles"."user_id"

Ref: "roles"."id" < "user_to_role"."role_id"

Ref: "users"."id" < "user_to_role"."user_id"

// Ref: "roles"."id" < "role_permissions"."role_id"

// Ref: "permissions"."id" < "role_permissions"."permission_id"

Ref: "roles"."id" < "role_to_permission"."role_id"

Ref: "permissions"."id" < "role_to_permission"."permission_id"

Ref: "roles"."created_by_id" > "users"."id" [delete: set null]

Ref: "roles"."updated_by_id" > "users"."id" [delete: set null]

Ref: "permissions"."created_by_id" > "users"."id" [delete: set null]

Ref: "permissions"."updated_by_id" > "users"."id" [delete: set null]

Ref: "users"."id" < "features"."created_by_id" [delete: set null]

Ref: "users"."id" < "features"."updated_by_id" [delete: set null]
