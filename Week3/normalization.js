// 1.
// The rule is "each column should have atomic value";
// We can add extra rows for each atomic value

// 2.
// super key
//      member_id
//      member_name
//      member_id + other columns
//      member_name + other columns
// primary key
//      member_id
// candiate key
//      member_id
//      member_name

// 3.
// Members
//  member_id primary_key
//  member_name
//  member_address
// Foods
//  food_code primary_key
//  food_description
// Venues
//  venue_code primary_key
//  venue_description
// Dinners
//  dinner_id primary_key
//  dinner_date
//  member_id foreign_key
//  venue_code foreign_key
//  food_code foreign_key
