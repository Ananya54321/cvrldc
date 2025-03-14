"use server";
import Event from "../models/event";
import connectDb from "../utils/db";
connectDb()
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database connection failed"));

export async function postEvent(eventData, token) {
  try {
    const currentEventDate = new Date(eventData.eventDate);
    // Uncomment this part when deploying, it is commmented for testing purposes
    // if (currentEventDate < new Date()) {
    //   return {
    //     status: 400,
    //     message: "Event date cannot be in the past",
    //     success: false,
    //   };
    // }
    const newEvent = await Event.create({
      title: eventData.title,
      description: eventData.description,
      vertical: eventData.vertical.toLowerCase(),
      eventDate: eventData.eventDate,
      eventTime: eventData.eventTime,
      organisedBy: eventData.organisedBy,
      location: eventData.location,
      link: eventData.link,
    });
    console.log(newEvent);
    return {
      success: true,
      message: "Event created successfully",
    };
  } catch (err) {
    console.error("Error creating event:", err);
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function getEvents() {
  try {
    const upcomingEvents = await Event.find({
      eventDate: { $gt: Date() },
    })
      .sort({ eventDate: 1 })
      .lean();
    console.log(upcomingEvents);
    return upcomingEvents.map((event) => ({
      ...event,
      _id: event._id.toString(),
      eventDate: event.eventDate.toISOString(),
    }));
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function getEventsWithFilter(vertical) {
  try {
    const filteredEvents = await Event.find({
      vertical: vertical.toLowerCase(),
    })
      .sort({
        eventDate: 1,
      })
      .lean();
    return filteredEvents.map((event) => ({
      ...event,
      _id: event._id.toString(),
      eventDate: event.eventDate.toISOString(),
    }));
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function updateEventDetails(vertical, title, updatedFields) {
  try {
    if (Object.keys(updatedFields).length === 0) {
      return {
        success: false,
        message: "No valid fields provided for update.",
      };
    }

    const updatedDetails = await Event.findOneAndUpdate(
      { vertical: vertical, title: title },
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    console.log("x", updatedDetails);
    if (!updatedDetails) {
      return {
        success: false,
        message: "Event not found",
      };
    }
    return {
      success: true,
      message: "Event Updated",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function editStatus(eventId, status) {
  try {
    const eventDetails = await Event.findOne({ _id: eventId });

    if (!eventDetails) {
      return {
        success: false,
        message: "Didn't find any events",
      };
    }

    if (status === "Completed") {
      eventDetails.isCompleted = true;
      eventDetails.isCancelled = false;
    } else if (status === "Cancelled") {
      eventDetails.isCancelled = true;
      eventDetails.isCompleted = false;
    } else {
      return {
        success: false,
        message: "Invalid status provided",
      };
    }

    await eventDetails.save();

    return {
      success: true,
      message: `Event marked as ${status}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}
