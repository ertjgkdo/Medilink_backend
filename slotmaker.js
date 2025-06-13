require('dotenv').config();
const mongoose = require('mongoose');
const Slot = require('./appointments/model/appointment_slots');

// Configuration
const MONGO_URI = process.env.MONGO_URI;
const MIN_DAYS_TO_SHIFT = 7; // Minimum number of days to shift into the future
const MAX_DAYS_TO_SHIFT = 30; // Maximum number of days to shift into the future
const PRESERVE_TIME = true; // Keep the same time slots, just update the date

async function updateDates() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected successfully to MongoDB');

    const now = new Date();
    // Get tomorrow's start
    const tomorrow = new Date(now);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get all slots and sort them by date
    const slots = await Slot.find({}).sort({ date: 1 });
    console.log(`Found ${slots.length} slots to process`);

    // Group slots by month for better reporting
    const slotsByMonth = {};
    
    // Find the earliest appointment date
    let earliestDate = null;
    for (const slot of slots) {
      const date = new Date(slot.date);
      const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!slotsByMonth[monthKey]) {
        slotsByMonth[monthKey] = [];
      }
      slotsByMonth[monthKey].push(slot);

      if (!earliestDate || date < earliestDate) {
        earliestDate = date;
      }
    }

    // Print current distribution
    console.log('\nCurrent appointment distribution:');
    for (const [month, monthSlots] of Object.entries(slotsByMonth)) {
      console.log(`${month}: ${monthSlots.length} appointments`);
    }

    // Calculate optimal days to shift
    const daysToFuture = Math.ceil((tomorrow - earliestDate) / (24 * 60 * 60 * 1000));
    const daysToShift = Math.min(
      Math.max(MIN_DAYS_TO_SHIFT, daysToFuture + 1),
      MAX_DAYS_TO_SHIFT
    );

    console.log(`\nWill shift appointments by ${daysToShift} days to ensure all are in the future`);
    console.log(`(Earliest appointment was ${earliestDate.toLocaleDateString()})`);

    let updatedCount = 0;
    let skippedCount = 0;
    const newSlotsByMonth = {};

    for (const slot of slots) {
      const originalDate = new Date(slot.date);
      const newDate = new Date(originalDate.getTime() + (daysToShift * 24 * 60 * 60 * 1000));
      
      // Verify the new date is in the future
      if (newDate > now) {
        const monthKey = newDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!newSlotsByMonth[monthKey]) {
          newSlotsByMonth[monthKey] = 0;
        }
        newSlotsByMonth[monthKey]++;

        slot.date = newDate;
        await slot.save();
        updatedCount++;
        
        console.log(`Updated: ${originalDate.toLocaleString()} → ${newDate.toLocaleString()}`);
      } else {
        console.log(`Warning: Could not move ${originalDate.toLocaleString()} to future`);
        skippedCount++;
      }
    }

    console.log('\nNew appointment distribution:');
    for (const [month, count] of Object.entries(newSlotsByMonth)) {
      console.log(`${month}: ${count} appointments`);
    }

    console.log('\nUpdate Summary:');
    console.log(`Total slots processed: ${slots.length}`);
    console.log(`Slots updated: ${updatedCount}`);
    console.log(`Slots skipped: ${skippedCount}`);
    
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error occurred:', error);
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to error');
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError);
    }
    process.exit(1);
  }
}

// Add warning for dry run
console.log('\n⚠️  WARNING: This script will update appointment dates in the database.');
console.log('Make sure you have a backup of your data before proceeding.');
console.log(`Slots will be shifted between ${MIN_DAYS_TO_SHIFT} and ${MAX_DAYS_TO_SHIFT} days into the future.\n`);

// Run the update
updateDates();
updateDates();